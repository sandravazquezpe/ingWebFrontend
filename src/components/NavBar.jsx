import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import logo from "../images/logo.png";

import CuadroNotificaciones from "./notificaciones/CuadroNotificaciones";

function NavBar({ usuario }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand ms-2" to="/">
            <img src={logo} alt="logo" width="90" height="70" />
          </Link>
          <div className="elementos-navbar-derecha">
            <div className="nueva-wiki-navbar">
              <Link className="btn btn-outline-light" to="/createWiki">
                Nueva Wiki
              </Link>
            </div>

            <div className="cuadro-notificaciones-navbar">
              <CuadroNotificaciones usuario={usuario}/>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
