// src/models/auth.model.js
const db = require("../config/db");

// CREATE USER
const createUser = (user) => {
  return db("users")
    .insert(user)
    .returning("*");
};

// FIND BY EMAIL
const findUserByEmail = (email) => {
  return db("users")
    .where({ email })
    .first();
};

module.exports = {
  createUser,
  findUserByEmail
};