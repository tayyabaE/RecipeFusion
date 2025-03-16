import React from "react";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import * as Icons from "react-icons/fa6";
import img1 from "../../assets/Images/pizza.jpg";

const recipes = [
  { 
    id: 1, 
    name: "Pizza", 
    category: "Fast Food", 
    description: "Delicious cheesy pizza with a crispy crust.",
    image: img1 
  },
  { 
    id: 2, 
    name: "Biryani", 
    category: "Pakistani", 
    description: "Spicy and flavorful Pakistani rice dish.",
    image: img1 
  },
  { 
    id: 3, 
    name: "Pasta", 
    category: "Italian", 
    description: "Creamy Italian-style pasta with rich sauce.",
    image: img1 
  },
];

const recipeColumns = [
  { label: "Recipe Name", key: "name" },
  { label: "Image", key: "image" },
  { label: "Category", key: "category" },
  { label: "Description", key: "description" },
];

const handleDelete = (recipe) => {
  Swal.fire({
    title: `Are you sure you want to delete ${recipe.name}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", `${recipe.name} has been deleted.`, "success");
      }
  });
};

const recipeActions = [
  { label: "View", icon: <Icons.FaEye />, onClick: (recipe) => alert(`Viewing ${recipe.name}`) },
  { label: "Delete", icon: <Icons.FaTrash />, onClick: handleDelete },
];

function RecipesPage() {
  return <DataTable title="Recipes" data={recipes} columns={recipeColumns} actions={recipeActions} />;
}

export default RecipesPage;
