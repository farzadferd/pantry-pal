import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PantryItem from './models/PantryItem.js';

dotenv.config();
const API_KEY = process.env.API_KEY
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/pantry', async (req, res) => {
  const { item, quantity, type, expiration } = req.body;
  const pantryItem = new PantryItem({ item, quantity, type, expiration });
  try {
    await pantryItem.save();
    res.status(201).json(pantryItem);
  } catch (error) {
    console.error('Error saving pantry item:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}); 

app.get('/recipes', async (req, res) => {
    const ingredients = ['chicken', 'rice', 'onion']; // hardcoded for now
    let ingredientStr = ingredients.join(','); //format to put in the URL
    // const ingredientStr = req.query.ingredients; // get ingredients from query params (`http://localhost:3000/recipes?ingredients=${ingredients}`)
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientStr}&number=2`, 
        {
          headers: {
            'x-api-key': API_KEY
          }
        }
      );
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
}); 