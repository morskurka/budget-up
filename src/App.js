import "./App.css";
import CategoryCard from "./components/CategoryCard";
import CategoryRow from "./components/CategoryRow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="App">Welcome to BudgetUP!</div>
        <CategoryRow />
      </div>

      <Footer />
    </>
  );
}

export default App;
