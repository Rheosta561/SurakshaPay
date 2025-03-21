import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [user,setUser]   = useState({});
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    },[]);

    console.log(user);
    const navigate = useNavigate();
    const handlePaymentClick = ()=>{
        navigate('/payment');

    }
    const handleTrackPayment = ()=>{
        navigate('/track');
    }



  
  return (
    <div className='p-2 w-screen'>
        <h1 className=' mt-4 text-center'>Hi There</h1>
        <p className='text-center text-sm text-zinc-700'>Welcome to Suraksha Pay</p>
        <br />
        <br />
        <div className=' h-44 w-44 mx-auto rounded-full'>
            <img src="https://img.freepik.com/free-vector/hand-drawn-installment-illustration_23-2149397096.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid" className='h-full w-full rounded-full ' alt="" />

        </div>
        <h1 className='text-center text-3xl font-semibold mt-4'>Make a Payment</h1>
        <div className='text-center text-zinc-800 text-sm mx-10'>Make Secure Payment seamlessly through the payment gateway provided by SurakshaPay</div>
        <div className='w-screen flex '>
            <button className='mx-auto mt-2 p-3 w-fit bg-emerald-900 text-sm rounded-lg text-white' onClick={handlePaymentClick}>Get Started</button></div>
        

        <br />

        <div className=' h-44 w-44 mx-auto rounded-full'>
            <img src="https://img.freepik.com/free-photo/pay-goods-by-credit-card-through-smartphone-coffee-shop_1150-18770.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid" className='h-full w-full rounded-full' alt="" />

        </div>
        <h1 className='text-center text-3xl font-semibold mt-4'>
  Manage and Track Your Payments
</h1>

<div className='text-center text-zinc-800 text-sm mx-10'> 
  Our trusted payment gateway ensures fast, encrypted transactions with real-time tracking and multiple payment options, keeping your  
  financial data safe at every step.
</div>
<div className='w-screen flex '>
            <button className='mx-auto mt-2 p-3 w-fit bg-emerald-900 text-sm rounded-lg text-white'>Get Started</button></div>
        


    </div>
  )
}

export default Home