// src/routes/stockItem.routes.js

const router = require("express").Router();

const auth =
    require("../middleware/auth.middleware");

const controller =
    require("../controllers/stockItemController");

router.use(auth);

// CREATE
router.post("/", controller.create);

// GET ALL
router.get("/", controller.getAll);

// GET BY ID
router.get("/:id", controller.getById);

// UPDATE
router.put("/:id", controller.update);
router.put("/", controller.update);

// DELETE
router.delete("/:id", controller.delete);

module.exports = router;