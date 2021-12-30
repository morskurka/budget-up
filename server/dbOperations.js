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

let connectionPool;

async function connectToDB() {
  const conn = new sql.ConnectionPool(dbConfig);
  connectionPool = await conn.connect();
  console.log("Connected to DB");
}

async function getAllTransactionsByUserID(userID) {
  const query = `SELECT * FROM Transactions WHERE userID = ${userID}`;
  let request = await connectionPool.request().query(query);
  console.log(`Executed: ${query}`);
  return request.recordset;
}

async function addTransactionToDB(t) {
  // TODO: IMPLEMENT BY LOGIC!!!
  const userID = 3;

  const query = `INSERT INTO Transactions 
                  (userID, tDate, amount, category, subCategory)
                  VALUES 
                  (@userID, @tDate, @amount, @category, @subCategory)`;
  let request = await connectionPool.request();
  request.input("userID", sql.Int, userID);
  request.input("tDate", sql.Date, new Date(t.tDate));
  request.input("amount", sql.Float, t.amount);
  request.input("category", sql.NVarChar, t.category);
  //let subCategory = t.subCategory == undefined ? null : t.subCategory;
  request.input("subCategory", sql.NVarChar, t.subCategory);

  await request.query(query);
  console.log(`Executed: ${query}`);
}

async function deleteTransactionById(transaction) {
  const query = `delete FROM Transactions WHERE id = ${transaction.id}`;
  let request = await connectionPool.request().query(query);
  console.log(`Executed: ${query}`);
}

async function updateExistingTransaction(transaction) {
  const query = `UPDATE Transactions SET
                  amount = @amount
                  WHERE
                  id = @id`;
  let request = await connectionPool.request();
  request.input("id", sql.Int, transaction.id);
  request.input("amount", sql.Float, transaction.amount);

  await request.query(query);
  console.log(`Executed: ${query}`);
}

module.exports = {
  getAllTransactionsByUserID,
  connectToDB,
  addTransactionToDB,
  deleteTransactionById,
  updateExistingTransaction,
};
