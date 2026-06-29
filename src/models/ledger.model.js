const db = require("../config/db");

const createLedger = async (data) => {
  return db("ledgers")
    .insert(data)
    .returning("*");
};

const getLedgers = async (companyIds) => {
  if (!companyIds || (Array.isArray(companyIds) && companyIds.length === 0)) {
    return [];
  }

  const query = db("ledgers").where({ is_active: true });

  if (Array.isArray(companyIds)) {
    query.whereIn("company_id", companyIds);
  } else {
    query.where({ company_id: companyIds });
  }

  return query.orderBy("ledger_name");
};

const getLedgerById = async (id, companyId) => {
  return db("ledgers")
    .where({
      id,
      company_id: companyId
    })
    .first();
};

const updateLedger = async (id, companyId, data) => {
  return db("ledgers")
    .where({
      id,
      company_id: companyId
    })
    .update(data)
    .returning("*");
};

const deleteLedger = async (id, companyId) => {
  return db("ledgers")
    .where({
      id,
      company_id: companyId
    })
    .update({
      is_active: false
    });
};

module.exports = {
  createLedger,
  getLedgers,
  getLedgerById,
  updateLedger,
  deleteLedger
};