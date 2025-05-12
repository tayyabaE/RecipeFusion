import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import * as Icons from "react-icons/fa6";
import axios from "axios";

const reviewColumns = [
  { label: "Review", key: "comment" },
  { label: "Username", key: "reviewer.username" },
  { label: "Email", key: "reviewer.email" },
  { label: "Rating", key: "rating" }, 
  { label: "Recipe Name", key: "recipe.name" },
];

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/all-reviews");
        
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else if (Array.isArray(res.data.reviews)) {
          setReviews(res.data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        Swal.fire("Error", "Failed to fetch reviews", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (review) => {
    Swal.fire({
      title: `Are you sure you want to delete this review by ${review.reviewer.username}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:5000/api/delete-reviews", {
            params: {
              reviewerId: review.reviewer._id,
              recipeId: review.recipe._id,
            },
          });

          setReviews((prev) =>
            prev.filter(
              (r) =>
                !(
                  r.reviewer._id === review.reviewer._id &&
                  r.recipe._id === review.recipe._id
                )
            )
          );

          Swal.fire("Deleted!", "The review has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting review:", error.message);
          Swal.fire("Error", "Failed to delete review", "error");
        }
      }
    });
  };

  const reviewActions = [
    { label: "Delete", icon: <Icons.FaTrash />, onClick: handleDelete },
  ];


  return (
    <DataTable
      title="Reviews"
      data={Array.isArray(reviews) ? reviews : []}
      columns={reviewColumns}
      actions={reviewActions}
    />
  );
}

export default ReviewsPage;
