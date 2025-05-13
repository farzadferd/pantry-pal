import React from "react";
import "./HomePage.css";
// import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  return (
    <div className="homepage-container">


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
            src="food.jpeg"
            alt="Pantry shelves"
            className="shelf-image"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;