// src/routes/company.routes.js

const router = require("express").Router();

const companyController = require("../controllers/companyController");
const auth = require("../middleware/auth.middleware");

// protect all routes
router.use(auth);

// company APIs
router.post("/", companyController.createCompany);
router.get("/", companyController.getCompanies);
router.get("/:id", companyController.getCompany);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;