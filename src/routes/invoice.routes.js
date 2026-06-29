const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/invoiceController");

router.use(auth);

// Download Sales Invoice PDF
router.get("/sales/:id", controller.downloadSalesInvoice);

module.exports = router;