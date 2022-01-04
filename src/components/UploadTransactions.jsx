import BalanceInfoBar from "../components/BalanceInfoBar";
import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import {
  uploadTransactionsFile,
  getAllTransactionsByEmail,
} from "../contexts/ClientDBOperations";
const fs = require("fs");
const FormData = require("form-data");

const UploadTransactions = () => {
  const { user, loadUserTransactions } = useContext(GlobalContext);

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  // upload transactions file
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files[0]) setIsSelected(true);
    else setIsSelected(false);
  };

  const handleSubmission = async () => {
    const formData = new FormData();

    formData.append("name", "transactions");
    formData.append("file", selectedFile);
    formData.append("user", user.email);
    let uploadStatus = await uploadTransactionsFile(formData);
    if (uploadStatus === 200) {
      await loadUserTransactions();
    }
  };

  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <div className="row mt-5 mb-2 align-items-center justify-content-center text-center lead">
        We could'nt find any transactions in your account.<br></br>
        Please Upload transactions fils (.csv)
      </div>
      <div className="row mt-3 mb-5 align-items-center justify-content-center">
        <div className="col d-flex justify-content-center">
          <div className="d-flex justify-content-center">
            <input
              type="file"
              name="file"
              onChange={changeHandler}
              className="form-control me-3"
              id="formFile"
            />
            <div>
              <button
                className="btn btn-success"
                onClick={handleSubmission}
                disabled={!isSelected}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadTransactions;
