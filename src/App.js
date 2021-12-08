import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <>
      <Navbar />
      <div>
        <div className="App"></div>
        <CategoryPage />
      </div>

      <Footer />
    </>
  );
}

export default App;
