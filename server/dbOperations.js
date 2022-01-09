// Import the mssql package
require("dotenv").config({ path: __dirname + "/../.env" });
var sql = require("mssql");
const fs = require("fs");
const csv = require("csv-parser");
const bcrypt = require("bcryptjs");

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
  const query = `SELECT * FROM Transactions WHERE email = @email`;
  let request = await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .query(query);
  console.log(`Executed: ${query}`);
  return request.recordset;
}

async function addTransactionToDB(t, email) {
  const query = `INSERT INTO Transactions 
                  (email, tDate, amount, category, subCategory)
                  VALUES 
                  (@email, @tDate, @amount, @category, @subCategory)`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .input("tDate", sql.Date, new Date(t.tDate))
    .input("amount", sql.Float, t.amount)
    .input("category", sql.NVarChar, t.category)
    .input("subCategory", sql.NVarChar, t.subCategory)
    .query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function deleteTransactionById(transaction) {
  const query = `delete FROM Transactions WHERE id = @id`;
  const result = await connectionPool
    .request()
    .input("id", sql.Int, transaction.id)
    .query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function updateExistingTransaction(transaction) {
  const query = `UPDATE Transactions SET
                  amount = @amount
                  WHERE
                  id = @id`;
  const request = await connectionPool.request();
  request.input("id", sql.Int, transaction.id);
  request.input("amount", sql.Float, transaction.amount);

  await request.query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function validateUserExist(email) {
  const getUserQuery = `SELECT email from Users WHERE email = @email`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, email)
    .query(getUserQuery);
  return result.recordset;
}

async function updateUserPassword(email, newPassword) {
  const query = `UPDATE Users SET
                  uPassword = @newPassword
                  WHERE
                  email = @email`;
  const hash = await bcrypt.hash(newPassword, 10);

  const request = await connectionPool.request();
  request.input("email", sql.VarChar, email);
  request.input("newPassword", sql.VarChar, hash);

  const result = await request.query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function addUserToDB(userReg) {
  const query = `INSERT INTO Users 
  (firstName, lastName, email, uPassword)
  VALUES 
  (@firstName, @lastName, @email, @uPassword)`;
  // hash password for security reasons
  const hash = await bcrypt.hash(userReg.password, 10);
  const result = await connectionPool
    .request()
    .input("firstName", sql.NVarChar, userReg.firstName)
    .input("lastName", sql.NVarChar, userReg.lastName)
    .input("email", sql.VarChar, userReg.email)
    .input("uPassword", sql.VarChar, hash)
    .query(query);
  console.log(`Executed: ${query}`);
  return result.rowsAffected;
}

async function getUserFromDB(userAuth) {
  const query = `SELECT * from Users WHERE email = @email`;
  const result = await connectionPool
    .request()
    .input("email", sql.VarChar, userAuth.email)
    .query(query);
  // if user found
  if (result.recordset.length > 0) {
    // compare hashed passwords
    const dbHash = result.recordset[0].uPassword;
    const validPass = await bcrypt.compare(userAuth.password, dbHash);
    // if valid -> return the user
    if (validPass) {
      console.log(`Executed: ${query}`);
      return result.recordset;
    } else {
      // password not match
      console.log(`Executed: ${query} Not found`);
      return [];
    }
  } else {
    // user not found
    return [];
  }
}

async function bulkInsert(body) {
  return new Promise(function (resolve, reject) {
    const results = [];
    fs.createReadStream(body.file.path)
      .pipe(csv())
      .on("data", (data) => {
        try {
          let email = body.body.user;
          let { tDate, amount, category, subCategory } = data;
          // make sure date is valid and not in the future
          if (
            !isNaN(amount) &&
            tDate !== "" &&
            category != "" /* && new Date(tDate) < new Date()*/
          ) {
            results.push([
              email,
              new Date(tDate),
              parseFloat(amount),
              category,
              subCategory,
            ]);
          } else {
            reject(new Error(`Can't parse line: ${data}`));
          }
        } catch (error) {
          reject(error);
        }
      })
      .on("end", async () => {
        try {
          const table = new sql.Table("Transactions");
          table.create = false; // presuming table already exists
          table.columns.add("email", sql.VarChar, { nullable: false });
          table.columns.add("tDate", sql.Date, { nullable: false });
          table.columns.add("amount", sql.Float, { nullable: false });
          table.columns.add("category", sql.NVarChar, { nullable: false });
          table.columns.add("subCategory", sql.NVarChar, { nullable: true });
          // Add rows
          results.forEach((row) =>
            table.rows.add(row[0], row[1], row[2], row[3], row[4])
          );
          const res = await connectionPool.request().bulk(table);
          console.log("Number of records inserted: " + res.rowsAffected);

          fs.unlinkSync(body.file.path);
          console.log(body.file.path + " was deleted");
          resolve(res.rowsAffected);
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
}

module.exports = {
  getAllTransactionsByEmail,
  addUserToDB,
  getUserFromDB,
  connectToDB,
  addTransactionToDB,
  deleteTransactionById,
  updateExistingTransaction,
  bulkInsert,
  updateUserPassword,
  validateUserExist,
};
