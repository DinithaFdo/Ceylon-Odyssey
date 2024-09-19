// DestinationDetail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Map from './Map';  // Ensure the correct path

const WEATHER_API_KEY = 'c4402a459f61c6974a9b5c47e334105a'; 

export default function DestinationDetail() {
    const [destination, setDestination] = useState(null);
    const [weather, setWeather] = useState(null);
    const [mapCoords, setMapCoords] = useState([0, 0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hardcoded example latitude and longitude for testing
    const exampleLat = 6.9271;  // Example latitude (Colombo, Sri Lanka)
    const exampleLon = 79.8612; // Example longitude (Colombo, Sri Lanka)

    const fetchDestinationData = async (id) => {
        try {
            const dest = {
                dTitle: 'Example Destination',
                dDescription: 'This is a test description for the example destination.',
                dDistrict: 'Colombo',
                dProvince: 'Western Province',
                dThumbnail: 'example-thumbnail.jpg',
                dExtImage: 'example-extra-images.jpg',
            };
            setDestination(dest);

            const lat = exampleLat;
            const lon = exampleLon;

            const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: WEATHER_API_KEY,
                    units: 'metric'
                }
            });
            setWeather(weatherResponse.data);

            setMapCoords([lat, lon]);

            setLoading(false);
        } catch (err) {
            console.error('Error fetching data:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Error fetching destination details');
            setLoading(false);
        }
    };

    const destinationID = window.location.pathname.split('/').pop();

    useEffect(() => {
        fetchDestinationData(destinationID);
    }, [destinationID]);

    if (loading) return <p>Loading destination details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <br /><br />

            <main className="flex-grow p-4 md:p-8 lg:p-16 flex flex-col items-center">
                {destination ? (
                    <div id="destination-detail" className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={"http://localhost:5001/DestinationImages/" + destination.dThumbnail}
                            alt="Destination Thumbnail"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">{destination.dTitle}</h1>
                            <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">{destination.dDescription}</p>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>District:</strong> {destination.dDistrict}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Province:</strong> {destination.dProvince}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Extra Images:</strong> {destination.dExtImage}</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
                            {weather ? (
                                <div className="mb-4">
                                    <p className="text-lg text-gray-700 dark:text-gray-400"><strong>Temperature:</strong> {weather.main.temp} °C</p>
                                    <p className="text-lg text-gray-700 dark:text-gray-400"><strong>Condition:</strong> {weather.weather[0].description}</p>
                                    <p className="text-lg text-gray-700 dark:text-gray-400"><strong>Humidity:</strong> {weather.main.humidity} %</p>
                                    <p className="text-lg text-gray-700 dark:text-gray-400"><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                                </div>
                            ) : (
                                <p>No weather information available.</p>
                            )}
                        </div>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Location Map</h2>
                            <Map latitude={mapCoords[0]} longitude={mapCoords[1]} />
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
