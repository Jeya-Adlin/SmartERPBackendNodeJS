const PDFDocument = require("pdfkit");

const generateInvoicePdf = (voucher, items, customer, res) => {

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `inline; filename=${voucher.voucher_no}.pdf`
    );

    doc.pipe(res);

    // ================= HEADER =================
    doc.fontSize(20).text("SmartERP Invoice", { align: "center" });
    doc.moveDown();

    doc.fontSize(12)
        .text(`Invoice No: ${voucher.voucher_no}`)
        .text(`Date: ${new Date(voucher.voucher_date).toDateString()}`);

    doc.moveDown();

    // ================= CUSTOMER =================
    doc.fontSize(12).text("Bill To:");
    doc.text(customer.ledger_name);
    doc.text(customer.address || "");
    doc.text(customer.phone || "");

    doc.moveDown();

    // ================= TABLE HEADER =================
    const tableTop = 250;

    doc.fontSize(10);

    doc.text("Item", 50, tableTop);
    doc.text("Qty", 250, tableTop);
    doc.text("Rate", 300, tableTop);
    doc.text("Amount", 400, tableTop);

    // Draw line under header
    doc.moveTo(50, tableTop + 15)
        .lineTo(500, tableTop + 15)
        .stroke();

    // ================= TABLE ROWS =================
    let y = tableTop + 25;

    items.forEach((item) => {

        doc.text(item.item_name, 50, y);
        doc.text(item.quantity.toString(), 250, y);
        doc.text(item.rate.toString(), 300, y);
        doc.text(item.amount.toString(), 400, y);

        y += 20;
    });

    // ================= TOTAL =================
    doc.moveDown(2);

    doc.fontSize(12)
        .text(
            `Total: ${voucher.total_amount}`,
            400,
            y + 20
        );

    doc.end();
};

module.exports = {
    generateInvoicePdf
};