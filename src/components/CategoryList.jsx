import Category from "./Category";

const CategoryList = () => {
  return (
    <ul className="card">
      <li className="m-2">
        <Category />
      </li>
      <li className="m-2">
        <Category />
      </li>
    </ul>
  );
};

export default CategoryList;
