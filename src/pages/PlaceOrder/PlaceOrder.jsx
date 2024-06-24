
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmmount, token, food_list, cartItems, url } = useContext(StoreContext);


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    const fetchTotalAmount = async () => {
      const amount = await getTotalCartAmmount();
      setTotalAmount(amount);
    };

    fetchTotalAmount();
  }, [cartItems, getTotalCartAmmount]);

  const placeOrder = async (event) => {
    event.preventDefault();
  
    try {
      const totalAmount = await getTotalCartAmmount(); 
  
      const orderItems = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));
  
      const orderData = {
        address: data,
        items: orderItems,
        amount: totalAmount + 2 
      };
  
      console.log("Order data being sent:", orderData);
  
      const response = await axios.post(url+"/api/order/place", orderData, {headers:{token}});
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("ERROR");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  const navigate=useNavigate()


  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmmount()==0){
      navigate("/cart")
    }
    console.log(getTotalCartAmmount());
  },[token])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fileds">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
          <input required name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" />
        </div>
        <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" />
        <input required name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" />
        <div className="multi-fileds">
          <input required name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" />
          <input required name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" />
        </div>
        <div className="multi-fileds">
          <input required name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" />
          <input required name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" />
        </div>
        <input required name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${totalAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalAmount === 0 ? 0 : totalAmount + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

