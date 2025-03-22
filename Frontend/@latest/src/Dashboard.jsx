import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [fraudData, setFraudData] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setFraudData([
      { month: 'Monday', detected: 50, reported: 30 },
      { month: 'Tuesday', detected: 80, reported: 60 },
      { month: 'Wednesday', detected: 120, reported: 90 },
      { month: 'Thursday', detected: 150, reported: 110 },
      { month: 'Friday', detected: 200, reported: 170 },
      { month: 'Saturday', detected: 250, reported: 210 },
    ]);
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://surakshapay.onrender.com/api/auth/getTransactions/${user.id}`);
          setUserTransactions(response.data.transactions.map(txn => ({
            id: txn.transaction_id,
            date: new Date(txn.transaction_date).toLocaleDateString(),
            amount: txn.transaction_amount,
            status: txn.transaction_payment_mode_anonymous
          })));
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
    };

    getTransactions();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-semibold mb-4">Analytical Dashboard</h1>
      {user && <p className="text-gray-600 mb-6">Welcome, {user.name}</p>}

      <div className="bg-gray-200 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Fradulent Transactions Reported in SurakshaPay</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fraudData}>
            <CartesianGrid strokeDasharray="3 3" stroke="lightgray" />
            <XAxis dataKey="month" stroke="black" />
            <YAxis stroke="black" />
            <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '5px' }} />
            <Line type="monotone" dataKey="detected" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626' }} />
            <Line type="monotone" dataKey="reported" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-300">
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">₹{transaction.amount}</td>
                <td className={`p-2 ${transaction.status === 'Completed' ? 'text-green-600' : transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;