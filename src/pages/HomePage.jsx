import CategoryCard from "../components/CategoryCard";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/GlobalState";
import BalanceInfoBar from "../components/BalanceInfoBar";
import { useNavigate } from "react-router-dom";

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
    let filteredCategories = categoriesInfo.filter((cat) => {
      return (
        cat.category
          .toLocaleLowerCase()
          .indexOf(searchInput.toLocaleLowerCase()) !== -1
      );
    });
    setCategories(filteredCategories);
  }, [searchInput, categoriesInfo]);

  return (
    <>
      <BalanceInfoBar backgroundColor="bg-light" barColor="bg-success" />
      {/* <Prediction /> */}
      <section className="bg-white">
        <div className="container" style={{ padding: "0 30px" }}>
          <div className=" d-flex justify-content-center">
            <div className="mb-3 form-group has-feedback">
              <input
                placeholder="Search Category..."
                type="text"
                className="form-control form-control-lg"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              ></input>
            </div>
          </div>

          <div className={"row"}>
            {categories.map((cat, index) => {
              if (index % 3 === 0)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
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
            {categories.map((cat, index) => {
              if (index % 3 === 1)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
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
            {categories.map((cat, index) => {
              if (index % 3 === 2)
                return (
                  <div className="col-lg-4 col-md-6" key={index}>
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
