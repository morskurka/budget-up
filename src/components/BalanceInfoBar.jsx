import BalanceInfoCard from "../components/BalanceInfoCard";

const BalanceInfoBar = ({ backgroundColor, barColor }) => {
  return (
    <div className={backgroundColor}>
      <div
        className={barColor}
        style={{ paddingTop: "4rem", paddingBottom: "9.5rem" }}
      ></div>
      <div
        className="container"
        style={{
          marginTop: "-10rem",
          paddingRight: "2rem",
          paddingLeft: "2rem",
        }}
      >
        <div className="row g-4 mb-4">
          <div className="col-lg-12 col-md-12 col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="title-white">Follow Your Expenses</h3>
              <a href="#" className="btn btn-white">
                Create New
              </a>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <BalanceInfoCard
              title="My Balance"
              icon="arrow-down-up"
              amount="1200"
            />
          </div>
          <div className="col-6 col-lg-3">
            <BalanceInfoCard
              title="Expected Balance"
              icon="emoji-smile-upside-down"
              amount="3100"
            />
          </div>
          <div className="col-6 col-lg-3">
            <BalanceInfoCard
              title="Income This Month"
              icon="box-arrow-in-down-left"
              amount="500"
            />
          </div>
          <div className="col-6 col-lg-3">
            <BalanceInfoCard
              title="Outcome This Month"
              icon="box-arrow-up-right"
              amount="100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceInfoBar;
