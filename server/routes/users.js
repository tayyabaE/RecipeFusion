const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt'); 
const isLogin = require('../middleware/verifyuser')

// POST /api/users
router.post('/add-user', async (req, res) => {
  try {
    const { username, email, phone, gender, password, role } = req.body;

    if (!username || !email || !phone || !gender || !password) {
      return res.status(400).json({});
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      gender,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: error.message });
  }
});

//get all
//GET /api/users
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: error.message });
  }
});
//get specific user
//GET /api/users/username/:username 
router.get('/getuser/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }, '-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ message: error.message });
  }
});

//DELETE /api/users/username/:username 
router.delete('/delete-user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/users/username/:username
router.put('/update-user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { email, phone, gender, password } = req.body;

    const updateData = {};
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (gender) updateData.gender = gender;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
