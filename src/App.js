import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="App">Welcome to BudgetUP!</div>
        <HomePage />
      </div>

      <Footer />
    </>
  );
}

export default App;
