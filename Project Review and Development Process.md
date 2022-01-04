# Project Review

## Base Structure

Our project is based on a client-server architecture. Both client and server developed in Javascript, using Node.js.
We used React.js on the Client side and Express.js on the server side.

### Deployment Diagram

![Package Diagram](/images/BudgetUp_Deployment_Diagram.png)

## Packages Structure

#### _GlobalState_

The GlobalState context is the core of the system. Its centralized all the shared information that needed across the system and makes sure all the components gets an updated values all the time.

For example, any change to the transactions array must be updated on the home page (to show the correct current spend in it's category), but also in category page (to show the correct values on the graph).

It also store some shared functions, as we want to reuse when possible.

#### _Server_

The server package serves the client and handles any communication with database, so we will never need to expose the database connection details on the client side.

**dbOperations** only include extracted functions from server package, for mailability reasons.

#### _Client (Pages & Components)_

The Pages package is mainly responsible for UI and UI logic.
We seperated all shared components and logic into GlobalState, as describe above.

### Package Diagram

![Package Diagram](/images/BudgetUp_Package_Diagram.png)

## DB Structure

On phase 1 we planed to use multiple tables in our database, such as the prediction parameters (or even results) for each user and each category. Our main concern was the prediction process time. We thought it will take so long, that we'll have to run it in advance and store the results on db.
Eventually, we ended up with prediction time of less than 2 seconds per user, so we just do in runtime when the user logs in. In this way we don't need to worry about prediction to be outdated.

![DB Structure](/images/DB_Structure.png)

## System Workflow

When a new user wants to use the system, he must to sign up and login.

When a user use the system for the first time, ask him to upload his banking transactions file (.csv).
All the transactions from the file are stored on the database for later use.

When we have the transactions, we can prepare them for the prediction algorithm.
First, we sort the transactions by category, and then sorting each category's transactions by months.

The input for the prediction algorithm is an `Array`, including categories objects:

```js
[
    ...
    {
        category: String, // category's name
        monthlySums: {
            currYear: Array, // sum of transactions in each month
            firstYear: Array,
            secondYear: Array,
            thirdYear: Array,
        },
        expected: Number, // prediction result
    }
    ...
]
```

For each category, we use the use data from the last 3 years to predict the expected expense's sum in the current month.

We run all 3 methods of Exponential Smoothing with initial smoothing param of `0.5`.
Then, we optimize the prediction in each method by calculating and comparing the MSE of the prediction against the past months, and updating the smoothing params accordingly.

Eventually, we use the method with the smallest MSE.

## Activity Diagram

![Activity Diagram](/images/BudgetUp_Diagrams-Activity_Prediction.png)

# Development Process

We started our development process by preparing some necessary data, and build our development environment.

First, we created 5 different potential user's profiles. For each profile, we simulated bank transactions using the simulation add-on we developed in phase 1.

Next, we created an Azure account, purchased a MSSQL server instance, and uploaded the users and their transactions to the database.

Meanwhile, we setup a git repository with a base project that includes all of the required libraries and components that we planed to use for development.

Once preparation has be done, we slipt the project into small features, where each feature is independently as much as possible.

Each one of us was responsible to several features, and every time we finished a feature we met and merge the changes into the git repo.

Most of the feature were end-to-end features, including development on client, server and DB. As a result, both of us has ability to get experienced in all used technologies.

## Challenges - TBD

TDB

### TDB

TDB

## Test Process

The tests for this project has been done both by automatic tools and manually. We used `Cypress` library for integration tests, and react integrated test module for unit-tests. Other tests has been done manually.

### _Cypress_

Cypress is an integration tests library that allow us to write code that simulate user interaction with internet browser.

When we run the tests, it launch a Chromium browser instance, and interact with the website UI just like a real person would (but way faster).

### _React Integrated Tests Module_

For unit tests, we used the react integrated tests module that pre-installed when using `create-react-app` module.

Our unit tests are focus on the correct behavior of the `Exponential-Smoothing` module, in cases of invalid input that may happened when handling user input.

### _Manual Tests_

<!-- such as connecting multiple users together -->
