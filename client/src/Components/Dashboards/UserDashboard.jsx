import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import Sidebar from "./UserSidebar";
import axios from "axios";

const UserDashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [searches, setSearches] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username") || "User";

  const user = {
    name: username,
    savedRecipes: savedRecipes.length,
    searches: searches.length,
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/random?number=8&apiKey=${import.meta.env.VITE_FOOD_API}`
        );
        setRecommendations(response.data.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    const fetchSearches = async () => {
      if (!userId) {
        console.warn("No user ID found in localStorage.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/user-searches`, {
          params: { userId },
        });
        setSearches(res.data);
      } catch (error) {
        console.error("Failed to fetch search history:", error);
      }
    };

    const fetchSavedRecipes = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:5000/api/saved-recipes/${userId}`);
        setSavedRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch saved recipes:", error);
      }
    };

    fetchRecommendations();
    fetchSearches();
    fetchSavedRecipes();
  }, [userId]);

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "row"  }} className="dashboard-main">
      <Sidebar />
      <div className="dashboard-left">
        <div className="welcome-section">
          <h2>WELCOME BACK, {user.name}</h2>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{user.savedRecipes}</h3>
            <p>Saved Recipes</p>
          </div>
          <div className="stat-card">
            <h3>{user.searches}</h3>
            <p>Searches Made</p>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Searches</h3>
          <ul>
            {searches.map((search, idx) => (
              <li key={idx}>{search.query}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="dashboard-right">
        <ul className="recommended-list">
          {recommendations.length > 0 ? (
            recommendations.map((recipe) => (
              <li key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} />
                <p>{recipe.title}</p>
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
