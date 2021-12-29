import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoCard from "../components/BalanceInfoCard";

const BalanceInfoBar = ({ backgroundColor, barColor }) => {
  const { transactions, categoriesInfo } = useContext(GlobalContext);
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
    <div className={backgroundColor}>
      <div
        className={barColor}
        style={{
          paddingTop: "4rem",
          paddingBottom: "9.5rem",
          backgroundColor: barColor,
        }}
      ></div>
      <div
        className="container-fluid"
        style={{
          marginTop: "-11rem",
          paddingRight: "2rem",
          paddingLeft: "2rem",
        }}
      >
        <div className="row g-4 mb-4">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h3 className="text-white"> Expenses</h3>
              <a href="#" className="btn btn-white">
                Create New
              </a>
            </div>
          </div>
          {/*balance card*/}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <BalanceInfoCard
              title="My Balance"
              icon="arrow-down-up"
              amount={myBalance}
              tooltipTitle="Your current balance based on all known transactions"
            />
          </div>
          {/*expected balance card*/}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
            <BalanceInfoCard
              title="Saving Balance"
              icon="emoji-smile-upside-down"
              amount={-saving}
              tooltipTitle="Sum of Transactions from 'Saving' Category"
            />
          </div>
          {/*income this month card*/}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
            <BalanceInfoCard
              title="Income This Month"
              icon="box-arrow-in-down-left"
              amount={income}
              tooltipTitle="Sum of all POSITIVE transactions this month"
            />
          </div>
          {/*outcome this month card*/}
          <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
            <BalanceInfoCard
              title="Outcome This Month"
              icon="box-arrow-up-right"
              amount={outcome}
              tooltipTitle="Sum of all NEGATIVE transactions this month"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoBar;
