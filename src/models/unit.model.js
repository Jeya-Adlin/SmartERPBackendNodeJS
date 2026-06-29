// src/models/unit.model.js

const db = require("../config/db");

const createUnit = async (data) => {
    return db("units")
        .insert({
            ...data,
            is_active: true
        })
        .returning("*");
};

const getUnits = async (companyIdOrIds) => {
    const query = db("units").where({ is_active: true });

    if (Array.isArray(companyIdOrIds)) {
        if (companyIdOrIds.length === 0) {
            return [];
        }
        query.whereIn("company_id", companyIdOrIds);
    } else {
        query.where({ company_id: companyIdOrIds });
    }

    return query.orderBy("unit_name");
};

const getUnitById = async (id, companyId) => {
    return db("units")
        .where({
            id,
            company_id: companyId
        })
        .first();
};

const updateUnit = async (id, companyId, data) => {
    return db("units")
        .where({
            id,
            company_id: companyId
        })
        .update(data)
        .returning("*");
};

const deleteUnit = async (id, companyId) => {
    return db("units")
        .where({
            id,
            company_id: companyId
        })
        .update({
            is_active: false
        });
};

module.exports = {
    createUnit,
    getUnits,
    getUnitById,
    updateUnit,
    deleteUnit
};