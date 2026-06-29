// src/app.js

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const companyRoutes = require("./routes/company.routes");
const ledgerRoutes = require("./routes/ledger.routes");
const unitRoutes = require("./routes/unit.routes");
const stockItemRoutes = require("./routes/stockItem.routes");
const purchaseVoucherRoutes = require("./routes/purchaseVoucher.routes");
const salesVoucherRoutes =
    require("./routes/salesVoucher.routes");
const invoiceRoutes = require("./routes/invoice.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/ledgers", ledgerRoutes);
app.use("/api/units", unitRoutes);
app.use("/api/items", stockItemRoutes);
app.use(
    "/api/purchase-vouchers",
    purchaseVoucherRoutes
);
app.use(
    "/api/sales-vouchers",
    salesVoucherRoutes
);
app.use("/api/invoices", invoiceRoutes);
module.exports = app;