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
    <div className="balanceInfoBar-back">
      <div className="balanceInfoBar-bar"></div>
      <section className="balanceInfoBar-section">
        <div className="container">
          <div className="balanceInfoBar-wrapper">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="section-title text-center"></div>
              </div>
            </div>

            <div className="row justify-content-center">
              {/*balance card*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-12">
                <BalanceInfoCard
                  title="My Balance"
                  subTitle=""
                  icon="arrow-down-up"
                  amount={myBalance}
                  tooltipTitle="Your current balance based on all known transactions"
                />
              </div>
              {/*expected balance card*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
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
              <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
                <BalanceInfoCard
                  title="Income"
                  subTitle="This Month"
                  icon="graph-up-arrow"
                  amount={income}
                  tooltipTitle="Sum of all POSITIVE transactions this month"
                />
              </div>
              {/*outcome this month card*/}
              <div className="col-xl-3 col-lg-6 col-md-6 col-12 mt-6">
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
      </section>
    </div>
  );
};

export default BalanceInfoBar;
