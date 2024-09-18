import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function DestinationDetail() {
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch destination details
    const fetchDestination = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5001/destination/get/${id}`);
            setDestination(response.data.destination);
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

    // Function to generate PDF
    const generatePDF = async () => {
        const content = document.getElementById('destination-detail');
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('destination-details.pdf');
    };

    if (loading) return <p>Loading destination details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <br></br><br></br>

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
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Destination ID:</strong> {destination.destinationID}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>District:</strong> {destination.dDistrict}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Province:</strong> {destination.dProvince}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Extra Images:</strong> {destination.dExtImage}</p>
                            </div>
                            <button
                                onClick={generatePDF}
                                className="mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Generate PDF
                            </button>
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
