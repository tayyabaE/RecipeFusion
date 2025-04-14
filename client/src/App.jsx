import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminDashboard from "./Components/Dashboards/AdminDashboard";
import UserTable from "./Components/Dashboards/Users";
import ReviewsTable from "./Components/Dashboards/ReviewsTable";
import RecipeTable from "./Components/Dashboards/RecipeTable";
import LandingPage from "./Components/LandingPage/LandingPage";
import UserDashboard from "./Components/Dashboards/UserDashboard";
import SearchRecipe from "./Components/Dashboards/SearchRecipe";
import RecipeDetails from "./Components/Dashboards/RecipeDetailPage";
import IngredientSearch from "./Components/Dashboards/IngredSearch";
import SaveRecipes from "./Components/Dashboards/SavedRecipes";
import SearchPage from "./Components/Dashboards/SearchPage";
import UserProfile from "./Components/Dashboards/UserProfile";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";

function Layout() {
 
  return (
    <div>
        <Routes>
          <Route path="*" element={<LandingPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/recipes" element={<RecipeTable />} />
          <Route path="/reviews" element={<ReviewsTable />} />

          <Route path="/userhome" element={<UserDashboard />} />
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
