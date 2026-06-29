const db = require("../config/db");
const { generateInvoicePdf } = require("../utils/invoicePdf");

exports.downloadSalesInvoice = async (req, res) => {

    try {

        const { id } = req.params;
        const companyId = req.headers["company-id"];

        // Get voucher
        const voucher = await db("sales_vouchers")
            .where({ id, company_id: companyId })
            .first();

        if (!voucher) {
            return res.status(404).json({
                message: "Invoice not found"
            });
        }

        // Get items
        const items = await db("sales_voucher_items as vi")
            .join("stock_items as si", "vi.item_id", "si.id")
            .select(
                "si.item_name",
                "vi.quantity",
                "vi.rate",
                "vi.amount"
            )
            .where("vi.sales_voucher_id", id);

        // Get customer
        const customer = await db("ledgers")
            .where({ id: voucher.customer_ledger_id })
            .first();

        generateInvoicePdf(voucher, items, customer, res);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};