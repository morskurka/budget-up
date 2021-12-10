import CategoryCard from "./CategoryCard";

const CategoryRow = () => {
  const Supermarket = {
    icon: "shop",
    name: "Supermarket",
    currBalance: 1200,
    totalExpected: 1450,
  };

  const Electricity = {
    icon: "plug",
    name: "Electricity",
    currBalance: 700,
    totalExpected: 1200,
  };

  const Water = {
    icon: "water",
    name: "Water",
    currBalance: 121,
    totalExpected: 120,
  };

  const categories = [Supermarket, Electricity, Water];
  return (
    <section className="bg-white">
      <div classNameName="container" style={{ padding: "0 30px" }}>
        <div className="row">
          {categories.map((category) => {
            return (
              <div className="col-lg-4 col-md-6">
                <CategoryCard
                  icon={category.icon}
                  title={category.name}
                  currBalance={category.currBalance}
                  totalExpected={category.totalExpected}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryRow;
