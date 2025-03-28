import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

const API_KEY = 'ef89b943fcaf406699b9da851b0c2d0c';

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