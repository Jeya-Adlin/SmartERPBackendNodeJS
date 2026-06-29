const db = require("../config/db");
const salesModel = require("../models/salesVoucher.model");

exports.create = async (req, res) => {

    const trx = await db.transaction();

    try {

        const companyId = req.headers["company-id"];

        const {
            customer_ledger_id,
            voucher_date,
            items
        } = req.body;

        // Stock Validation
        for (const item of items) {

            const stockItem =
                await trx("stock_items")
                    .where({
                        id: item.item_id,
                        company_id: companyId
                    })
                    .first();

            if (!stockItem) {
                throw new Error(
                    `Item ${item.item_id} not found`
                );
            }

            if (
                Number(stockItem.quantity) <
                Number(item.quantity)
            ) {
                throw new Error(
                    `${stockItem.item_name} has insufficient stock`
                );
            }
        }

        // Voucher Number
        const lastVoucher =
            await salesModel.getLastVoucher();

        const nextNo =
            lastVoucher
                ? lastVoucher.id + 1
                : 1;

        const voucherNo =
            `SAL-${String(nextNo).padStart(5, "0")}`;

        let totalAmount = 0;

        items.forEach(item => {
            totalAmount +=
                item.quantity * item.rate;
        });

        const [voucher] =
            await salesModel.createSalesVoucher(
                trx,
                {
                    company_id: companyId,
                    customer_ledger_id,
                    voucher_no: voucherNo,
                    voucher_date,
                    total_amount: totalAmount
                }
            );

        const voucherItems =
            items.map(item => ({
                sales_voucher_id: voucher.id,
                item_id: item.item_id,
                quantity: item.quantity,
                rate: item.rate,
                amount:
                    item.quantity * item.rate
            }));

        await salesModel.createSalesVoucherItems(
            trx,
            voucherItems
        );

        // Reduce Stock
        for (const item of items) {

            await trx("stock_items")
                .where({
                    id: item.item_id,
                    company_id: companyId
                })
                .decrement(
                    "quantity",
                    item.quantity
                );

            await trx("inventory_transactions")
                .insert({
                    company_id: companyId,
                    item_id: item.item_id,
                    transaction_type: "SALE",
                    quantity: item.quantity,
                    reference_id: voucher.id,
                    reference_type: "SALES_VOUCHER"
                });
        }

        await trx.commit();

        res.status(201).json({
            message: "Sales Voucher Created",
            voucher_no: voucherNo,
            voucher_id: voucher.id
        });

    } catch (error) {

        await trx.rollback();

        res.status(500).json({
            message: error.message
        });
    }
};