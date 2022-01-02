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

async function getAllTransactionsByEmail(email) {
  const query = `SELECT * FROM Transactions WHERE email = '${email}'`;
  let request = await connectionPool.request().query(query);
  console.log(`Executed: ${query}`);
  return request.recordset;
}

async function addTransactionToDB(t, email) {
  const query = `INSERT INTO Transactions 
                  (email, tDate, amount, category, subCategory)
                  VALUES 
                  (@email, @tDate, @amount, @category, @subCategory)`;
  await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .input("tDate", sql.Date, new Date(t.tDate))
    .input("amount", sql.Float, t.amount)
    .input("category", sql.NVarChar, t.category)
    .input("subCategory", sql.NVarChar, t.subCategory)
    .query(query);
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

async function addUserToDB(userReg) {
  const query = `INSERT INTO Users 
  (firstName, lastName, email, uPassword)
  VALUES 
  (@firstName, @lastName, @email, @uPassword)`;
  let user = await connectionPool
    .request()
    .input("firstName", sql.NVarChar, userReg.firstName)
    .input("lastName", sql.NVarChar, userReg.lastName)
    .input("email", sql.VarChar, userReg.email)
    .input("uPassword", sql.VarChar, userReg.password)
    .query(query);

  return user;
}

async function getUserFromDB(userAuth) {
  const query = `SELECT * from Users WHERE email = '${userAuth.email}' AND uPassword = '${userAuth.password}'`;
  console.log(`Executed: ${query}`);
  let user = await connectionPool.request().query(query);
  return user.recordset;
}

module.exports = {
  getAllTransactionsByEmail,
  addUserToDB,
  getUserFromDB,
  connectToDB,
  addTransactionToDB,
  deleteTransactionById,
  updateExistingTransaction,
};
