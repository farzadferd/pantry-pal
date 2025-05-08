import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import AddPantryItem from './components/AddPantryItem';
import ShoppingList from './components/AddShoppingListItem';
import RecipesPage from './components/RecipesPage';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>🔍 PantryPal</h1>
        <nav>
            <Link to="/pantry">My Pantry</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/shopping">Shopping Lists</Link>
            <Link to="/account">Account</Link>
        </nav>
      </header>
      <main>
          <Routes>
            <Route path="/" element={<AddPantryItem />} /> 
            <Route path="/pantry" element={<AddPantryItem />} />
            <Route path="/shopping" element={<ShoppingList />} />
            <Route path="/recipes" element={<RecipesPage />} />
          </Routes>
      </main>
    </div>
    </Router>
  );
}
  
export default App;
