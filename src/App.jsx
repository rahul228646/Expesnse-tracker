import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import NavBar from "./navBar/NavBar";
import Add from "./updateExpense/Add";
import Analytics from "./analytics/Analytics";

function App() {
  return (
    <div className="app-root">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/add" element={<Add />} />
          <Route exact path="/analytics" element={<Analytics />} />
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
