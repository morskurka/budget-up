import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

const BalanceInfoCard = ({ title, icon, amount, tooltipTitle }) => {
  const tooltipRef = useRef();

  useEffect(() => {
    var tooltip = new Tooltip(tooltipRef.current, {
      title: tooltipTitle ? tooltipTitle : "test",
      placement: "top",
      trigger: "hover",
    });
  }, []);

  return (
    <div
      className="card border-0"
      style={{
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%)",
      }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="pt-3" data-bs-toggle="tooltip" ref={tooltipRef}>
              {title}
            </h4>
          </div>
          <div className="text-primary">
            <i className={"bi bi-" + icon + " fs-4"}></i>
          </div>
        </div>
        <div
          className={
            (amount >= 0 ? "text-success" : "text-danger") + " fw-bold pt-3"
          }
        >
          <h1>{amount && amount + "$"}</h1>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoCard;
