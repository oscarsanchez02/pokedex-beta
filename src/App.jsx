import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePoke from "./pages/SinglePoke";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:pokemonID" element={<SinglePoke />} />
      </Routes>
    </ Router>
  );
}

export default App;
