# BudgetUp - User Guide

## [BudgetUp Website Link](https://budget-up.azurewebsites.net/)

---

## General Description

BudgetUp is a web application that use time-series analysis methods to analyze and predict users expenses based on their bank account transactions.

The system can be used by anyone as long as they have a table of banking transactions in the following format:

| category    | subCategory |   tDate    | amount |
| ----------- | :---------: | :--------: | :----: |
| Income      |  Salary 1   | 2021-10-10 | 15000  |
| Income      |  Salary 2   | 2021-07-10 | 12000  |
| Supermarket |  Rami Levi  | 2021-08-24 |  -657  |

Categories name can be anything, but we do expect for `Income` category.

## Sign-up / Sign-in

In order to use the system, you will need first to sign-up.
Go to [BudgetUp HomePage](https://budget-up.azurewebsites.net/) and follow the instructions.

If you just want to get impression of the system, you can login to our demo user:

- username: demouser@gmail.com
- password: qcbbunae9g

## HomePage

once you logged in, you'll pass to the homepage.

The system will load your banking transactions from the DB, analyze it, sort it by categories and make a prediction of your expenses in each category.
This is the main page of our app.

### Balance Info Bar

On the top of the page you'll see your Balance Info Bar with some general information about your account, such as current balance, current saving balance, sum of incomes this month and sum of expenses this month.

### Category Info Cards

Below the Balance Info Bar you'll find an Category Info Card for each detected category from your transactions.

Each Category Info Card includes the of the category, sum of your expenses this month in this category, and the expected amount the system predict you'll expense in this category.
You'll also find a progress bar that visualize the relation between your current expenses and the prediction.

Clicking on a category will pass you to the Category Page.

## Category Page

The Category Page includes 2 main components. A graph, which shows sum of your expenses each month in the past year. And a table, that shows you all the transactions in this category in the past year.

Hovering with your mouse on each column of the graph will reveal the exact amount for this month.

## Classify Cash Withdrawal

Back to Homepage and you'll find a 'Classify Cash Withdrawal' button. Click on the button and you'll pass to the Classify Cash Withdrawal page.

In this page you can classify cash withdrawals into categories, so we can know on in which category you spent the money, and recalculate the prediction based on the updated amounts.

The system shows you one withdrawal at a time, and you can classify its amount into one or more categories.

You move between withdrawals with the arrows at left-down corner.

After clicking save, the system will update the new info in the database, recalculate the prediction and pass you back to the homepage.

## Add Income Transaction

Also in homepage, You will find the 'Add Income Transaction'. Click on the button and you'll pass to the Add Income Transaction page.

Here you add incomes that are not shown the system, such as cash you received from customers and didn't deposit on your bank account.

After filling the source, date, and amount, click save and the system will update the new info in the database, recalculate the prediction and pass you back to the homepage.

Any amount you add in this page is added to Income category.
