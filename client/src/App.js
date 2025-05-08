import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


import AddPantryItem from './components/AddPantryItem';
import Login from './pages/Login';
import Signup from './pages/Signup';
import List from './pages/List';
import Account from './pages/Account';
import HomePage from './pages/HomePage';
import ShoppingList from './pages/AddShoppingListItem';
import Recipes from './pages/RecipesPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Top Header and Navigation */}
        <header className="App-header">
          <h1><Link to="/">🔍 PantryPal</Link></h1>
          <nav>
            <Link to="/pantry">My Pantry</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/list">Shopping Lists</Link>
            <Link to="/account">Account</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pantry" element={<AddPantryItem />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/list" element={<ShoppingList />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<div>Welcome to PantryPal!</div>} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
  
export default App;
