// src/routes/purchaseVoucher.routes.js

const router = require("express").Router();

const auth =
    require("../middleware/auth.middleware");

const controller =
    require("../controllers/purchaseVoucherController");

router.use(auth);

router.post("/", controller.create);

module.exports = router;