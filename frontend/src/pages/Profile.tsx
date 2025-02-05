import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import profilePic from '../images/user/user-06.png';
import stockIcon from '../images/user/user-06.png';
import aaplIcon from '../images/icon/apple.png';
import tslaIcon from '../images/icon/tesla.png';

const Profile = () => {
  const [balance, setBalance] = useState(50000); // Fake balance money
  const [stocks, setStocks] = useState([
    { id: 1, name: 'AAPL', image: aaplIcon, boughtPrice: 150, currentPrice: 160, date: '2025-02-01' },
    { id: 2, name: 'TSLA', image: tslaIcon, boughtPrice: 600, currentPrice: 590, date: '2025-02-02' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, spent: 5000, earned: 0, date: '2025-02-01' },
    { id: 2, spent: 0, earned: 6000, date: '2025-02-02' },
  ]);

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex">
          <aside className="w-1/4 bg-black text-white p-4">
            <div className="text-center">
              <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
              <h2 className="mt-4 text-lg font-semibold">John Doe</h2>
            </div>
            <nav className="mt-6">
              <ul className="space-y-3">
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Basic Details</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Financial Reports</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Trading Preference</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Active Devices</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Report Suspicious Activity</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Change User Details</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Change Password</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Logout</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Temporarily Disable Account</Link></li>
                <li><Link to="#" className="block p-2 rounded hover:bg-gray-800">Permanently Delete Account</Link></li>
              </ul>
            </nav>
          </aside>

          <div className="w-3/4 p-6">
            <h3 className="text-lg font-semibold border-b pb-2">Profile Details</h3>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Unique Client Code:</strong> 1399842635</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2">Balance</h3>
              <p className="text-xl font-bold text-green-600">₹{balance.toLocaleString()}</p>
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
                      <img src={stock.image} alt={stock.name} className="w-12 h-12 rounded" />
                      <div>
                        <h4 className="text-md font-medium">{stock.name}</h4>
                        <p className="text-sm text-gray-500">{stock.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-medium">Bought: ₹{stock.boughtPrice}</p>
                      <p className="text-md font-medium">Current: ₹{stock.currentPrice}</p>
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
                  <div key={tx.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                    <p className="text-md font-medium">Spent: ₹{tx.spent}</p>
                    <p className="text-md font-medium">Earned: ₹{tx.earned}</p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
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