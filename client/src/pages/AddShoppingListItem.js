import React, { useState } from 'react';
import '../styles/ShoppingList.css';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
  
    const handleAddItem = () => {
      if (input.trim() === '') return;
      const newItem = {
        id: Date.now(),
        text: input.trim(),
        checked: false,
      };
      setItems([...items, newItem]);
      setInput('');
    };
  
    const handleCheckboxToggle = (id) => {
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(updatedItems);
    };
  
    const handleClearList = () => {
      setItems([]);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleAddItem();
    };
  
    return (
      <div className="shopping-list-container">
        <h2>🛒 My Shopping List</h2>
        <div className="input-area">
          <input
            type="text"
            value={input}
            placeholder="Add a new item..."
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAddItem}>Add</button>
        </div>
        <ul className="shopping-list">
          {items.map(item => (
            <li key={item.id} className={`list-item ${item.checked ? 'checked' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxToggle(item.id)}
                />
                <span>{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
        {items.length > 0 && (
          <button className="clear-button" onClick={handleClearList}>
            Clear List
          </button>
        )}
      </div>
    );
  };
  
  export default ShoppingList;