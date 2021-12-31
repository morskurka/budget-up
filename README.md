# BudgetUp Maintenance Guide

BudgetUp is a web application that use time-series analysis methods to analyze and predict users expenses based on their bank account transactions.

The service assumes that your transactions are classified into several major categories such as Supermarket, Electricity, Water, ect. (the service is agnostic to the categories name's).

## Run Locally

### _Preparation_

BudgetUp uses React-js library on client side, Express.js library on server side, and MSSQL server as database.
Therefor, you'll need to install node.js, npm, and MSSQL in order to build our project.

To run this app locally on your computer you will first need to install dependencies:

1. clone this repo
2. cd into `budget-up` folder (the root folder)
3. run in terminal:
   ```cmd
   npm install
   cd server
   npm install
   ```

You will also need to provide a `.env` file in the following format:

```
SERVER=YOUR_DB_SERVER_URL
DATABASE=YOUR_DB_NAME
USER=YOUR_DB_USERNAME
PASSWORD=YOUR_DB_PASSWORD
DB_PORT=YOUR_DB_PORT
```

Place your `.env` file in `budget-up` root folder.

### _Launch Server_

Navigate back to `budget-up` root folder and run in terminal: `npm start`

### _Launch Client_

run in **new terminal**:

`npm run startlocal`

**Please note that both server and client needs to run in parallel.**

## Contribution

If you want to add functionality to the project, please follow this rules:

### _Add UI Component:_

1. Create your new `.jsx` components inside `/src/components` folder.
2. Create your pages (based on existing or new components), inside `/src/pages` folder.

### _Manipulate GlobalState / Store:_

1. Add your contexts inside `/src/contexts/GlobalState.jsx`. Any changes to `initialState` object must be done through `dispatch()` function.

   `dispatch()` gets an `Object` with 2 fields:

   - `type`: a `String` that describe the event (`"ADD_INCOME_TRANSACTION"` for example)
   - `payload`: an `Object` that can be manipulate later in `AppReducer()`.

2. `AppReducer()` is only function that can the `initialState` object. In order to do so, you just need to return the new state from the function.

#### Example

`GlobalState.jsx`:

```js
async function addIncomeTransaction(transaction) {
  dispatch({
    type: "ADD_INCOME_TRANSACTION",
    payload: {
      id: 1,
      category: "Income",
      subCategory: "Salary 1",
      tDate: "2021-12-10", // YYYY-MM-DD
      amount: 17500,
    },
  });
}
```

`AppReducer.jsx`:

```js
export default (state, action) => {
  switch (action.type) {
    // ...
    case "ADD_INCOME_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    // ...
  }
};
```

**PLEASE NOTE**

Changing the `GlobalState` DOES NOT EFFECT the database. To store changes in database, see the next chapter.

### _Add Server & DB Communication:_

**Any communication with DB must be done trough the server.**

Client shall never make any DB request directly.

All client to server calls are done through REST API. Client functions that makes API calls are stored in `/src/context/ClientDBOperations.js`
Make a call to server:

1. Add your new function to `ClientDBOperations.js`. If your call involve DB communication, Please make sure its URL starts with `/api/`.
2. Add handler function on server file: `/server/server.js`
3. If your call involve DB communication, make a new function inside `/server/dbOperations.js` and call it from the function you created in section 2.

#### Example

`GlobalState.jsx`

```js
async function addIncomeTransaction(transaction) {
  dispatch({
    type: "ADD_INCOME_TRANSACTION",
    payload: transaction,
  });
  insertTransactionToDB(transaction); // server call
}
```

`ClientDBOperations.js`

```js
async function insertTransactionToDB(transaction) {
  await fetch("/api/transactions/add", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction), // body data type must match "Content-Type" header
  });
}
```

`server.js`

```js
app.post("/api/transactions/add", async (req, res) => {
  dbOperations.addTransactionToDB(req.body); // DB function
});
```

`dbOperations.js`

```js
async function addTransactionToDB(t) {
  const query = `INSERT INTO Transactions 
                  (userID, tDate, amount, category, subCategory)
                  VALUES 
                  (@userID, @tDate, @amount, @category, @subCategory)`;
  let request = await connectionPool.request();
  request.input("userID", sql.Int, 1); // real userID
  request.input("tDate", sql.Date, new Date(t.tDate));
  request.input("amount", sql.Float, t.amount);
  request.input("category", sql.NVarChar, t.category);
  request.input("subCategory", sql.NVarChar, t.subCategory);
  await request.query(query);
}
```

## Package Diagram

![Package Diagram](/images/BudgetUp_Package_Diagram.png)

## Deployment Diagram

![Package Diagram](/images/BudgetUp_Deployment_Diagram.png)

## DB Structure

![DB Structure](/images/DB_Structure.png)
