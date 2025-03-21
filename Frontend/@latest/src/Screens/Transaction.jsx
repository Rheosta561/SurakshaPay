import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

function Transaction() {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user details from localStorage
  const userId = JSON.parse(localStorage.getItem("user")).id;
   // User is both payer & payee
   console.log(userId);

  // Generate QR Code when UPI ID or amount changes
  useEffect(() => {
    if (upiId && amount) {
      const upiURL = `upi://pay?pa=${upiId}&pn=User&am=${amount}&cu=INR`;
      QRCode.toDataURL(upiURL, { width: 200, margin: 2 }, (err, url) => {
        if (!err) setQrCode(url);
      });
    }
  }, [upiId, amount]);

  // Function to handle transaction submission
  const handlePayment = async () => {
    if (!userId) {
      setMessage("User not logged in.");
      return;
    }
    if (!upiId || !amount) {
      setMessage("Please enter UPI ID and amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    // Get device and browser details dynamically
    const deviceInfo = navigator.userAgent;
    const browser = navigator.vendor || "Unknown";

    const transactionData = {
      userId,
      payeeId: userId, // Same as userId
      amount,
      channel: "mobile",
      paymentMode: "UPI",
      bank: "UPI",
      email: `${userId}@example.com`, // Dummy dynamic email
      mobile: "9876543210", // Dummy dynamic mobile (Can be fetched from backend)
      cardBrand: "UPI",
      device: deviceInfo,
      browser: browser,
    };

    try {
      const response = await fetch("https://surakshapay.onrender.com/api/auth/saveTransaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Transaction successful!");
      } else {
        setMessage("Transaction failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">UPI Payment Interface</h2>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Enter UPI ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="yourname@upi"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Enter Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>

        {qrCode && (
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-800">Scan to Pay:</p>
            <img src={qrCode} alt="QR Code" className="mt-2 mx-auto" />
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}

export default Transaction;
