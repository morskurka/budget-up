import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CategoryPage" element={<CategoryPage />} />
        </Routes>
      </Router>

      <Footer />
    </>
  );
}

export default App;
