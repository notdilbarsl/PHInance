import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import profilePic from '../images/user/user-06.png';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
}

interface Stock {
  id: number;
  ticker_id: string;
  avg_price: number;
  quantity: number;
}

interface Transaction {
  type: string;
  amount: number;
  ticker: string;
  quantity: number;
  date: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  React.useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      window.location.href = "/auth/signin";
    }
  }, []);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken") // Assuming token is stored here
        const response = await fetch('https://phinance-backend.onrender.com/user/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          balance: data.balance,
        });
        setStocks(data.stocks);
        setTransactions(data.transactions);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex">
          <aside className="w-1/4 bg-black text-white p-4">
            <div className="text-center">
              <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
              <h2 className="mt-4 text-lg font-semibold">{user.name}</h2>
            </div>
            <nav className="mt-6">
              <ul className="space-y-3">
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Basic Details</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Change User Details</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Change Password</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Logout</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Permanently Delete Account</Link></li>
              </ul>
            </nav>
          </aside>

          <div className="w-3/4 p-6">
            <h3 className="text-lg font-semibold border-b pb-2">Profile Details</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Unique Client Code:</strong> {user.id}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2">Balance</h3>
              <p className="text-xl font-bold text-green-600">₹{user.balance.toLocaleString()}</p>
            </div>




            <div className="mt-6">
              <div className="flex justify-between border-b pb-2">
                <h3 className="text-lg font-semibold">Your Stocks</h3>
                <Link to="/stocks" className="text-blue-500 text-sm">View All</Link>
              </div>
              <div className="mt-4 space-y-3">
                {stocks.map((stock) => (
                  <div key={stock.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="text-md font-medium">{stock.id}</h4>
                        <p className="text-sm text-gray-500">{stock.ticker_id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-medium">Average Price: ₹{stock.avg_price}</p>
                      <p className="text-md font-medium">Quantity: ₹{stock.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between border-b pb-2">
                <h3 className="text-lg font-semibold">Transaction History</h3>
                <Link to="/transactions" className="text-blue-500 text-sm">View All</Link>
              </div>
              <div className="mt-4 space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.ticker} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                    <p className="text-md font-medium"><strong>{tx.ticker}</strong></p>
                    <p
                      className={`text-md font-medium ${tx.type === "BUY" ? "text-green-500" : tx.type === "SELL" ? "text-red-500" : ""
                        }`}
                    >
                      {tx.type}
                    </p>
                    <p className="text-md font-medium">Quantity: {tx.quantity}</p>
                    <p className="text-md font-medium">Price: ₹{tx.amount}</p>
                    <p className="text-md font-medium">Date: {tx.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
