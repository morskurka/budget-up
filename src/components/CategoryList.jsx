import Category from "./Category";

const CategoryList = () => {
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
    <div className="list-group">
      {categories.map((category, index) => {
        return (
          <Category
            key={index}
            name={category.name}
            icon={category.icon}
            currBalance={category.currBalance}
            totalExpected={category.totalExpected}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
