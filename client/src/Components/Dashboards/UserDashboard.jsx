import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import Sidebar from "./UserSidebar";
import axios from "axios";
const baseURL = import.meta.env.VITE_NODE_URL

const UserDashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [searches, setSearches] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [user, setUser] = useState(null); // Store user data

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

    // Fetch recommendations only once
    fetchRecommendations();
  }, []); // Empty dependency array means it only runs once when the component mounts

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `${baseURL}/api/fetchuser`, 
          {},
          { withCredentials: true } // Ensure cookies are sent
        );

        if (response.data.success) {
          setUser(response.data.data); // Set user data
        } else {
          console.warn("User not found or unauthorized");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Redirect to login or show error
        window.location.href = "/login";
      }
    };

    // Fetch user data when the component mounts
    fetchUserData();
  }, []); // Empty dependency array means this runs only once on mount

  useEffect(() => {
    if (!user) return; // Don't fetch if user is not available yet

    const fetchSearches = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/user-searches`, {
          params: { userId: user._id }, // Use user._id for API
          withCredentials: true, // Send cookie with request
        });
        setSearches(res.data);
      } catch (error) {
        console.error("Failed to fetch search history:", error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const res = await axios.get(
          `${baseURL}/api/saved-recipes/${user._id}`,
          { withCredentials: true } // Send cookie with request
        );
        setSavedRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch saved recipes:", error);
      }
    };

    fetchSearches();
    fetchSavedRecipes();
  }, [user]); 
  if (!user) {
    return <p>Loading user data...</p>; 
  }

  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "row" }} className="dashboard-main">
      <Sidebar />
      <div className="dashboard-left">
        <div className="welcome-section">
          <h2>WELCOME BACK, {user.username}</h2>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>{savedRecipes.length}</h3>
            <p>Saved Recipes</p>
          </div>
          <div className="stat-card">
            <h3>{searches.length}</h3>
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
