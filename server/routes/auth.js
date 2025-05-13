const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const verifyuser = require("../middleware/verifyuser");

///api/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, gender, password, role } = req.body;

    if (!username || !email || !phone || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      if (existingUser)
        return res
          .status(400)
          .json({ message: "User with same username or email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      phone,
      gender,
      password: hashedPassword,
      role: role || 2,
    });

    const token = generateToken(newUser);
    res.cookie("token", token);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password invalid" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      path:'/'
    });

    res.json({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      username: user.username,
      message: user.role === 2 ? "User logged in" : "Admin logged in",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


// GET /api/auth/fetchuser
router.post("/fetchuser", verifyuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });

    res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
