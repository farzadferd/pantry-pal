import React from 'react';
import './App.css';
import AddPantryItem from './components/AddPantryItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🔍 PantryPal</h1>
        <nav>
          <a href="#pantry">My Pantry</a>
          <a href="#recipes">Recipes</a>
          <a href="#shopping">Shopping Lists</a>
          <a href="#account">Account</a>
        </nav>
      </header>
      <main>
        <AddPantryItem />
      </main>
    </div>
  );
}
  
export default App;
