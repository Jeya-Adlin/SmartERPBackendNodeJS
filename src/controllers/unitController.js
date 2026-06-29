// src/controllers/unit.controller.js

const unitModel = require("../models/unit.model");
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

        const [unit] = await unitModel.createUnit({
            company_id: companyId,
            unit_name: req.body.unit_name,
            symbol: req.body.symbol
        });

        res.status(201).json(unit);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getAll = async (req, res) => {
    try {

        const companies = await companyModel.getCompanies(req.user.userId);
        const companyIds = companies.map((company) => company.id);

        const units =
            await unitModel.getUnits(companyIds);

        res.json(units);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getById = async (req, res) => {
    try {

        const companyId = getCompanyId(req);

        const unit =
            await unitModel.getUnitById(
                req.params.id,
                companyId
            );

        if (!unit) {
            return res.status(404).json({
                message: "Unit not found"
            });
        }

        res.json(unit);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.update = async (req, res) => {
    try {

        const companyId = getCompanyId(req);

        const [unit] =
            await unitModel.updateUnit(
                req.params.id,
                companyId,
                req.body
            );

        res.json(unit);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.delete = async (req, res) => {
    try {

        const companyId = getCompanyId(req);

        await unitModel.deleteUnit(
            req.params.id,
            companyId
        );

        res.json({
            message: "Unit deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};