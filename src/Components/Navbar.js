import React from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "../CSS/Navbar.css";

export const Navbar = ({ itemno }) => {
  const uncheck = () => {
    let navL = document.getElementById("menu-toggle");
    navL.checked = false;
  };
  return (
    <nav className="navbar1">
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle">
        <MenuOutlinedIcon className="la" />
      </label>
      <div className="logo">
        <NavLink className="link" to="/" end>
          <span>LOGO.</span>
        </NavLink>
      </div>

      <div className="secondary-nav">
        <NavLink onClick={uncheck} className="link" to="/" end>
          Home
        </NavLink>
        <NavLink onClick={uncheck} className="link" to="/about">
          About
        </NavLink>
      </div>
      <div className="container-nav">
        <NavLink className="link" to="/cart">
          <ShoppingCartOutlinedIcon className="la" />
          <div id="itemno">{itemno}</div>
        </NavLink>
      </div>
    </nav>
  );
};
