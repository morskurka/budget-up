async function getAllTransactionsByEmail(email) {
  try {
    const res = await fetch("/api/transactions", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function insertTransactionToDB(transaction, email) {
  try {
    const res = await fetch("/api/transactions/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ transaction, email }), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function deleteTransactionFromDB(transaction) {
  try {
    const res = await fetch("/api/transactions/delete", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(transaction), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function updateTransactionOnDB(transaction) {
  try {
    const res = await fetch("/api/transactions/update", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(transaction), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function uploadTransactionsFile(formData) {
  try {
    const res = await fetch("/api/transactions/upload", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: formData,
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function getUserFromDB(email, password) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function forgotPassword(email) {
  try {
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function addUserToDB(user) {
  try {
    const res = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}
export {
  getAllTransactionsByEmail,
  insertTransactionToDB,
  deleteTransactionFromDB,
  updateTransactionOnDB,
  uploadTransactionsFile,
  getUserFromDB,
  addUserToDB,
  forgotPassword,
};
