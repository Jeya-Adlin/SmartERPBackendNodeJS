// src/controllers/purchaseVoucher.controller.js

const db = require("../config/db");

const purchaseModel =
    require("../models/purchaseVoucher.model");

exports.create = async (req, res) => {

    const trx = await db.transaction();

    try {

        const companyId = req.headers["company-id"];

        const {
            supplier_ledger_id,
            voucher_date,
            items
        } = req.body;

        // Generate Voucher Number
        const lastVoucher =
            await purchaseModel.getLastVoucher();

        const nextNumber =
            lastVoucher
                ? lastVoucher.id + 1
                : 1;

        const voucherNo =
            `PUR-${String(nextNumber).padStart(5, "0")}`;

        // Calculate Total
        let totalAmount = 0;

        items.forEach(item => {
            totalAmount +=
                Number(item.quantity) *
                Number(item.rate);
        });

        // Create Purchase Voucher
        const [voucher] =
            await purchaseModel.createPurchaseVoucher(
                trx,
                {
                    company_id: companyId,
                    supplier_ledger_id,
                    voucher_no: voucherNo,
                    voucher_date,
                    total_amount: totalAmount
                }
            );

        // Create Voucher Items
        const voucherItems =
            items.map(item => ({
                purchase_voucher_id: voucher.id,
                item_id: item.item_id,
                quantity: item.quantity,
                rate: item.rate,
                amount:
                    item.quantity *
                    item.rate
            }));

        await purchaseModel.createPurchaseVoucherItems(
            trx,
            voucherItems
        );

        // Update Stock
        for (const item of items) {

            await trx("stock_items")
                .where({
                    id: item.item_id,
                    company_id: companyId
                })
                .increment(
                    "quantity",
                    item.quantity
                );

            // Inventory Transaction
            await trx("inventory_transactions")
                .insert({
                    company_id: companyId,
                    item_id: item.item_id,
                    transaction_type: "PURCHASE",
                    quantity: item.quantity,
                    reference_id: voucher.id,
                    reference_type: "PURCHASE_VOUCHER"
                });
        }

        await trx.commit();

        res.status(201).json({
            message: "Purchase Voucher Created",
            voucher_no: voucherNo,
            voucher_id: voucher.id
        });

    }
    catch (error) {

        await trx.rollback();

        res.status(500).json({
            message: error.message
        });
    }
};