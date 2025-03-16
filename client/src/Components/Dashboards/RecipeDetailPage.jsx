import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./RecipeDetails.css";
import Swal from "sweetalert2";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipeCard, setRecipeCard] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  
  const API_KEY = "aa71d33666424690b40a6457992f6657";

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setError("Failed to load recipe details.");
      }
      setLoading(false);
    };
    fetchRecipeDetails();
  }, [id]);



  const getShoppingList = () => {
    if (recipe) {
      const ingredients = recipe.extendedIngredients.map((ingredient) => ingredient.original);
      setShoppingList(ingredients);
    }
  };

  const saveRecipe = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
  const newRecipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
  };

  if (!savedRecipes.some((r) => r.id === recipe.id)) {
    savedRecipes.push(newRecipe);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

    Swal.fire({
      title: "Recipe Saved!",
      text: "This recipe has been added to your saved recipes.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "View Saved Recipes",
      cancelButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/saved-recipes");
      }
    });
  } else {
    Swal.fire({
      title: "Already Saved",
      text: "This recipe is already in your saved recipes.",
      icon: "info",
      confirmButtonText: "OK",
    });
  }
};

  if (loading) return <p className="loading-text">Loading recipe details...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!recipe) return null;

  return (
    <div className="recipe-details-container">
      <h2>{recipe.title}</h2>

      <h3>Ingredients</h3>
      <ul className="ingredient-list">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <ol className="instructions-list">
        {recipe.analyzedInstructions.length > 0
          ? recipe.analyzedInstructions[0].steps.map((step) => (
              <li key={step.number}>{step.step}</li>
            ))
          : "No instructions available."}
      </ol>

      
      <button className="back-button" onClick={getShoppingList}>Get Shopping List</button>
      <button className="back-button" onClick={saveRecipe}>Save Recipe</button>

      

      {shoppingList.length > 0 && (
        <div className="shopping-list-container">
          <h3>Shopping List</h3>
          <ul>
            {shoppingList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/userhome" className="back-button">Back to Recipes</Link>
    </div>
  );
};

export default RecipeDetails;