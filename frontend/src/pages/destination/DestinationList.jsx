import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function AllDestinations() { 
    const [destinations, setDestinations] = useState([]);

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

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Navbar is fixed at the top */}

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16"> {/* Add padding-top to avoid overlap */}
                <h1 className="text-2xl font-bold mb-4">Destinations List</h1>

                <div className="space-y-4">
                    {destinations.length > 0 ? (
                        destinations.map(destination => (
                            <div key={destination._id} className="border rounded-lg p-4 bg-white shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div className="flex items-center mb-4">
                                    <img 
                                        src={"http://localhost:5001/DestinationImages/" + destination.dThumbnail} 
                                        alt="Destination Thumbnail" 
                                        className="w-16 h-16 object-cover rounded-md mr-4"
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

            <Footer /> {/* Footer is fixed at the bottom */}
        </div>
    );
}
