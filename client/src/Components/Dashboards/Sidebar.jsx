import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Icons from "react-icons/fa6";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="admin-sidebar large-screen">
        <div className="logo">
          <h3 className="nav-heading">Recipe <span>Fusion</span></h3>
        </div>
        <ul className="menu">
          <li 
            className={location.pathname === "/admin" ? "active" : ""}
            onClick={() => navigate("/admin")}
          >
            <Icons.FaHouse className="icons-colored" /> Home
          </li>
          <li 
            className={location.pathname === "/users" ? "active" : ""}
            onClick={() => navigate("/users")}
          >
            <Icons.FaUser className="icons-colored" /> Users
          </li>
          <li 
            className={location.pathname === "/recipes" ? "active" : ""}
            onClick={() => navigate("/recipes")}
          >
            <Icons.FaUtensils className="icons-colored" /> Recipes
          </li>
          <li 
            className={location.pathname === "/reviews" ? "active" : ""}
            onClick={() => navigate("/reviews")}
          >
            <Icons.FaComment className="icons-colored" /> Reviews
          </li>
          <li 
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            <Icons.FaArrowRightFromBracket className="icons-colored" /> Logout
          </li>
        </ul>
      </div>

      <div className="admin-sidebar small-screen">
      <div className="logo">
          <h3 className="nav-heading" style={{fontSize:'16px', color:'#fff', letterSpacing:0, marginBottom:'10px'}}>Recipe Fusion</h3>
        </div>
        <ul className="menu">
          <li 
            className={location.pathname === "/admin" ? "active" : ""}
            onClick={() => navigate("/admin")}
          >
            <Icons.FaHouse className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/users" ? "active" : ""}
            onClick={() => navigate("/users")}
          >
            <Icons.FaUser className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/recipes" ? "active" : ""}
            onClick={() => navigate("/recipes")}
          >
            <Icons.FaUtensils className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/reviews" ? "active" : ""}
            onClick={() => navigate("/reviews")}
          >
            <Icons.FaComment className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            <Icons.FaArrowRightFromBracket className="icons-colored" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
