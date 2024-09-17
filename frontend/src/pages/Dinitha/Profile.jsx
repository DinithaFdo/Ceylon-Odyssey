import { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    referralCode: '',
    walletBalance: 0,
    referredUsers: 0,
  });
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [referralLogs, setReferralLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', { withCredentials: true });
        setUserData(prevState => ({
          ...prevState,
          name: response.data.name,
          email: response.data.email,
          referralCode: response.data.referralCode,
        }));
      } catch (error) {
        setError('Failed to fetch user data');
      }
    };

    const fetchWalletTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/wallet', { withCredentials: true });
        setWalletTransactions(response.data.transactionHistory || []);
        setUserData(prevState => ({
          ...prevState,
          walletBalance: response.data.walletBalance || 0,
        }));
      } catch (error) {
        setError('Failed to fetch wallet transactions');
      }
    };

    const fetchReferralLogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/referrals', { withCredentials: true });
        setReferralLogs(response.data || []);

        
        const userId = response.data.userId;
        const referredUsersCount = response.data.filter(referral => referral.referringUserId.toString() === userId.toString()).length;

        setUserData(prevState => ({
          ...prevState,
          referredUsers: referredUsersCount || 0,
        }));
      } catch (error) {
        setError('Failed to fetch referral logs');
        setUserData(prevState => ({
          ...prevState,
          referredUsers: 0,
        }));
      }
    };

    fetchUserData();
    fetchWalletTransactions();
    fetchReferralLogs();
  }, []);

  const shareReferralCode = () => {
    const referralUrl = `http://localhost:5173/signup?refid=${userData.referralCode}`;
    navigator.clipboard.writeText(referralUrl);
    toast.success('Referral link copied to clipboard!');
  };

  const generatePDF = (data, filename) => {
    const doc = new jsPDF();
    doc.text('Report', 10, 10);
    let yPosition = 20;
    data.forEach((item, index) => {
      doc.text(`${index + 1}. ${JSON.stringify(item)}`, 10, yPosition);
      yPosition += 10;
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 10;
      }
    });
    doc.save(filename);
  };

  const handleDownloadWallet = () => {
    generatePDF(walletTransactions, 'wallet-transactions.pdf');
  };

  const handleDownloadReferral = () => {
    generatePDF(referralLogs, 'referral-logs.pdf');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Toaster />
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Profile</h2>
            <nav>
              <ul>
                {['account', 'wallet', 'referral', 'bookings'].map(tab => (
                  <li key={tab} className="mb-6">
                    <button
                      className={`text-lg w-full text-left ${activeTab === tab ? 'text-blue-600 font-semibold' : 'text-gray-800'}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex justify-between items-center mt-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">Wallet Balance</p>
                <p className="text-2xl">LKR {userData.walletBalance}</p>
              </div>
              <div className="bg-green-100 text-green-600 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold">Referred Users</p>
                <p className="text-2xl">{userData.referredUsers}</p>
              </div>
            </div>
          </div>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          {activeTab === 'account' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4"><strong>Name:</strong> {userData.name}</p>
                <p className="mb-4"><strong>Email:</strong> {userData.email}</p>
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Wallet Transactions</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {walletTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {walletTransactions.map((transaction, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">LKR {transaction.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{transaction.status || 'Success'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No transactions found.</p>
                )}
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleDownloadWallet}
                >
                  Download Wallet Transactions as PDF
                </button>
              </div>
            </div>
          )}

          {activeTab === 'referral' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Referral Details</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4 text-lg font-semibold">Invite Your Friends and Earn Incentives</p>
                <p className="mb-4 text-xl font-bold">Your Referral Code: <span className="text-blue-600">{userData.referralCode || 'Not generated yet'}</span></p>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={shareReferralCode}
                >
                  Copy Referral Link
                </button>
                <h4 className="text-lg font-semibold mt-6 mb-4">Referral Logs</h4>
                {referralLogs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referred User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {referralLogs.map((log, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(log.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{log.referredUserName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{log.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No referral logs found.</p>
                )}
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleDownloadReferral}
                >
                  Download Referral Logs as PDF
                </button>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Bookings</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Booking details should be fetched and displayed here */}
                <p>No bookings information available.</p>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
