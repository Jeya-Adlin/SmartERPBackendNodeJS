const router = require("express").Router();

const auth =
    require("../middleware/auth.middleware");

const controller =
    require("../controllers/salesVoucherController");

router.use(auth);

router.post("/", controller.create);

module.exports = router;