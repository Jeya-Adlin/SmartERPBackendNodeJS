const router = require("express").Router();

const auth =
  require("../middleware/auth.middleware");

const ledgerController =
  require("../controllers/ledgerController");

router.use(auth);

router.post("/", ledgerController.create);

router.get("/", ledgerController.getAll);

router.get("/:id", ledgerController.getById);

router.put("/:id", ledgerController.update);

router.delete("/:id", ledgerController.delete);

module.exports = router;