import "./App.css";
// import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pokecard from "./components/pokecard";
import SinglePoke from "./pages/SinglePoke";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokecard />} />
        <Route path="/pokemon/:pokemonID" element={<SinglePoke />} />
      </Routes>
    </ Router>
  );
}

export default App;
