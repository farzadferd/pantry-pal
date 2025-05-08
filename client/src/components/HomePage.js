import React from "react";
import "./HomePage.css";
import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="logo">
          <span role="img" aria-label="frying pan">🍳</span>
          <span className="logo-text">PantryPal</span>
        </div>
        <div className="nav-links">
          <a href="#">My Pantry</a>
          <a href="#">Recipes</a>
          <a href="#">Shopping Lists</a>
          <a href="#"><FaUserCircle className="user-icon" /> Account</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="text-section">
          <h1 className="main-heading">
            Your Kitchen,<br />
            Your Inventory<br />
            <span className="dash">–</span> Under Control.
          </h1>
        </div>
        <div className="image-section">
          <img
            src="/path-to-your-image.jpg"
            alt="Pantry shelves"
            className="shelf-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;