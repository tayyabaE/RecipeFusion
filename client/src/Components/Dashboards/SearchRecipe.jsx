import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchRecipe.css";

const SearchRecipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("No Filter");
  const [cuisine, setCuisine] = useState("No Cuisine");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a recipe name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let API_URL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${import.meta.env.VITE_FOOD_API}&number=40`;

      if (filter !== "No Filter") {
        API_URL += `&diet=${filter.toLowerCase().replace(/\s+/g, "-")}`;
      }
      if (cuisine !== "No Cuisine") {
        API_URL += `&cuisine=${cuisine.toLowerCase().replace(/\s+/g, "-")}`;
      }

      console.log("Fetching from API:", API_URL); 
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data); 

      if (response.data.results && response.data.results.length > 0) {
        setRecipes(response.data.results);
      } else {
        setRecipes([]);
        setError("No recipes found. Try a different search.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error.response?.data || error.message);
      setError("Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="search-container">
      <h2 className="title">Search Any Recipe</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter recipe name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
          <option value="No Filter">No Filter</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Whole Plant-Based">Whole Plant-Based</option>
          <option value="Gluten Free">Gluten-Free</option>
          <option value="Ketogenic">Ketogenic</option>
          <option value="Diabetic-Friendly">Diabetic-Friendly</option>
          <option value="Heart-Healthy">Heart-Healthy</option>
        </select>

        <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="filter-dropdown">
          <option value="No Cuisine">No Cuisine</option>
          <option value="American">American</option>
          <option value="Chinese">Chinese</option>
          <option value="European">European</option>
          <option value="Italian">Italian</option>
          <option value="Korean">Korean</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
        </select>

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {loading && <p className="loading-text">Loading...</p>}

      <div className="recipe-results">
        {recipes.length > 0 ? (
          <ul className="recipe-list">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="recipe-item" onClick={() => handleRecipeClick(recipe.id)}>
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <p className="recipe-title">{recipe.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p className="no-results-text"></p>
        )}
      </div>
    </div>
  );
};

export default SearchRecipe;
