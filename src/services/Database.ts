import mysql, { Pool, QueryFunction, Query } from 'mysql';
import { promisify } from 'util';
require('dotenv').config();

const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "dashboard_v1"
};


const pool: Pool = mysql.createPool(database);

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
        else{
            console.log(err.code)
        }
    }
    if (connection) 
    {connection.release();
    console.log("DB is connected")
    };
    return;
});


// Promisify the queries
pool.query = promisify(pool.query.bind(pool)) as any as QueryFunction;

export {pool}