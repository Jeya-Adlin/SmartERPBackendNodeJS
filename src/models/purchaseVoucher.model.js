// src/models/purchaseVoucher.model.js

const db = require("../config/db");

const createPurchaseVoucher = async (trx, voucherData) => {
    return trx("purchase_vouchers")
        .insert(voucherData)
        .returning("*");
};

const createPurchaseVoucherItems = async (trx, items) => {
    return trx("purchase_voucher_items")
        .insert(items)
        .returning("*");
};

const getLastVoucher = async () => {
    return db("purchase_vouchers")
        .orderBy("id", "desc")
        .first();
};

module.exports = {
    createPurchaseVoucher,
    createPurchaseVoucherItems,
    getLastVoucher
};