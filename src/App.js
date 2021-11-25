import "./App.css";
import Category from "./components/Category";
import CategoryList from "./components/CategoryList";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="App">Welcome to BudgetUP!</div>
        <CategoryList />
      </div>

      <Footer />
    </>
  );
}

export default App;
