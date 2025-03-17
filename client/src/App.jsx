// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Components/Dashboards/Sidebar";
import AdminDashboard from "./Components/Dashboards/AdminDashboard";
import UserTable from "./Components/Dashboards/Users";
import ReviewsTable from "./Components/Dashboards/ReviewsTable";
import RecipeTable from "./Components/Dashboards/RecipeTable";
import LandingPage from "./Components/LandingPage/LandingPage";
import UserDashboard from "./Components/Dashboards/UserDashboard";
import UserSidebar from "./Components/Dashboards/UserSidebar";
import SearchRecipe from "./Components/Dashboards/SearchRecipe";
import RecipeDetails from "./Components/Dashboards/RecipeDetailPage";
import IngredientSearch from "./Components/Dashboards/IngredSearch";
import SaveRecipes from "./Components/Dashboards/SavedRecipes";
import SearchPage from "./Components/Dashboards/SearchPage";
import UserProfile from "./Components/Dashboards/UserProfile";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";

function Layout() {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showSidebar =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/users" ||
    location.pathname === "/recipes" ||
    location.pathname === "/reviews";

  const showUserSidebar =
    location.pathname.startsWith("/dashboard/user") ||
    location.pathname === "/userhome" ||
    location.pathname === "/searchrecipe" ||
    location.pathname === "/savedrecipes" ||
    location.pathname === "/searchpage" ||
    location.pathname === "/userprofile";

  const sidebarWidth =
    showSidebar || showUserSidebar ? (isSmallScreen ? "60px" : "230px") : "0";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {showSidebar && <Sidebar />}
      {showUserSidebar && <UserSidebar />}
      <div
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth})`,
          transition: "margin-left 0.3s ease-in-out",
          boxSizing: "border-box",
          overflowX: "hidden",
          maxWidth: "100vw",
        }}
      >
        <Routes>
          <Route
            path="/"
            style={{ marginRight: "0px" }}
            element={<LandingPage />}
          />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/recipes" element={<RecipeTable />} />
          <Route path="/reviews" element={<ReviewsTable />} />

          <Route path="/userhome" element={<UserDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/searchrecipe" element={<SearchRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/search-by-ingredients" element={<IngredientSearch />} />
          <Route path="/savedrecipes" element={<SaveRecipes />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/userprofile" element={<UserProfile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
