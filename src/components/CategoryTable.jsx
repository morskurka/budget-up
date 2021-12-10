const CategoryTable = () => {
  return (
    <div>
      <table class="table">
        <thead class="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Business</th>
          </tr>
        </thead>
        <tbody>
          {" "}
          <tr>
            <th scope="row">1</th>
            <td>13/1</td>
            <td>1200</td>
            <td>Shufersal</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>16/1</td>
            <td>100</td>
            <td>Shufersal</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>21/1</td>
            <td>200</td>
            <td>Shufersal</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
