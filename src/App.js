import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Navbar from "./components/NavBar.jsx";
import Home from "./screens/home/Home.jsx";
import CrearWiki from "./screens/wiki/CrearWiki.jsx";
import VistaWiki from "./screens/wiki/VistaWiki.jsx";
import CrearEntrada from "./screens/entrada/CrearEntrada.jsx";
import ActualizarEntrada from "./screens/entrada/ActualizarEntrada.jsx";

function App() {

  const [usuario, setUsuario] = useState('673da89ffe8c58a67622d620');

  return (
    <div className="App">
      <Router>
        <Navbar usuario={usuario} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wiki/:id" element={<VistaWiki />} />
          <Route path="/createWiki" element={<CrearWiki />} />
          <Route path="/createEntrada/:idWiki" element={<CrearEntrada />}></Route>
          <Route path="/updateEntrada/:idEntrada" element={<ActualizarEntrada />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
