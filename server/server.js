const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users'); 
const recipeRoutes = require('./routes/recipes');
const reviewRoutes = require('./routes/reviews'); 
const searchHistory = require('./routes/searchHistory'); 
const savedRecipe = require('./routes/savedRecipes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'auth-token', "Authorization"],
}));


app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello, API is working!');
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);
app.use('/api', reviewRoutes);
app.use('/api', searchHistory);
app.use('/api', savedRecipe);

app.listen(5000, ()=>{
  console.log("server is running on port 5000");
})
