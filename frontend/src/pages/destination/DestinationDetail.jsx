import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Map from './Map';  // Ensure this is correctly imported

const WEATHER_API_KEY = 'c4402a459f61c6974a9b5c47e334105a'; // Replace with your OpenWeather API key

export default function DestinationDetail() {
    const [destination, setDestination] = useState(null);
    const [weather, setWeather] = useState(null);
    const [mapCoords, setMapCoords] = useState([0, 0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch destination details
    const fetchDestination = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/destination/get/${id}`);
            const destinationData = response.data.destination;
            setDestination(destinationData);

            const lat = destinationData.latitude;
            const lon = destinationData.longitude;

            // Fetch weather data
            const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric',
                },
            });
            setWeather(weatherResponse.data);

            // Set map coordinates
            setMapCoords([lat, lon]);

            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching destination details');
            setLoading(false);
        }
    };

    // Get ID from URL
    const destinationID = window.location.pathname.split('/').pop();

    useEffect(() => {
        fetchDestination(destinationID);
    }, [destinationID]);

    if (loading) return <p>Loading destination details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />

            <br></br><br></br>

            <main className="flex-grow p-4 md:p-8 lg:p-16">
                {destination ? (
                    <div id="destination-detail" className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        {/* Destination Image */}
                        <img
                            src={"http://localhost:5001/DestinationImages/" + destination.dThumbnail}
                            alt="Destination Thumbnail"
                            className="w-full h-80 object-cover"
                        />
                        <div className="p-6">
                            {/* Destination Title */}
                            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                                {destination.dTitle}
                            </h1>

                            {/* Destination Description */}
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                {destination.dDescription}
                            </p>

                            {/* Things to Do Section */}
                            {destination.dExtImage && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Things to Do:</h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {destination.dExtImage}
                                    </p>
                                </div>
                            )}

                            {/* Destination Info */}
                            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Geographical Details</h2>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>District:</strong> {destination.dDistrict}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Province:</strong> {destination.dProvince}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Longitude:</strong> {destination.longitude}</p>
                                    <p className="text-gray-700 dark:text-gray-300"><strong>Latitude:</strong> {destination.latitude}</p>
                                </div>

                                {/* Weather Section */}
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Weather Forecast</h2>
                                    {weather ? (
                                        <div>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Temperature:</strong> {weather.main.temp} °C</p>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Condition:</strong> {weather.weather[0].description}</p>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Humidity:</strong> {weather.main.humidity} %</p>
                                            <p className="text-gray-700 dark:text-gray-300"><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300">Weather information not available.</p>
                                    )}
                                </div>
                            </div>

                            {/* Map Section */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Location Map</h2>
                                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                                    <Map latitude={mapCoords[0]} longitude={mapCoords[1]} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No details available.</p>
                )}
            </main>

            <Footer />
        </div>
    );
}
