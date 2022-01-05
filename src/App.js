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
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ScrollUp from "./components/ScrollUp";

function App() {
  const [currCategory, setCurrCategory] = useState("");

  return (
    <>
      <GlobalProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route
              path="/"
              element={<HomePage setCurrCategory={setCurrCategory} />}
            />
            <Route
              path="/CategoryPage"
              element={<CategoryPage category={currCategory} />}
            />
            <Route path="/CashExpensesPage" element={<CashExpensesPage />} />
            <Route path="/CashIncomesPage" element={<CashIncomesPage />} />
            <Route
              path="/ProfileSettingsPage"
              element={<ProfileSettingsPage name="Mor Skurka" />}
            />
          </Routes>
          <Footer />
          <ScrollUp />
        </Router>
      </GlobalProvider>
    </>
  );
}

export default App;
