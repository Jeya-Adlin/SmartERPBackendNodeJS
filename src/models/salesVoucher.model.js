const db = require("../config/db");

const createSalesVoucher = async (trx, data) => {
    return trx("sales_vouchers")
        .insert(data)
        .returning("*");
};

const createSalesVoucherItems = async (trx, items) => {
    return trx("sales_voucher_items")
        .insert(items)
        .returning("*");
};

const getLastVoucher = async () => {
    return db("sales_vouchers")
        .orderBy("id", "desc")
        .first();
};

module.exports = {
    createSalesVoucher,
    createSalesVoucherItems,
    getLastVoucher
};