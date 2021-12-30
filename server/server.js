// import express - server lib
const express = require("express");
const path = require("path");

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
app.post("/api/login", async (req, res) => {
  console.log("server-start");
  console.log(req.body);
  res.json(await dbOperations.getUserFromDB(req.body));
});

app.get("/api/transactions", async (req, res) => {
  res.json(await dbOperations.getAllTransactionsByUserID(3));
});

app.post("/api/transactions/add", async (req, res) => {
  dbOperations.addTransactionToDB(req.body);
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

app.listen(port, () => {
  dbOperations.connectToDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
