import "./App.css";
import CategoryCard from "./components/CategoryCard";
import CategoryRow from "./components/CategoryRow";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CashExpensesPage from "./pages/CashExpensesPage";
import CashIncomesPage from "./pages/CashIncomesPage";
import { GlobalProvider } from "./contexts/GlobalState";

function App() {
  return (
    <>
      <GlobalProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/CategoryRow" element={<CategoryRow />} />
            <Route path="/CategoryPage" element={<CategoryPage />} />
            <Route path="/CashExpensesPage" element={<CashExpensesPage />} />
            <Route path="/CashIncomesPage" element={<CashIncomesPage />} />
          </Routes>
        </Router>
        <Footer />
      </GlobalProvider>
    </>
  );
}

export default App;
