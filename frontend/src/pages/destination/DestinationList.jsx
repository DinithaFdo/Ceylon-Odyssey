import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function DestinationList() {
    const [destinations, setDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("All");
    const [selectedProvince, setSelectedProvince] = useState("All");
    const navigate = useNavigate(); // Hook for navigation

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/destination/');
            setDestinations(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    useEffect(() => {
        fetchDestinations();

        const interval = setInterval(() => {
            fetchDestinations();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleThumbnailClick = async (destinationId) => {
        try {
            await axios.put(`http://localhost:5001/destination/${destinationId}/click`);
            navigate(`/destination/${destinationId}`); // Redirect to detail view
        } catch (error) {
            console.error('Error updating click count:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
    };

    // Filter destinations based on searchTerm, selectedDistrict, and selectedProvince
    const filteredDestinations = destinations.filter(destination =>
        (destination.dTitle.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") &&
        (selectedDistrict === "All" || destination.dDistrict === selectedDistrict) &&
        (selectedProvince === "All" || destination.dProvince === selectedProvince)
    );

    // Extract unique districts and provinces for filter options
    const districts = Array.from(new Set(destinations.map(d => d.dDistrict)));
    const provinces = Array.from(new Set(destinations.map(d => d.dProvince)));

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Navbar is fixed at the top */}

            <br></br><br></br>

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16"> {/* Add padding-top to avoid overlap */}
                <h1 className="text-2xl font-bold mb-4">Destinations List</h1>

                <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Search by title..." 
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="flex-1 flex gap-4">
                        <select 
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            className="p-2 border border-gray-300 rounded-lg flex-grow"
                        >
                            <option value="All">All Districts</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>

                        <select 
                            value={selectedProvince}
                            onChange={handleProvinceChange}
                            className="p-2 border border-gray-300 rounded-lg flex-grow"
                        >
                            <option value="All">All Provinces</option>
                            {provinces.map((province, index) => (
                                <option key={index} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <br></br>

                <div className="space-y-4">
                    {filteredDestinations.length > 0 ? (
                        filteredDestinations.map(destination => (
                            <div key={destination._id} className="border rounded-lg p-4 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={"http://localhost:5001/DestinationImages/" + destination.dThumbnail} 
                                        alt="Destination Thumbnail" 
                                        className="w-16 h-16 object-cover rounded-md mr-4 cursor-pointer"
                                        onClick={() => handleThumbnailClick(destination._id)} // Handle click
                                    />
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{destination.dTitle}</h2>
                                        <p className="text-gray-700 dark:text-gray-400">{destination.dDescription}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No destinations available.</p>
                    )}
                </div>
            </main>

            <br></br><br></br>

            <Footer /> {/* Footer is fixed at the bottom */}
        </div>
    );
}
