// Import the mssql package
var sql = require("mssql");
require("dotenv").config({ path: __dirname + "/../.env" });

// Create a configuration object for our Azure SQL connection parameters
var dbConfig = {
  server: process.env.SERVER, // Use your SQL server name
  database: process.env.DATABASE, // Database to connect to
  user: process.env.USER, // Use your username
  password: process.env.PASSWORD, // Use your password
  port: parseInt(process.env.DB_PORT),
  // Since we're on Windows Azure, we need to set the following options
  options: {
    encrypt: true,
  },
};

async function getAllTransactionsByUserID(userID) {
  // Create connection instance
  const conn = new sql.ConnectionPool(dbConfig);
  let pool = await conn.connect();
  console.log("Connected");
  let request = await pool
    .request()
    .query(`SELECT * from Transactions WHERE userID = ${userID}`);
  console.log("Query executed");
  conn.close();
  console.log("Connection closed");
  return request.recordset;
}

module.exports = {
  getAllTransactionsByUserID,
  
};
