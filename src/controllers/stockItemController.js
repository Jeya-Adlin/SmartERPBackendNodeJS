const itemModel = require("../models/stockItem.model");
const companyModel = require("../models/company.model");

// CREATE ITEM
// CREATE ITEM
exports.create = async (req, res) => {
    try {

        const companyId = req.headers["company-id"];

        const [item] = await itemModel.createItem({
            company_id: companyId,
            item_name: req.body.item_name,
            sku: req.body.sku,
            unit_id: req.body.unit_id,
            purchase_price: req.body.purchase_price,
            selling_price: req.body.selling_price,
            quantity: req.body.quantity || 0
        });

        res.status(201).json(item);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
// GET ALL ITEMS
exports.getAll = async (req, res) => {
    try {
        const companies = await companyModel.getCompanies(req.user.userId);
        const companyIds = companies.map((company) => company.id);
        const items = await itemModel.getItems(companyIds);
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// GET BY ID
exports.getById = async (req, res) => {
    try {

        const companyId = req.headers["company-id"];

        const item = await itemModel.getItemById(
            req.params.id,
            companyId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.json(item);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
// UPDATE
exports.update = async (req, res) => {
    try {

        const companyId = req.headers["company-id"];
        const itemId = req.params.id || req.query.id;

        if (!itemId) {
            return res.status(400).json({
                message: "Item ID is required"
            });
        }

        const [item] = await itemModel.updateItem(
            itemId,
            companyId,
            req.body
        );

        res.json(item);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// DELETE
exports.delete = async (req, res) => {
    try {

        const companyId = req.headers["company-id"];

        await itemModel.deleteItem(
            req.params.id,
            companyId
        );

        res.json({
            message: "Item deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};