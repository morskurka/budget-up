// Import the mssql package
var sql = require("mssql");
const fs = require("fs");
const csv = require("csv-parser");
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
  await connectionPool
    .request()
    .input("firstName", sql.NVarChar, userReg.firstName)
    .input("lastName", sql.NVarChar, userReg.lastName)
    .input("email", sql.VarChar, userReg.email)
    .input("uPassword", sql.VarChar, userReg.password)
    .query(query, (err, result) => {
      if (err) return { err };
      if (result.lenth > 0) return result;
    });
}

async function getUserFromDB(userAuth) {
  const query = `SELECT * from Users WHERE email = '${userAuth.email}' AND uPassword = '${userAuth.password}'`;
  console.log(`Executed: ${query}`);
  let user = await connectionPool.request().query(query);
  return user.recordset;
}

async function bulkInsert(body) {
  //let file = fs.readFileSync(body.file.path);
  const results = [];
  fs.createReadStream(body.file.path)
    .pipe(csv())
    .on("data", (data) => {
      try {
        let email = body.body.user;
        let { tDate, amount, category, subCategory } = data;
        //console.log(data);
        // make sure date is valid and not in the future
        if (!isNaN(amount) /* && new Date(tDate) < new Date()*/) {
          results.push([
            email,
            new Date(tDate),
            parseFloat(amount),
            category,
            subCategory,
          ]);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log(error.message);
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
        await connectionPool.request().bulk(table, function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.rowsAffected);
        });

        fs.unlink(body.file.path, (err) => {
          if (err) throw err;
          console.log(body.file.path + " was deleted");
        });
        return 200;
      } catch (error) {
        console.log(error.message);
        return 500;
      }
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
};
