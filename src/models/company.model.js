// src/models/company.model.js

const db = require("../config/db");

// CREATE COMPANY
const createCompany = async (data, userId) => {
  // whitelist allowed company fields to avoid inserting invalid columns
  const allowed = [
    "company_name",
    "address",
    "gst_number",
    "financial_year",
    "state",
    "contact_no"
  ];

  const insertData = { user_id: userId };

  // map possible incoming `phone` field to `contact_no`
  if (data.phone) insertData.contact_no = data.phone;
  if (data.companyName && !data.company_name) insertData.company_name = data.companyName;

  allowed.forEach((key) => {
    if (key === "contact_no") return; // handled above
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      insertData[key] = data[key];
    }
  });

  return db("companies").insert(insertData).returning("*");
};

// GET ALL COMPANIES
const getCompanies = async (userId) => {
  return db("companies")
    .where({ user_id: userId });
};

// GET SINGLE COMPANY
const getCompanyById = async (id, userId) => {
  return db("companies")
    .where({ id, user_id: userId })
    .first();
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById
};