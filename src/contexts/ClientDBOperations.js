async function getAllTransactionsByEmail(email) {
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

async function insertTransactionToDB(transaction, email) {
  await fetch("/api/transactions/add", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ transaction, email }), // body data type must match "Content-Type" header
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

async function uploadTransactionsFile(formData) {
  try {
    const res = await fetch("/api/transactions/upload", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: formData,
    });
    const status = res.status;
    console.log(status);
    return status;
  } catch (error) {
    console.error("Error:", error);
    return 500;
  }
}

export {
  getAllTransactionsByEmail,
  insertTransactionToDB,
  deleteTransactionFromDB,
  updateTransactionOnDB,
  uploadTransactionsFile,
};
