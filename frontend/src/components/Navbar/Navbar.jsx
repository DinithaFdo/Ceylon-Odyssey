import { Link } from "react-router-dom";
import logo from "../../assets/image.png";

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-10 right-10 bg-white shadow-lg rounded-full z-50" >
      <div className="container mx-auto flex items-center justify-between p-4">
       
        <div className="flex items-center"><Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Ceylon Odyssey" className="w-12 h-12" />
          <span className="text-2xl font-bold text-gray-900">Ceylon Odyssey</span>
          </Link>
        </div>

       
        <div className="flex-1 flex justify-center space-x-8">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition duration-300">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition duration-300">Contact</Link>
        </div>


        <div className="flex items-center">
          <Link to="/login" 
            className="text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 trasition duration-300"
          >
            Sign In
          </Link>

        </div>
        <div className="flex items-center pl-4">
          <Link to="/signup"  
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
