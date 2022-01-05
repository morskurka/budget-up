// import express - server lib
const express = require("express");
const path = require("path");
const multer = require("multer");

// import cors to set CORS options to '*' easily
const cors = require("cors");
const dbOperations = require("./dbOperations");

const port = process.env.PORT || 5000;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../build")));

// parse all requests as json
app.use(express.json());
// set cors to '*'
app.use(cors());
app.use(express.static(__dirname)); //specifies the root directory from which to serve static assets [images, CSS files and JavaScript files]

app.options("*", cors());

//DB Connection
app.post("/api/registration", async (req, res) => {
  try {
    const rowsAffected = await dbOperations.addUserToDB(req.body);
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await dbOperations.getUserFromDB(req.body);
    res.status(200).json({ status: 200, message: user });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
  res.json();
});

app.post("/api/transactions", async (req, res) => {
  try {
    const transactions = await dbOperations.getAllTransactionsByEmail(
      req.body.email
    );
    res.status(200).json({ status: 200, message: transactions });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/transactions/add", async (req, res) => {
  try {
    const rowsAffected = dbOperations.addTransactionToDB(
      req.body.transaction,
      req.body.email
    );
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

const upload = multer({ dest: "uploads/" });
app.post(
  "/api/transactions/upload",
  upload.single("file"),
  async (req, res) => {
    try {
      const rowsAffected = await dbOperations.bulkInsert(req);
      res.status(200).json({ status: 200, message: rowsAffected });
    } catch (error) {
      res.status(503).json({ status: 503, message: error.message });
    }
  }
);

app.post("/api/transactions/update", async (req, res) => {
  try {
    const rowsAffected = await dbOperations.updateExistingTransaction(req.body);
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.post("/api/transactions/delete", async (req, res) => {
  try {
    const rowsAffected = await dbOperations.deleteTransactionById(req.body);
    res.status(200).json({ status: 200, message: rowsAffected });
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  try {
    res.status(200).sendFile(path.resolve(__dirname, "../build", "index.html"));
  } catch (error) {
    res.status(503).json({ status: 503, message: error.message });
  }
});

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);
  try {
    await dbOperations.connectToDB();
  } catch (error) {
    console.log(`Error: Can not connect to database`);
  }
});
