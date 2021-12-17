import CategoryCard from "./CategoryCard";
import { useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";

const CategoryRow = () => {
  const {
    transactions,
    getCurrentMonthTransactionByCategory,
    categoriesIcons,
  } = useContext(GlobalContext);

  const currMonthTransByCategory = getCurrentMonthTransactionByCategory();

  return (
    <>
      {" "}
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />;
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

export default CategoryRow;
