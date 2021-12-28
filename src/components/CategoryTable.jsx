import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalState";

const CategoryTable = ({ data }) => {
  const { transactions } = useContext(GlobalContext);

  return (
    <div>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Business</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.tDate.split("T")[0]}</td>
                <td>{item.amount}</td>
                <td>{item.subCategory}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
