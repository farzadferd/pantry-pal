import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import AddPantryItem from './components/AddPantryItem';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Recipes from './pages/Recipes';
import List from './pages/List';
import Landing from './pages/Landing';
import Account from './pages/Account';
import ShoppingList from './components/AddShoppingListItem';
import RecipesPage from './components/RecipesPage';

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
            <Link to="/shopping">Shopping Lists</Link>
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
            <Route path="/list" element={<List />} />
            <Route path="/account" element={<Account />} />
            {/* <Route path="/" element={<Landing />} /> */}
            <Route path="/" element={<div>Welcome to PantryPal!</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
  
export default App;
