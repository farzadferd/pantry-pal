import React, { useState } from 'react';
import '../styles/RecipesPage.css'; 

const RecipesPage = () => {
    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    // Handle the input change
    const handleInputChange = (e) => {
      setIngredient(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && ingredient.trim() !== '') {
        setIngredientsList((prevList) => [...prevList, ingredient.trim()]);
        setIngredient('');
      }
    };
  
    const handleRemoveIngredient = (ingredientToRemove) => {
      setIngredientsList(ingredientsList.filter((ingredient) => ingredient !== ingredientToRemove));
    };
  
    //Using dummy data for now
    const handleSearchRecipes = async () => {
      if (ingredientsList.length === 0) return; 
  
      setLoading(true);
      setError('');
  
      try {
        const response = await fetch(
          `http://localhost:3001/recipes?ingredients=${ingredientsList.join(',')}`
        );
    
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
    
        const data = await response.json();
        setRecipes(data); // assuming data is an array of recipe objects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again.');
      }

      // setTimeout(() => {
      //   setRecipes([
      //     { id: 1, title: 'Recipe 1', description: `Delicious dish with ${ingredientsList.join(', ')}` },
      //     { id: 2, title: 'Recipe 2', description: `Yummy food made from ${ingredientsList.join(', ')}` },
      //     { id: 3, title: 'Recipe 3', description: `Tasty treat using ${ingredientsList.join(', ')}` },
      //   ]);
      //   setLoading(false);
      // }, 1000); 
    };
  
    return (
      <div className="recipes-page">
        <h2>🍳 Find Recipes</h2>
  
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter ingredient (press Enter)"
            value={ingredient}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
  
        {ingredientsList.length > 0 && (
          <div className="ingredient-bubbles">
            {ingredientsList.map((ingredient, index) => (
              <div className="ingredient-bubble" key={index}>
                <span>{ingredient}</span>
                <button
                  className="remove-bubble"
                  onClick={() => handleRemoveIngredient(ingredient)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
  
        <button onClick={handleSearchRecipes} disabled={loading}>
          {loading ? 'Loading...' : 'Search Recipes'}
        </button>
  
        {error && <p className="error-message">{error}</p>}
  
        {recipes.length > 0 && (
          <div className="recipes-list">
            <h3>Recipes found:</h3>
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id} className="recipe-item">
                  <p>{recipe.title}</p>
                  <p>{recipe.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default RecipesPage;
