import ProgressBarBU from "./ProgressBarBU";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";

const CategoryCard = ({ icon, title, currBalance, totalExpected }) => {
  const percentages = (currBalance / totalExpected) * 100;
  const navigate = useNavigate();
  const { setCurrCategory } = useContext(GlobalContext);

  const getTextColor = (title) => {
    let textColor = "";
    if (title.toLowerCase() !== "income" && title.toLowerCase() !== "saving") {
      percentages > 100
        ? (textColor = "text-danger ")
        : (textColor = "text-success ");
    } else {
      percentages >= 100
        ? (textColor = "text-success ")
        : (textColor = "text-danger ");
    }
    return textColor;
  };

  return (
    <div
      className="single-category"
      onClick={() => {
        setCurrCategory(title);
        sessionStorage.setItem("currCategory", title);
        console.log(sessionStorage.getItem("currCategory"));
        navigate("/CategoryPage");
      }}
    >
      <div className="category-icon d-flex justify-content-center align-items-center">
        <i className={"bi bi-" + icon + " text-white"}></i>
      </div>
      <div className="category-title pt-2">
        <h4 className="fw-bold">{title}</h4>
      </div>
      <div className="row justify-content-between">
        <div className="col">
          <div className="fw-light">Current</div>
          <div className={getTextColor(title) + "fw-bold lead"}>
            {currBalance.toFixed(0) + "$"}
          </div>
        </div>
        <div className="col text-end">
          <div className="fw-light">Expected</div>
          <div className="fw-bold lead">
            {isNaN(totalExpected) ? "N/A" : totalExpected.toFixed(0) + "$"}
          </div>
        </div>
      </div>
      <ProgressBarBU percentages={percentages} title={title} />
    </div>
  );
};

export default CategoryCard;
