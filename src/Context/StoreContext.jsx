import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify'



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="https://food-del-backend-9cl2.onrender.com";
  // const url="https://localhost:4000";
  const [token,setToken]=useState("")
  const [food_list,setFood_list]=useState([])

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((pre) => ({ ...pre, [itemId]: 1 }));
    } else {
      setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] + 1 }));
    }
    if(token){
       await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
       toast.success("Item Added to Cart")
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((pre) => ({ ...pre, [itemId]: pre[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      toast.error("Item Removed from Cart")
    }
  };

  const getTotalCartAmmount = async () => {
    let totalAmount = 0;
    for (let items in cartItems) {
      if (cartItems[items] > 0) {
        let itemInfo = food_list.find((product) => product._id === items);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[items];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList=async ()=>{
    const response= await axios.get(url+"/api/food/list")
    setFood_list(response.data.result)
  }

  const loadCartData = async (token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData)
  }

  useEffect(()=>{
   
    async function loadData(){

      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }

      await fetchFoodList()
    }

    loadData()
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
