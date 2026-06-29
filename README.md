# SmartERP Backend

## Overview

SmartERP Backend is a Node.js REST API application built using Express.js, PostgreSQL, Knex.js, and JWT Authentication. The application provides APIs for managing companies, ledgers, inventory, and invoices.

---

## Technology Stack

* Node.js
* Express.js
* PostgreSQL
* Knex.js
* JWT Authentication
* bcrypt
* dotenv
* cors

---

## Database Setup

### 1. Create Database

Create a PostgreSQL database named:

```sql
CREATE DATABASE tallydb;
```

---

## Project Setup

### 2. Create Node.js Project

```bash
mkdir smarterp-backend
cd smarterp-backend

npm init -y

```

### Install Required Dependencies

```bash
npm install express pg dotenv jsonwebtoken bcrypt cors
npm install knex pg
npm install nodemon --save-dev
```

---

## JWT Secret Key Generation

Generate a secure JWT secret key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the generated key and add it to your `.env` file.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=tallydb
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_generated_secret_key
```

---

## Knex Configuration

Initialize Knex:

```bash
npx knex init
```

This creates the `knexfile.js` configuration file.

---

## Database Migrations

Create migration files:

```bash
npx knex migrate:make 01_users

npx knex migrate:make 02_companies

npx knex migrate:make 03_ledgers

npx knex migrate:make 04_units

npx knex migrate:make 05_stock_items

npx knex migrate:make 06_invoices

npx knex migrate:make 07_invoice_items

npx knex migrate:make 08_inventory_transactions

npx knex migrate:make 06_purchase_vouchers
```

Run all migrations:

```bash
npx knex migrate:latest
```

Rollback latest migration:

```bash
npx knex migrate:rollback
```

---

## Authentication Module

JWT-based authentication has been implemented.

### Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Token Generation
* Protected APIs using JWT Middleware

---

## Company Module

### APIs

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/companies     | Create Company    |
| GET    | /api/companies     | Get All Companies |
| GET    | /api/companies/:id | Get Company By ID |

---

## Ledger Module

### APIs

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/ledgers     | Create Ledger    |
| GET    | /api/ledgers     | Get All Ledgers  |
| GET    | /api/ledgers/:id | Get Ledger By ID |
| PUT    | /api/ledgers/:id | Update Ledger    |
| DELETE | /api/ledgers/:id | Delete Ledger    |

---

## Unit Module

### APIs

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/unit     | Create Unit    |
| GET    | /api/unit     | Get All Units  |
| GET    | /api/unit/:id | Get unit By ID |
| PUT    | /api/unit/:id | Update Unit    |
| DELETE | /api/unit/:id | Delete Unit    |

---
## StockItem Module

### APIs

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/item     | Create Item    |
| GET    | /api/item     | Get All item   |
| GET    | /api/item/:id | Get item By ID |
| PUT    | /api/item/:id | Update item    |
| DELETE | /api/item/:id | Delete item    |

---
## Inventory & Sales Modules

### Database Tables

* users
* companies
* ledgers
* units
* stock_items
* invoices
* invoice_items
* inventory_transactions

---
### PDF generation
```bash
npm install pdfkit
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## Project Structure

```text
smarterp-backend/
│
├── migrations/
├── routes/
├── controllers/
├── services/
├── middleware/
├── config/
├── utils/
├── knexfile.js
├── .env
├── package.json
└── server.js
```

---

## Future Enhancements

* Stock Management
* Purchase Module
* Sales Module
* GST Calculations
* Financial Reports
* Role-Based Access Control (RBAC)
* Audit Logging

---

#running the application in development mode:
```bash
 npm run dev
 ```