import React from "react";
import "./HomePage.css";
// import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">


      <div className="main-content">
        <div className="text-section">
          <h1 className="main-heading">
          <span className="line">Your Kitchen</span>
          <span className="line">Your Inventory</span>
          <span className="line dash">Under Control</span>
          </h1>
        </div>
        <div className="image-section">
          <img
            src="pantry_bg.png"
            alt="Pantry shelves"
            className="shelf-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;