import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [fraudData, setFraudData] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUserId(parsedUser.id);
    }

    setFraudData([
      { day: 'Monday', detected: 50, reported: 30 },
      { day: 'Tuesday', detected: 80, reported: 60 },
      { day: 'Wednesday', detected: 120, reported: 90 },
      { day: 'Thursday', detected: 150, reported: 110 },
      { day: 'Friday', detected: 200, reported: 170 },
      { day: 'Saturday', detected: 250, reported: 210 },
    ]);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://surakshapay.onrender.com/api/auth/getTransactions/${userId}`);
        const transactions = response.data.transactions.map(txn => ({
          id: txn.transaction_id,
          date: new Date(txn.transaction_date).toLocaleDateString(),
          amount: txn.transaction_amount,
          status: txn.transaction_payment_mode,
          bank: txn.payment_gateway_bank,
          channel: txn.transaction_channel,
          reported: false,
          isFraudulent: txn.isFraudulent || false,
        }));
        setUserTransactions(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [userId]);

  const reportTransaction = (id) => {
    setUserTransactions((prevTransactions) =>
      prevTransactions.map((txn) =>
        txn.id === id ? { ...txn, reported: true } : txn
      )
    );

    setFraudData((prevData) => {
      const today = new Date().toLocaleString('en-us', { weekday: 'long' });
      return prevData.map((data) =>
        data.day === today ? { ...data, reported: data.reported + 1 } : data
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Analytical Dashboard</h1>
      {user && <p className="text-gray-600 mb-4 sm:mb-6">Welcome, {user.name}</p>}

      <div className="bg-gray-200 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Fraudulent Transactions Reported in SurakshaPay</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={fraudData}>
            <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
            <XAxis dataKey="day" stroke="black" />
            <YAxis stroke="black" />
            <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '5px' }} />
            <Line type="monotone" dataKey="detected" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626' }} />
            <Line type="monotone" dataKey="reported" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-red-100 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-red-700 mb-4">Detected Fraudulent Transactions</h2>
        {userTransactions.filter(txn => txn.isFraudulent).length > 0 ? (
          <ul className="list-disc pl-5">
            {userTransactions.filter(txn => txn.isFraudulent).map(txn => (
              <li key={txn.id} className="mb-2">
                {txn.date} - ₹{txn.amount} ({txn.status})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No fraudulent transactions detected.</p>
        )}
      </div>

      <div className="bg-gray-200 p-4 sm:p-6 rounded-xl shadow-lg mb-6 overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Transactions</h2>
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Bank</th>
              <th className="p-2">Channel</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-300">
                <td className="p-2 truncate max-w-[100px]">{transaction.id}</td>
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">₹{transaction.amount}</td>
                <td className="p-2">{transaction.status}</td>
                <td className="p-2">{transaction.bank}</td>
                <td className="p-2">{transaction.channel}</td>
                <td className="p-2">
                  {transaction.reported ? (
                    <span className="text-blue-600">Reported</span>
                  ) : (
                    <button onClick={() => reportTransaction(transaction.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
                      Report
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;