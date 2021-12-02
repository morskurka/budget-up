import CategoryList from "../components/CategoryList";
import BalanceInfo from "../components/BalanceInfo";

const HomePage = () => {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-lg-2 justify-content-center">
        <BalanceInfo title="Add Cash Expense" />
        <BalanceInfo title="Add Event" />
      </div>
      <div className="col-lg-9">
        <div className="row">
          <div className="col-lg-3">
            <BalanceInfo title="Current Balance" amount="100" />
            <BalanceInfo title="Current Balance" amount="-500" />
            <BalanceInfo title="Income This Month" amount="12000" />
            <BalanceInfo title="Outcome This Month" amount="-7800" />
          </div>
          <div className="col-lg-1 border-start d-none d-lg-block"></div>
          <div className="col-lg-8">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
