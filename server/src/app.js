import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.API_KEY
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/recipes', async (req, res) => {
    const ingredients = ['chicken', 'rice', 'onion']; // harddoded for now
    let ingredientStr = ingredients.join(','); //format to put in the URL
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