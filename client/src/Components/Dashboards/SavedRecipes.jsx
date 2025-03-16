import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserDashboard.css"

const SaveRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(recipes);
  }, []);

  const removeRecipe = (id) => {
    const updatedRecipes = savedRecipes.filter((recipe) => recipe.id !== id);
    setSavedRecipes(updatedRecipes);
    localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="saved-recipes-container">
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes.</p>
      ) : (
        <ul className="saved-recipe-list">
          {savedRecipes.map((recipe) => (
            <li key={recipe.id} className="saved-recipe-item">
              <img src={recipe.image} alt={recipe.title} className="saved-recipe-image" />
              <div className="saved-recipe-info">
                <h3>{recipe.title}</h3>
                <button onClick={() => removeRecipe(recipe.id)} className="remove-button">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SaveRecipes;