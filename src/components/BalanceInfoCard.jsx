import { Tooltip } from "bootstrap";
import { useEffect, useRef } from "react";

const BalanceInfoCard = ({
  title,
  subTitle,
  icon,
  amount,
  tooltipTitle,
  id,
}) => {
  const tooltipRef = useRef();

  useEffect(() => {
    new Tooltip(tooltipRef.current, {
      title: tooltipTitle,
      placement: "top",
      trigger: "hover",
    });
  }, []);

  return (
    <div className="balanceInfoCard shadow-sm h-100">
      <div className="balanceInfoCard-body p-3 p-lg-4">
        <div className="row">
          <div className="col-8">
            <h4
              className="balanceInfoCard-title mb-1 fw-bold"
              data-bs-toggle="tooltip"
              ref={tooltipRef}
            >
              {title}
            </h4>
            <div
              className={
                (amount >= 0 ? "text-success" : "text-danger") +
                " balanceInfoCard-amount fw-bold"
              }
              id={id}
            >
              {amount && amount + "$"}
            </div>
            <div className="balanceInfoCard-subTitle">{subTitle}</div>
          </div>
          <div className="col-4 text-end">
            <div className="balanceInfoCard-icon d-flex justify-content-center align-items-center">
              <i className={"bi bi-" + icon}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoCard;
