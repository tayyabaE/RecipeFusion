const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// Add a review
router.post("/add-review", async (req, res) => {
  try {
    const { userId, recipeId, title, review, sentiment } = req.body;

    if (!userId || !recipeId || !title || !review || !sentiment) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newReview = new Review({
      userId,
      recipeId,
      title,
      review,
      sentiment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all reviews for a recipe
router.get("/reviews/:recipeId", async (req, res) => {
  try {
    const reviews = await Review.find({ recipeId: req.params.recipeId }).populate("userId", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err });
  }
});

// Delete a review by user for a recipe
router.delete("/reviews/:userId/:recipeId", async (req, res) => {
  try {
    await Review.findOneAndDelete({
      userId: req.params.userId,
      recipeId: req.params.recipeId,
    });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err });
  }
});

// Delete a review using reviewerId and recipeId
router.delete("/delete-reviews", async (req, res) => {
  const { reviewerId, recipeId } = req.query;
  try {
    const result = await Review.findOneAndDelete({ userId: reviewerId, recipeId });
    if (!result) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review", error: err });
  }
});

// Get all reviews with populated user and recipe info
router.get("/all-reviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "username email")
      .populate("recipeId", "name");
    
    const formattedReviews = reviews.map(r => ({
      comment: r.review,
      rating: r.sentiment, 
      reviewer: {
        _id: r.userId._id,
        username: r.userId.username,
        email: r.userId.email,
      },
      recipe: {
        _id: r.recipeId._id,
        name: r.recipeId.name || r.title, 
      },
    }));

    res.json(formattedReviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all reviews", error: err });
  }
});


// Get sentiment stats (optional)
router.get("/reviews-stats", async (req, res) => {
  try {
    const stats = await Review.aggregate([
      { $group: { _id: "$sentiment", count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Error fetching sentiment stats", error: err });
  }
});

module.exports = router;
