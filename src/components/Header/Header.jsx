import React from "react";
import "./Header.css";

const Header = () => {
  
  return (
    <div
      className="header"
      id="header"
      style={{ backgroundImage: "url('./header_img.png')" }}
    >
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Your Favorite Food delivery Partner | Directly to your doorstep | Good
          food within minutes | Straight out of the kitchen to your doorstep |
          Delivery that satisfies your hunger | Filling your tummy on time is
          what we care about.
        </p>

        <a href="#explore-menu">
          <button> View Menu </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
