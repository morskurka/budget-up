import CategoryCard from "./CategoryCard";

const CategoryRow = () => {
  const Supermarket = {
    icon: "cart3",
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
    icon: "droplet",
    name: "Water",
    currBalance: 121,
    totalExpected: 120,
  };

  const categories = [Supermarket, Electricity, Water];

  return (
    <section className="bg-white">
      <div className="container" style={{ padding: "0 30px" }}>
        <div className="row">
          {categories.map((category, index) => {
            return (
              <div className="col-lg-4 col-md-6" key={index}>
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
