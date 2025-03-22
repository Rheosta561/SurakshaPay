import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-500 text-white flex flex-col items-center p-8">
            <h1 className="text-5xl font-bold mt-8 drop-shadow-lg">Hi There, {user?.name || "User"} 👋</h1>
            <p className="text-lg text-gray-200 mt-3">Welcome to Suraksha Pay</p>

            {/* Payment Card */}
            <div className="mt-12 w-full max-w-5xl bg-white text-black rounded-3xl shadow-2xl p-10 flex flex-col items-center transition-transform transform hover:scale-105">
                <div className="h-64 w-64 rounded-full overflow-hidden shadow-lg border-4 border-indigo-400">
                    <img
                        src="https://img.freepik.com/free-vector/hand-drawn-installment-illustration_23-2149397096.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"
                        className="h-full w-full object-cover"
                        alt="Make a Payment"
                    />
                </div>
                <h2 className="text-3xl font-semibold mt-6 text-indigo-900">Make a Payment</h2>
                <p className="text-center text-gray-700 mt-4 text-lg">
                    Make secure payments seamlessly through the payment gateway provided by SurakshaPay.
                </p>
                <button
                    className="mt-6 bg-indigo-700 hover:bg-indigo-800 transition px-10 py-4 text-white text-xl rounded-lg shadow-lg transform hover:scale-110"
                    onClick={() => navigate('/payment')}
                >
                    Get Started
                </button>
            </div>

            {/* Track Payments Card */}
            <div className="mt-12 w-full max-w-5xl bg-white text-black rounded-3xl shadow-2xl p-10 flex flex-col items-center transition-transform transform hover:scale-105">
                <div className="h-64 w-64 rounded-full overflow-hidden shadow-lg border-4 border-purple-400">
                    <img
                        src="https://img.freepik.com/free-photo/pay-goods-by-credit-card-through-smartphone-coffee-shop_1150-18770.jpg?uid=R156956613&ga=GA1.1.1904776371.1723148990&semt=ais_hybrid"
                        className="h-full w-full object-cover"
                        alt="Track Payments"
                    />
                </div>
                <h2 className="text-3xl font-semibold mt-6 text-purple-900">Manage and Track Your Payments</h2>
                <p className="text-center text-gray-700 mt-4 text-lg">
                    Our trusted payment gateway ensures fast, encrypted transactions with real-time tracking and multiple payment options, keeping your financial data safe at every step.
                </p>
                <button
                    className="mt-6 bg-purple-700 hover:bg-purple-800 transition px-10 py-4 text-white text-xl rounded-lg shadow-lg transform hover:scale-110"
                    onClick={() => navigate('/track')}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Home;
