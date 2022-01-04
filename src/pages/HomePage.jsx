import CategoryCard from "../components/CategoryCard";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import { useNavigate } from "react-router-dom";
import UploadTransactions from "../components/UploadTransactions";

const HomePage = ({ setCurrCategory }) => {
  const { categoriesInfo, categoriesIcons, user, addUser } =
    useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user") && !user.email) {
      addUser(JSON.parse(sessionStorage.getItem("user")));
    } else if (!user.email) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    categoriesInfo.sort((a, b) =>
      a.category > b.category ? 1 : a.category < b.category ? -1 : 0
    );
    let filteredCategories = categoriesInfo.filter((cat) => {
      return (
        cat.category
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1
      );
    });
    setCategories(filteredCategories);
  }, [searchInput, categoriesInfo]);

  if (categoriesInfo.length === 0) {
    return <UploadTransactions />;
  }

  return (
    <>
      <BalanceInfoBar />
      {/* <Prediction /> */}
      <section className="categories">
        <div className="container" style={{ padding: "0 30px" }}>
          <div className=" d-flex justify-content-center">
            <div className="mb-3 form-group has-feedback">
              <input
                placeholder="Search Category..."
                type="text"
                className="form-control form-control-lg mt-4"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                id="searchInput"
              ></input>
            </div>
          </div>

          <div className={"row"} id="categoriesCards">
            {categories.map((cat, index) => {
              return (
                <div className="col-lg-4 col-md-6 wow fadeInUp" key={index}>
                  <CategoryCard
                    title={cat.category}
                    currBalance={
                      cat.monthlySums.currYear[new Date().getMonth()]
                    }
                    totalExpected={parseInt(cat.expected)}
                    icon={categoriesIcons[cat.category]}
                    setCurrCategory={setCurrCategory}
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
