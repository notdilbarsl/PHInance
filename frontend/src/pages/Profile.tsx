import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import profilePic from '../images/user/user-06.png';
import { API_BASE_URL } from '../config';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
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
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Logout</Link></li>
                <li>
                  <button
                    className="block w-full text-left p-2 rounded hover:bg-gray-800"
                    onClick={() => setShowDeleteModal(true)}
                    type="button"
                  >
                    Permanently Delete Account
                  </button>
                </li>

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

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">Delete Account</h2>
            <p className="mb-4">
              This action is <span className="font-bold text-red-600">permanent</span> and cannot be undone.<br />
              To confirm, type <span className="font-mono bg-gray-200 px-2 py-1 rounded">DELETE</span> below:
            </p>
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              value={deleteInput}
              onChange={e => {
                setDeleteInput(e.target.value);
                setDeleteError('');
              }}
              placeholder="Type DELETE to confirm"
              disabled={isDeleting}
            />
            {deleteError && <p className="text-red-500 mb-2">{deleteError}</p>}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteInput('');
                  setDeleteError('');
                }}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 ${isDeleting ? "opacity-50" : ""}`}
                onClick={async () => {
                  if (deleteInput !== 'DELETE') {
                    setDeleteError('You must type DELETE to confirm.');
                    return;
                  }
                  setIsDeleting(true);
                  try {
                    const authToken = localStorage.getItem("authToken");
                    const response = await fetch(`${API_BASE_URL}/user/delete`, {
                      method: 'DELETE',
                      headers: {
                        Authorization: `Bearer ${authToken}`,
                      },
                    });
                    if (!response.ok) {
                      throw new Error('Failed to delete account');
                    }
                    // Optionally clear localStorage and redirect
                    localStorage.clear();
                    window.location.href = "/auth/signup"; // or your home/signin page
                  } catch (err) {
                    setDeleteError('Failed to delete account. Please try again.');
                    setIsDeleting(false);
                  }
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Profile;
