import React, { useContext, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LogIn from "./components/Login/LogIn";
import Verification from "./pages/Verification/Verification";
import MyOrders from "./pages/MyOrders/MyOrders";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const [showLogIn, setShowLonIn] = useState(false);
  
  return (
    <>
      <ToastContainer/>
      {showLogIn ? <LogIn setShowLonIn={setShowLonIn} /> : ""}
      <div className="app">
        <NavBar setShowLonIn={setShowLonIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verification/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
