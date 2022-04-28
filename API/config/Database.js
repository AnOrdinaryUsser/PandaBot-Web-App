const mysql = require("mysql")
require("dotenv").config()

// Credentials of DB
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

// Connection to DB
const db = mysql.createPool({
   connectionLimit: 100,
   host: DB_HOST,         //This is your localhost IP
   user: DB_USER,         // "newuser" created in Step 1(e)
   password: DB_PASSWORD, // password for the new user
   database: DB_DATABASE, // Database name
   port: DB_PORT          // port name, "3306" by default
})

var getConnection = function (cb) {
    db.getConnection((err, connection) => {
        //if(err) throw err;
        //pass the error to the cb instead of throwing it
        if(err) {
          return cb(err);
        }
        cb(null, connection);
    });
};
module.exports = getConnection;