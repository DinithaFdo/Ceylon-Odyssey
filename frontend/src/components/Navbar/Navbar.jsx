import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  
  const handleLogout = () => {
    localStorage.removeItem('token');  
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';  
    setUser(null);  // 
    window.location.reload();  
    window.location.href = '/'; 
  };

  
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  return (
    <nav className="fixed top-5 left-10 right-10 bg-white shadow-lg rounded-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">Ceylon Odyssey</span>
        </div>

        <div className="flex-1 flex justify-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <>
              <span className="mr-4">Hello, {getFirstName(user.name)}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ml-4"
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
