import React, { useContext, useState } from "react";
import "./LogIn.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios"

const LogIn = ({ setShowLonIn }) => {

  const {url,setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign up");
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
  })

  const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
       
      setData(data=>({...data,[name]:value}))
  }

  const onLogin= async (event)=>{
        event.preventDefault();
        let newUrl=url
        if(currentState==="Login"){
          newUrl += "/api/user/login"
        }else{
          newUrl += "/api/user/register"
        }

        const response=await axios.post(newUrl,data)

        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          setShowLonIn(false)
        }else{
          alert(response.data.message)
        }
  }

  return (
    <div className="login">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="loin-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLonIn(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? null : (
            <input type="text" name="name" placeholder="Your name" onChange={onChangeHandler} value={data.name} required />
          )}
          <input
          value={data.email}
            type="email"
            name="email"
            onChange={onChangeHandler}
            placeholder="Your email"
            required
          />
          <input
            value={data.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
            required
          />
        </div>
        <button
          type="submit"
        >
          {currentState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have a account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
