const db = require("../config/db");
//Create Item
const createItem = async (data) => {
    return db("stock_items")
        .insert(data)
        .returning("*");
}

//Get Items
const getItems = async (companyIds) => {
   return db("stock_items")
        .whereIn("company_id", companyIds)
        .orderBy("item_name");
};

// GET BY ID
const getItemById = async (id, companyId) => {
    return db("stock_items")
        .where({
            id,
            company_id: companyId
        })
        .first();
};

// UPDATE ITEM
const updateItem = async (id, companyId, data) => {
    return db("stock_items")
        .where({
            id, 
            company_id: companyId
        })
        .update(data)
        .returning("*");
};

// DELETE ITEM
const deleteItem = async (id, companyId) => {
    return db("stock_items")
        .where({
            id,
            company_id: companyId
        })
        .del();
};

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem
};