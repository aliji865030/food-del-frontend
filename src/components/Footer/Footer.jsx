import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="footer-logo">TasteTrekker</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quasi
            qui maiores, neque officiis quo quaerat porro aliquam dolore
            explicabo voluptates minus omnis nesciunt inventore exercitationem
            sint enim atque laboriosam. Culpa officia tenetur aperiam.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=100007029992625">
              <img src={assets.facebook_icon} alt="" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100007029992625">
              <img src={assets.twitter_icon} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/abbas-ali-294821212">
              <img src={assets.linkedin_icon} alt="" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 8650309093</li>
            <li>abbasalichand786@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 TasteTrekker.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
