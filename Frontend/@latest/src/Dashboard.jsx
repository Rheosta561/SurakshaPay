import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [fraudData, setFraudData] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);
  const [fraudulentTransactions, setFraudulentTransactions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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
    const getTransactions = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://surakshapay.onrender.com/api/auth/getTransactions/${user.id}`);
          const transactions = response.data.transactions.map(txn => ({
            id: txn.transaction_id,
            date: new Date(txn.transaction_date).toLocaleDateString(),
            amount: txn.transaction_amount,
            status: txn.transaction_payment_mode_anonymous,
            reported: false,
          }));


          const fraudResponse = await axios.post('https://surakshapay-detector.onrender.com/predict', {
            transactions: response.data.transactions.map(txn => ({
              transaction_amount: txn.transaction_amount,
              transaction_date: txn.transaction_date,
              transaction_channel: txn.transaction_channel,
              transaction_payment_mode_anonymous: txn.transaction_payment_mode_anonymous,
              payment_gateway_bank_anonymous: txn.payment_gateway_bank_anonymous,
              payer_browser_anonymous: txn.payer_browser_anonymous,
              payer_email_anonymous: txn.payer_email_anonymous,
              payee_ip_anonymous: txn.payee_ip_anonymous,
              transaction_id_anonymous: txn.transaction_id_anonymous,
              payee_id_anonymous: txn.payee_id_anonymous,
            }))
          });

          // Update transactions with fraud detection results
          const updatedTransactions = transactions.map((txn, index) => ({
            ...txn,
            isFraudulent: fraudResponse.data[index].fraud === 1,
          }));

          setUserTransactions(updatedTransactions);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
    };

    const getFraudulentTransactions = async () => {
      try {
        const response = await axios.get(`https://surakshapay.onrender.com/api/auth/getFraudulentTransactions`);
        setFraudulentTransactions(response.data.fraudulentTransactions);
      } catch (error) {
        console.error('Error fetching fraudulent transactions:', error);
      }
    };

    getTransactions();
    getFraudulentTransactions();
  }, [user]);

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
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <h1 className="text-3xl font-semibold mb-4">Analytical Dashboard</h1>
      {user && <p className="text-gray-600 mb-6">Welcome, {user.name}</p>}

      {/* Fraudulent Transactions Chart */}
      <div className="bg-gray-200 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Fraudulent Transactions Reported in SurakshaPay</h2>
        <ResponsiveContainer width="100%" height={300}>
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

      {/* User Transactions */}
      <div className="bg-gray-200 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Transactions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2">ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Fraudulent</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-300">
                <td className="p-2">{transaction.id}</td>
                <td className="p-2">{transaction.date}</td>
                <td className="p-2">₹{transaction.amount}</td>
                <td className={`p-2 ${transaction.status === 'Completed' ? 'text-green-600' : transaction.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {transaction.status}
                </td>
                <td className="p-2">
                  {transaction.isFraudulent ? (
                    <span className="text-red-600">Yes</span>
                  ) : (
                    <span className="text-green-600">No</span>
                  )}
                </td>
                <td className="p-2">
                  {transaction.reported ? (
                    <span className="text-blue-600">Reported</span>
                  ) : (
                    <button
                      onClick={() => reportTransaction(transaction.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Report
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="bg-red-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-700">Fraudulent Transactions</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="p-2">Transaction ID</th>
              <th className="p-2">User ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {fraudulentTransactions.length > 0 ? (
              fraudulentTransactions.map((transaction) => (
                <tr key={transaction.transaction_id} className="border-b border-gray-300">
                  <td className="p-2">{transaction.transaction_id}</td>
                  <td className="p-2">{transaction.user_id}</td>
                  <td className="p-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td className="p-2">₹{transaction.transaction_amount}</td>
                  <td className="p-2 text-red-600 font-bold">{transaction.transaction_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-600">
                  No fraudulent transactions detected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;