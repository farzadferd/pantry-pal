import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


import AddPantryItem from './components/AddPantryItem';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import HomePage from './pages/HomePage';
import ShoppingList from './pages/AddShoppingListItem';
import Recipes from './pages/RecipesPage';
import Logout from './components/Logout';

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
            {/* <Link to="/account">Account</Link> */}
            <Link to="/login">Login</Link>
            <Logout />
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
            {/* <Route path="/account" element={<Account />} /> */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
  
export default App;
