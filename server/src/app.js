import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PantryItem from './models/PantryItem.js';
import authRoutes from './routes/auth.js';

dotenv.config();
const API_KEY = process.env.API_KEY
const MONGO_URI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = 3001;

const jwt = require('jsonwebtoken');

// use this middleware to verify JWT token
// this middleware will be used in the routes that require authentication
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Mount authentication routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Get All Pantry Items
app.get('/pantry', async (req, res) => {
  try {
    const pantryItems = await PantryItem.find();
    res.json(pantryItems);
  } catch (error) {
    console.error('Error fetching pantry items:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Add New Pantry Item
app.post('/pantry', async (req, res) => {
  const { item, quantity, category, expiration } = req.body;
  const pantryItem = new PantryItem({ item, quantity, category, expiration });
  try {
    await pantryItem.save();
    res.status(201).json(pantryItem);
  } catch (error) {
    console.error('Error saving pantry item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}); 

// Update Pantry Item by ID
app.put('/pantry/:id', async (req, res) => {
  const { id } = req.params;
  const { item, quantity, Category, expiration } = req.body;
  try {
    const pantryItem = await PantryItem.findByIdAndUpdate(id, { item, quantity, Category, expiration }, { new: true });
    if (!pantryItem) {
      return res.status(404).json({ error: 'Pantry item not found' });
    }
    res.json(pantryItem);
  } catch (error) {
    console.error('Error updating pantry item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Delete Pantry Item by ID
app.delete('/pantry/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pantryItem = await PantryItem.findByIdAndDelete(id);
    if (!pantryItem) {
      return res.status(404).json({ error: 'Pantry item not found' });
    }
    res.json({ message: 'Pantry item deleted' });
  } catch (error) {
    console.error('Error deleting pantry item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get Recipes from Spoonacular API
app.get('/recipes', async (req, res) => {
    const ingredientStr = req.query.ingredients; // get ingredients from query params (`http://localhost:3000/recipes?ingredients=${ingredients}`)
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientStr}&number=10&ignorePantry=true`, 
        {
          headers: {
            'x-api-key': API_KEY
          }
        }
      );
      const data = await response.json();
      let recipes = [];
      data.forEach((recipe) => {
        recipes.push({
          id: recipe.id,
          title: recipe.title,
          usedRatio: recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount),
          usedIngredientCount: recipe.usedIngredientCount
        });
      });

      recipes.sort((a, b) => b.usedRatio - a.usedRatio); // sort descending
      recipes = recipes.slice(0, 5); // keep top 5

      res.json(recipes);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
// Start the Express Server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
}); 