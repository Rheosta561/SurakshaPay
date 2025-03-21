import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [upiId, setUpiId] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch user info from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  const navigate = useNavigate();
    const handlePaymentClick = ()=>{
        navigate('/transaction');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      setMessage('User not found. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://surakshapay.onrender.com/api/auth/saveMethod', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, upi: upiId, card_number: '' }), // No card number for now
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('UPI ID saved successfully!');
        setUpiId('');
        handlePaymentClick();
        
      } else {
        setMessage(data.message || 'Failed to save UPI ID.');
      }
    } catch (error) {
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Save Your UPI ID</h2>
        {user && (
          <p className="text-center text-gray-600 mt-2">
            Welcome, <span className="font-medium text-gray-900">{user.name || user.id}</span>
          </p>
        )}
        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
              Enter UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="yourupi@bank"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save UPI ID
          </button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
