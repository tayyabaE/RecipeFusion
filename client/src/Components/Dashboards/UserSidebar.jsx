import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Icons from "react-icons/fa6";
import "./Sidebar.css";

function UserSidebar() {
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
            className={location.pathname === "/userhome" ? "active" : ""}
            onClick={() => navigate("/userhome")}
          >
            <Icons.FaHouse className="icons-colored" /> Home
          </li>
          <li 
            className={location.pathname === "/searchpage" ? "active" : ""}
            onClick={() => navigate("/searchpage")}
          >
            <Icons.FaSearchengin className="icons-colored" /> Search any Recipe
          </li>
          <li 
            className={location.pathname === "/savedrecipes" ? "active" : ""}
            onClick={() => navigate("/savedrecipes")}
          >
            <Icons.FaBookmark className="icons-colored" /> Saved Recipes
          </li>
          <li 
            className={location.pathname === "/userprofile" ? "active" : ""}
            onClick={() => navigate("/userprofile")}
          >
            <Icons.FaUserLarge className="icons-colored" /> Profile
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
            className={location.pathname === "/userhome" ? "active" : ""}
            onClick={() => navigate("/userhome")}
          >
            <Icons.FaHouse className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/searchpage" ? "active" : ""}
            onClick={() => navigate("/searchpage")}
          >
            <Icons.FaSearchengin className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/savedrecipes" ? "active" : ""}
            onClick={() => navigate("/savedrecipes")}
          >
            <Icons.FaBookmark className="icons-colored" />
          </li>
          <li 
            className={location.pathname === "/userprofile" ? "active" : ""}
            onClick={() => navigate("/userprofile")}
          >
            <Icons.FaUserLarge className="icons-colored" />
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

export default UserSidebar;
