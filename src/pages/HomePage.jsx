import CategoryCard from "../components/CategoryCard";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import Prediction from "../components/Prediction";

const HomePage = () => {
  const { getCategoriesNames, categoriesIcons, transactions } =
    useContext(GlobalContext);

  function getCurrentMonthTransactionByCategory() {
    // get all categories names
    let categoriesSet = getCategoriesNames();

    // filter by current month
    let currMonthTransByCategory = [];
    categoriesSet.forEach((cat) => {
      let currMonthTrans = transactions.filter(
        (tran) =>
          tran.category === cat &&
          new Date(tran.date).getMonth() === new Date().getMonth()
      );
      // sum the transactions
      let sum = currMonthTrans.reduce((prev, next) => {
        return prev + next.amount;
      }, 0);
      // push to array
      currMonthTransByCategory.push({
        name: cat,
        transactions: currMonthTrans,
        sum: Math.abs(sum),
      });
    });
    return currMonthTransByCategory;
  }

  const currMonthTransByCategory = getCurrentMonthTransactionByCategory();

  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      <Prediction />
      <section className="bg-white">
        <div className="container" style={{ padding: "0 30px" }}>
          <div className={"row"}>
            {currMonthTransByCategory.map((cat, index) => {
              if (index % 3 === 0)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.name}
                      currBalance={cat.sum}
                      totalExpected={1000}
                      icon={categoriesIcons[cat.name]}
                    />
                  </div>
                );
            })}
            {currMonthTransByCategory.map((cat, index) => {
              if (index % 3 === 1)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.name}
                      currBalance={cat.sum}
                      totalExpected={1000}
                      icon={categoriesIcons[cat.name]}
                    />
                  </div>
                );
            })}
            {currMonthTransByCategory.map((cat, index) => {
              if (index % 3 === 2)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
                    <CategoryCard
                      title={cat.name}
                      currBalance={cat.sum}
                      totalExpected={1000}
                      icon={categoriesIcons[cat.name]}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
