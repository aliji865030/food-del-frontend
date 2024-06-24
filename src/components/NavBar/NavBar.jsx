import React, { useContext, useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
const NavBar = ({ setShowLonIn }) => {

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmmount,token,setToken } = useContext(StoreContext);

  const navigate=useNavigate()

  const logout=()=>{
       localStorage.removeItem("token")
       setToken("")
       navigate("/")
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">TasteTrekker</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          MENU
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          APP
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          CONTACT
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src="./grocery.gif" alt="" />
          </Link>
          {/* <div className={getTotalCartAmmount() === 0 ? "" : "dot"}></div> */}
        </div>
        {!token?<button onClick={() => setShowLonIn(true)}>sign in</button>:
        <div className="navbar-profile">
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate("myorders")}>
              <img src={assets.bag_icon} alt="" />
            <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="" />
            <p>Logout</p>
            </li>
          </ul>
        </div>
        }
      </div>
    </div>
  );
};

export default NavBar;
