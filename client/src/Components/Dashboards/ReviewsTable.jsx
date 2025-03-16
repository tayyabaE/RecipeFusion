import React from "react";
import Swal from "sweetalert2";
import DataTable from "./DataTable";
import * as Icons from "react-icons/fa6";

const reviews = [
  {
    id: 1,
    username: "Ali",
    email: "ali@example.com",
    review: "Amazing recipe! I loved the flavors.",
  },
  {
    id: 2,
    username: "Ahmed",
    email: "ahmed@example.com",
    review: "Great dish, but I think it needed more spices.",
  },
  {
    id: 3,
    username: "Hamza",
    email: "hamza@example.com",
    review: "Easy to follow and delicious. Highly recommended!",
  },
];

const reviewColumns = [
  { label: "Review", key: "review" },
  { label: "Username", key: "username" },
  { label: "Email", key: "email" },
];

const handleDelete = (review) => {
  Swal.fire({
    title: `Are you sure you want to delete this review by ${review.username}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", `The review by ${review.username} has been deleted.`, "success");
      }
  });
};

const reviewActions = [
  { label: "Delete", icon: <Icons.FaTrash />, onClick: handleDelete },
];

function ReviewsPage() {
  return <DataTable title="Reviews" data={reviews} columns={reviewColumns} actions={reviewActions} />;
}

export default ReviewsPage;
