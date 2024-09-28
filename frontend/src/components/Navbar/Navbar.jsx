import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import logo from '../../assets/clogo.png';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      await axios.post('http://localhost:5000/api/auth/signout', {}, { withCredentials: true });
      
      setUser(null);
      window.location.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const getFirstName = (firstName) => {
    return firstName || '';
  };

  return (
    <nav className="fixed top-5 left-10 right-10 bg-white shadow-lg rounded-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" style={{ filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3))' }}/>
          </Link>
        </div>

        <div className="flex-1 flex justify-center space-x-8">
          <Link to="/destinations" className="text-gray-700 hover:text-blue-600 transition duration-300 cursor-pointer">Destinations</Link>
          <Link to="/tour-packages" className="text-gray-700 hover:text-blue-600 transition duration-300 cursor-pointer">Tour Packages</Link>
          <Link to="/userequipment" className="text-gray-700 hover:text-blue-600 transition duration-300 cursor-pointer">Equipments</Link>
          <Link to="/user-blog" className="text-gray-700 hover:text-blue-600 transition duration-300 cursor-pointer">Blogs</Link>
          <Link to="/ticket" className="text-gray-700 hover:text-blue-600 transition duration-300 cursor-pointer">Support</Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <button
                onClick={() => window.location.replace('/profile')}
                className="text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer"
              >
                Hi, {getFirstName(user.firstName)}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ml-4 cursor-pointer"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;