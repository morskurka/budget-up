import CategoryCard from "../components/CategoryCard";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import { useNavigate } from "react-router-dom";
import UploadTransactions from "../components/UploadTransactions";
import Header from "../components/Header";

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
        <div className="container">
          <div className="pt-5 pb-3">
            <Header
              title="Follow Your Expenses"
              body="Click on a particular category to see monthly breakdown and more information"
            />
          </div>
          <div className="row justify-content-center mb-5">
            <div className="col-xxl-5 col-xl-6 col-lg-7">
              <div className="mb-3 form-group has-feedback">
                <section className="search-section">
                  <input
                    placeholder="Search Category..."
                    type="text"
                    className="form-control form-control-lg"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    id="searchInput"
                  ></input>
                  <div className="icon d-flex justify-content-center align-items-center">
                    <i className="bi bi-search"></i>
                  </div>
                </section>
              </div>
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
