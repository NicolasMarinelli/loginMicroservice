"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const mysql_1 = __importDefault(require("mysql"));
const util_1 = require("util");
require('dotenv').config();
const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "dashboard_v1"
};
const pool = mysql_1.default.createPool(database);
exports.pool = pool;
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("DATABASE_CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TOO MANY CONNECTIONS");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("DATABASE CONECTION WAS REFUSED");
        }
        if (err.code === "ER_DBACCESS_DENIED") {
            console.error("DATABASE CONECTION WAS Denied");
        }
        else {
            console.log(err.code);
        }
    }
    if (connection) {
        connection.release();
        console.log("DB is connected");
    }
    ;
    return;
});
// Promisify the queries
pool.query = (0, util_1.promisify)(pool.query.bind(pool));
