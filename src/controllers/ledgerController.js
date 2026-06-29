const ledgerModel = require("../models/ledger.model");
const companyModel = require("../models/company.model");

const getCompanyId = (req) => {
  const headerValue = req.headers["company-id"] || req.headers["company_id"];
  if (!headerValue) {
    const error = new Error("company-id header is required");
    error.status = 400;
    throw error;
  }
  const companyId = Number(headerValue);
  if (!Number.isInteger(companyId) || companyId <= 0) {
    const error = new Error("company-id must be a positive integer");
    error.status = 400;
    throw error;
  }
  return companyId;
};

exports.create = async (req, res) => {
  try {

    const companyId = getCompanyId(req);

    const [ledger] = await ledgerModel.createLedger({
      company_id: companyId,
      ...req.body
    });

    res.status(201).json(ledger);

  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message
    });
  }
};

exports.getAll = async (req, res) => {

  try {

    const companies = await companyModel.getCompanies(req.user.userId);
    const companyIds = companies.map((company) => company.id);

    const ledgers = await ledgerModel.getLedgers(companyIds);

    res.json(ledgers);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.getById = async (req, res) => {

  try {

    const companyId = getCompanyId(req);

    const ledger =
      await ledgerModel.getLedgerById(
        req.params.id,
        companyId
      );

    if (!ledger) {
      return res.status(404).json({
        message: "Ledger not found"
      });
    }

    res.json(ledger);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.update = async (req, res) => {

  try {

    const companyId = getCompanyId(req);

    const [ledger] =
      await ledgerModel.updateLedger(
        req.params.id,
        companyId,
        req.body
      );

    res.json(ledger);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.delete = async (req, res) => {

  try {

    const companyId = getCompanyId(req);

    await ledgerModel.deleteLedger(
      req.params.id,
      companyId
    );

    res.json({
      message: "Ledger deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};