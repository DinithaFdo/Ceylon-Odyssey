import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

const MainComponent = () => {
  const [packages, setPackages] = useState([]);
  const [showBanner, setShowBanner] = useState(false); // Start with false to prevent automatic display
  const [showToggle, setShowToggle] = useState(false);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/tour-packages', {
          withCredentials: true,
        });

        if (response.data && response.data.length > 0) {
          setPackages(response.data);
          setShowToggle(true); // Show the toggle button if packages are available
        } else {
          console.log('No tour packages found.');
        }
      } catch (error) {
        console.error('Error fetching tour packages:', error);
      }
    };

    fetchPackageData();
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  const toggleBanner = () => {
    setShowBanner((prev) => !prev);
  };

  return (
    <div className="relative">
      {showBanner && packages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-300 text-black shadow-lg rounded-t-lg transition-transform duration-300">
          <div className="flex flex-col">
            <div className="flex overflow-x-auto whitespace-nowrap py-2 p-2">
              {packages.map((packageData) => (
                <Link key={packageData._id} to={`/tour-packages/${packageData._id}`}>
                  <div className="inline-block w-60 mx-2 bg-white text-black rounded-lg p-4 shadow-lg">
                    <img 
                      src={`http://localhost:5000/TourPackageImages/${packageData.pImage}`}
                      alt={packageData.package_Title} 
                      className="w-full h-24 object-cover rounded-md mb-2" 
                    />
                    <h2 className="text-sm font-bold whitespace-normal">{packageData.package_Title}</h2>
                    <p className="text-xs">{packageData.packageDes.slice(0, 30)}...</p>
                    <p className="mt-1">Price: LKR {packageData.packagePrice}</p>
                    <p className="mt-1">Days: {packageData.pDays}</p>
                    <p className="mt-1">Category: {packageData.pCategory}</p>
                    <p className="mt-1">Destination: {packageData.pDestination}</p>
                  </div>
                </Link>
              ))}
            </div>
            <button 
              onClick={handleCloseBanner} 
              className="absolute top-2 right-2 text-xl font-semibold text-black"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showToggle && !showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 flex justify-center items-center shadow-lg rounded-t-lg cursor-pointer" onClick={toggleBanner}>
          <span className="text-sm">Recommended Tour Packages</span>
          <span className="ml-2">&#8593;</span>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
