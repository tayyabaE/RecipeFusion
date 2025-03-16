import React, { useState } from "react";
import IngredientSearch from "./IngredSearch";
import SearchRecipe from "./SearchRecipe";
import "./UserDashboard.css"; 

const SearchPage = () => {
  const [searchType, setSearchType] = useState("name"); 

  return (
    <div className="search-page-container">
      <h2 className="search-title">Find Your Favorite Recipes Here</h2>

      <div className="search-toggle">
        <button
          className={`toggle-button ${searchType === "name" ? "active" : ""}`}
          onClick={() => setSearchType("name")}
        >
          Search by Name
        </button>
        <button
          className={`toggle-button ${searchType === "ingredient" ? "active" : ""}`}
          onClick={() => setSearchType("ingredient")}
        >
          Search by Ingredients
        </button>
      </div>

      {searchType === "name" ? <SearchRecipe /> : <IngredientSearch />}
    </div>
  );
};

export default SearchPage;
