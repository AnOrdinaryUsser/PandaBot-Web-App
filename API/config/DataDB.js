import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Credentials of DB
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DATA_DB = process.env.DATA_DB


// Connection to DB
const dataDB = new Sequelize(DATA_DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql"
});

export default dataDB;