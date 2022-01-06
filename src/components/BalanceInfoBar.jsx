import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoCard from "../components/BalanceInfoCard";

const BalanceInfoBar = () => {
  const { transactions, user } = useContext(GlobalContext);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getUTCFullYear();

  // calculate balance
  const [myBalance, setMyBalance] = useState(0);

  useEffect(() => {
    const balance = transactions.reduce((acc, item) => (acc += item.amount), 0);
    setMyBalance(balance);
  }, [transactions]);

  //calculate income this month
  const income = transactions
    .filter(
      (item) =>
        item.amount > 0 &&
        new Date(item.tDate).getUTCFullYear() === currentYear &&
        new Date(item.tDate).getMonth() === currentMonth
    )
    .reduce((acc, item) => (acc += item.amount), 0);

  //calculate outcome this month
  const outcome = transactions
    .filter(
      (item) =>
        item.amount < 0 &&
        new Date(item.tDate).getUTCFullYear() === currentYear &&
        new Date(item.tDate).getMonth() === currentMonth
    )
    .reduce((acc, item) => (acc += item.amount), 0);

  //calculate global saving amount
  const saving = transactions
    .filter((item) => item.category.toLowerCase() === "saving")
    .reduce((acc, item) => (acc += item.amount), 0);

  return (
    <div className="balanceInfoBar-back" id="balanceInfoBar">
      <div className="balanceInfoBar-bar"></div>
      <section className="balanceInfoBar-section">
        <div className="container">
          <div className="balanceInfoBar-wrapper">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel carousel-dark slide d-block d-xl-none carousel-size "
              data-bs-touch="false"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <BalanceInfoCard
                    title="My Balance"
                    subTitle=""
                    icon="arrow-down-up"
                    amount={myBalance}
                    tooltipTitle="Your current balance based on all known transactions"
                  />
                </div>
                <div className="carousel-item">
                  <BalanceInfoCard
                    title="Saving Balance"
                    subTitle=""
                    icon="piggy-bank"
                    amount={-saving}
                    tooltipTitle="Sum of Transactions from 'Saving' Category"
                    id="savingInfoCard"
                  />
                </div>
                <div className="carousel-item">
                  <BalanceInfoCard
                    title="Income"
                    subTitle="This Month"
                    icon="graph-up-arrow"
                    amount={income}
                    tooltipTitle="Sum of all POSITIVE transactions this month"
                  />
                </div>
                <div className="carousel-item">
                  <BalanceInfoCard
                    title="Outcome"
                    subTitle="This Month"
                    icon="graph-down-arrow"
                    amount={outcome}
                    tooltipTitle="Sum of all NEGATIVE transactions this month"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className=" d-xl-block d-none">
              <div className="row justify-content-center">
                {/*balance card*/}
                <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-1">
                  <BalanceInfoCard
                    title="My Balance"
                    subTitle=""
                    icon="arrow-down-up"
                    amount={myBalance}
                    tooltipTitle="Your current balance based on all known transactions"
                  />
                </div>
                {/*expected balance card*/}
                <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-1">
                  <BalanceInfoCard
                    title="Saving Balance"
                    subTitle=""
                    icon="piggy-bank"
                    amount={-saving}
                    tooltipTitle="Sum of Transactions from 'Saving' Category"
                    id="savingInfoCard"
                  />
                </div>
                {/*income this month card*/}
                <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-1">
                  <BalanceInfoCard
                    title="Income"
                    subTitle="This Month"
                    icon="graph-up-arrow"
                    amount={income}
                    tooltipTitle="Sum of all POSITIVE transactions this month"
                  />
                </div>
                {/*outcome this month card*/}
                <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-1">
                  <BalanceInfoCard
                    title="Outcome"
                    subTitle="This Month"
                    icon="graph-down-arrow"
                    amount={outcome}
                    tooltipTitle="Sum of all NEGATIVE transactions this month"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BalanceInfoBar;
