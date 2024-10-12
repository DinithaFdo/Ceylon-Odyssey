/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Lottie from "lottie-react";
import Gift from "../../../assets/Dinitha/gift.json";
import Wallet from "../../../assets/Dinitha/wallet.json";
import axios from "axios";
import toast from "react-hot-toast";
import TripPlanner from "../../../components/TripPlanner";

const ProfileDetails = ({ userData }) => {
  const [referralCode, setReferralCode] = useState("");
  const [showGiftAnimation, setShowGiftAnimation] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleReferralSubmit = async (event) => {
    event.preventDefault();
    
    if (!referralCode.trim()) {
      setErrorMessage("Please enter a referral code."); // Set error message
      return; // Prevent further execution if the input is invalid
    }

    setErrorMessage(""); // Clear error message if input is valid

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/submit-referral-code",
        { referralCode },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setShowGiftAnimation(true);
      setReferralCode("");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleTopUp = () => {
    navigate('/payment');
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex justify-between items-center mt-6">
          <div className="bg-blue-100 text-blue-600 p-4 rounded-lg shadow-md flex flex-col items-center">
            <Lottie
              animationData={Wallet}
              loop={false}
              style={{ width: "100px", height: "100px" }}
            />
            <p className="text-lg font-semibold">Wallet Balance</p>
            <p className="text-2xl">LKR {userData.walletBalance}</p>
            <button
              onClick={handleTopUp}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
            >
              Top Up Wallet
            </button>
          </div>
          <div className="bg-green-100 text-green-600 p-4 rounded-lg shadow-md flex flex-col items-center">
            <Lottie
              animationData={Gift}
              loop={false}
              style={{ width: "100px", height: "100px" }}
            />
            <p className="text-lg font-semibold">Referred Users</p>
            <p className="text-2xl">{userData.referredUsers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Details</h3>
        <p className="mb-4">
          <strong>Full Name:</strong> {userData.firstName} {userData.lastName}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="mb-4">
          <strong>Referral Code:</strong>{" "}
          {userData.referralCode || "Not generated yet"}
        </p>
        <p className="mb-4">
          <strong>Invited By:</strong>{" "}
          {userData.referringUserName ? userData.referringUserName : "N/A"}
        </p>
        {userData.referringUserName === "N/A" && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">
              Did someone refer you?
            </h4>
            <form onSubmit={handleReferralSubmit}>
              <input
                type="text"
                placeholder="Enter referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="p-2 border border-gray-300 rounded-md mb-2 cursor-text"
              />

<button
                type="submit"
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Submit
              </button>
              {errorMessage && (
                <div className="text-red-500 mb-2">{errorMessage}</div>
              )}
              
            </form>
          </div>
        )}

        <TripPlanner />
      </div>

      {showGiftAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Lottie
              animationData={Gift}
              loop={true}
              style={{ width: "150px", height: "150px" }}
            />
            <p className="mt-4 text-green-600 text-xl font-semibold text-center">
              🎉 Congratulations! You have received your rewards! 🎉
            </p>
            <button
              onClick={() => {
                setShowGiftAnimation(false);
                window.location.reload();
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;

