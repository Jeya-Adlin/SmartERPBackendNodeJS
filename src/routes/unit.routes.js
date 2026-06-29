// src/routes/unit.routes.js

const router = require("express").Router();

const authMiddleware =
    require("../middleware/auth.middleware");

const unitController =
    require("../controllers/unitController");

router.use(authMiddleware);

router.post("/", unitController.create);

router.get("/", unitController.getAll);

router.get("/:id", unitController.getById);

router.put("/:id", unitController.update);

router.delete("/:id", unitController.delete);

module.exports = router;