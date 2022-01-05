import BalanceInfoBar from "../components/BalanceInfoBar";
import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import { uploadTransactionsFile } from "../contexts/ClientDBOperations";
const FormData = require("form-data");

const UploadTransactions = () => {
  const { user, loadUserTransactions } = useContext(GlobalContext);

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState("");

  // upload transactions file
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files[0]) {
      setIsSelected(true);
      setUploadError("");
    } else setIsSelected(false);
  };

  const handleSubmission = async () => {
    setUploadError("");
    setUploading("Uploading... Please wait");
    const formData = new FormData();

    formData.append("name", "transactions");
    formData.append("file", selectedFile);
    formData.append("user", user.email);
    const { status, message } = await uploadTransactionsFile(formData);
    if (status === 200) {
      await loadUserTransactions();
    } else {
      setUploadError(
        `We can't upload your transactions file, please check it's format and try again.`
      );
    }
    setUploading("");
  };

  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <div className="row mt-5 mb-2 align-items-center justify-content-center text-center lead">
        We could'nt find any transactions in your account.<br></br>
        Please Upload transactions fils (.csv)
      </div>
      <div className="row mt-3 mb-3 align-items-center justify-content-center">
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
                disabled={!isSelected || uploading !== ""}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-5 align-items-center justify-content-center">
        <div className="col d-flex justify-content-center">
          <p className="social-text">{uploadError}</p>
          <p className="lead">{uploading}</p>
        </div>
      </div>
    </>
  );
};

export default UploadTransactions;
