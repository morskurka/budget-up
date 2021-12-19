import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import CashExpensesPage from "./pages/CashExpensesPage";
import CashIncomesPage from "./pages/CashIncomesPage";
import { GlobalProvider } from "./contexts/GlobalState";

function App() {
  return (
    <>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/CategoryPage"
              element={<CategoryPage icon="cart" category="Supermarket" />}
            />
            <Route path="/CashExpensesPage" element={<CashExpensesPage />} />
            <Route path="/CashIncomesPage" element={<CashIncomesPage />} />
            <Route
              path="/ProfileSettingsPage"
              element={<ProfileSettingsPage name="Mor Skurka" />}
            />
          </Routes>
          <Footer />
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
