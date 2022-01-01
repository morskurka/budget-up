async function getAllTransactionsByEmail(email) {
  console.log(`start getAllTransactionsByEmail: ${email}`);
  const res = await fetch("/api/transactions", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ email }), // body data type must match "Content-Type" header
  });
  let transactions = await res.json();
  return transactions;
}

async function insertTransactionToDB(transaction) {
  await fetch("/api/transactions/add", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(transaction), // body data type must match "Content-Type" header
  });
}

async function deleteTransactionFromDB(transaction) {
  await fetch("/api/transactions/delete", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(transaction), // body data type must match "Content-Type" header
  });
}

async function updateTransactionOnDB(transaction) {
  await fetch("/api/transactions/update", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(transaction), // body data type must match "Content-Type" header
  });
}

export {
  getAllTransactionsByEmail,
  insertTransactionToDB,
  deleteTransactionFromDB,
  updateTransactionOnDB,
};
