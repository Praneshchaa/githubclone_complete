import React from "react";
import "../App.scss";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "../assets/images/book-open-solid.svg";
import logo2 from "../assets/images/book-solid.svg";
import logo3 from "../assets/images/table-list-solid.svg";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <li>
          <img className="logo" src={logo} alt="logo"></img>
          <Link to="/overview" className="header-name">
            Overview
          </Link>
        </li>

        <li>
          <img className="logo" src={logo2} alt="logo"></img>
          <Link to="/repositories" className="header-name">
            Repositories
          </Link>
        </li>

        <li>
          <img className="logo" src={logo3} alt="logo"></img>
          <Link to="/projects" className="header-name">
            Projects
          </Link>
        </li>
      </div>
      <div class="horizontal-line"></div>
    </>
  );
};

export default Navbar;
