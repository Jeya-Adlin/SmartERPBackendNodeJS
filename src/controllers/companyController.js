// src/controllers/companyController.js

const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} = require("../models/company.model");

// CREATE COMPANY
exports.createCompany = async (req, res) => {
  try {
    const userId = req.user.userId;

    const companyName = req.body.company_name || req.body.companyName;
    if (!companyName || String(companyName).trim() === "") {
      return res.status(400).json({ message: "company_name is required" });
    }
    if (req.body.companyName && !req.body.company_name) {
      req.body.company_name = req.body.companyName;
    }

    // OPTIONAL RULE: max 5 companies
    const existingCompanies = await getCompanies(userId);

    if (existingCompanies.length >= 5) {
      return res.status(400).json({
        message: "Maximum 5 companies allowed"
      });
    }

    const [company] = await createCompany(req.body, userId);

    res.status(201).json(company);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL COMPANIES
exports.getCompanies = async (req, res) => {
  try {
    const companies = await getCompanies(req.user.userId);
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE COMPANY
exports.getCompany = async (req, res) => {
  try {
    const company = await getCompanyById(
      req.params.id,
      req.user.userId
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE COMPANY
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompanies = await updateCompany(
      req.params.id,
      req.body,
      req.user.userId
    );
    res.json(updatedCompanies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE COMPANY
exports.deleteCompany = async (req, res) => {
  try {
    await deleteCompany(req.params.id, req.user.userId);
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};