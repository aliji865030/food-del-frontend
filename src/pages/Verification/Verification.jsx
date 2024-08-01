// import React, { useContext, useEffect } from 'react'
// import "./Verification.css"
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { StoreContext } from '../../Context/StoreContext';
// import axios from 'axios';

// const Verification = () => {

//     const [searchParams,setSearchParams]=useSearchParams();
//     const success=searchParams.get("success");
//     const orderId=searchParams.get("orderId");
//     const {url}=useContext(StoreContext)
//     const navigate=useNavigate()

//     const verifyPayment=async ()=>{
//         const response=await axios.post(url+"/api/order/verify",{success,orderId})
//         if(response.data.success){
//             navigate("/myorders")
//         }else{
//             navigate("/")
//         }
//     }

//     useEffect(()=>{
//         verifyPayment()
//     },[])
//   return (
//     <div className='verify'>
//         <div className="spinner"></div>
      
//     </div>
//   )
// }

// export default Verification


import React, { useContext, useEffect, useCallback } from 'react';
import "./Verification.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verification = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/order/verify`, {
                params: { success, orderId }
            });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification error:", error);
            navigate("/");
        }
    }, [url, success, orderId, navigate]);

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
}

export default Verification;
