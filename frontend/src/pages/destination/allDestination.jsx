import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function AllDestinations() {
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/destination/');
            setDestinations(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const deleteDestination = async (destinationID) => {
        if (window.confirm('Are you sure you want to delete this destination?')) {
            try {
                await axios.delete(`http://localhost:5001/destination/delete/${destinationID}`);
                setDestinations(destinations.filter(destination => destination._id !== destinationID));
            } catch (error) {
                console.error('Error deleting destination:', error);
            }
        }
    };

    const editDestination = (destinationID) => {
        navigate(`/edit-destination/${destinationID}`);
    };

    const generateEditablePDF = async () => {
        const doc = await PDFDocument.create();
        const page = doc.addPage([600, 400]);
        const { width, height } = page.getSize();

        // Title
        page.drawText('Destinations Report', { x: 50, y: height - 50, size: 24, color: rgb(0, 0, 0) });

        // Table Header
        page.drawText('Thumbnail', { x: 50, y: height - 100, size: 14, color: rgb(0, 0, 0) });
        page.drawText('Title', { x: 150, y: height - 100, size: 14, color: rgb(0, 0, 0) });
        page.drawText('Description', { x: 250, y: height - 100, size: 14, color: rgb(0, 0, 0) });

        let yPosition = height - 130;

        destinations.forEach((destination) => {
            // Thumbnail
            page.drawText(destination.dThumbnail, { x: 50, y: yPosition, size: 12, color: rgb(0, 0, 0) });
            // Title
            page.drawText(destination.dTitle, { x: 150, y: yPosition, size: 12, color: rgb(0, 0, 0) });
            // Description
            page.drawText(destination.dDescription, { x: 250, y: yPosition, size: 12, color: rgb(0, 0, 0) });

            yPosition -= 20;
        });

        const pdfBytes = await doc.save();
        saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), 'Destinations_Report.pdf');
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
            <Navbar /> {/* Navbar fixed at the top */}

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16"> {/* Add padding-top to avoid overlap with Navbar */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">All Listed Destinations</h1>

                    <button 
                        onClick={generateEditablePDF}
                        className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 mb-4"
                    >
                        Generate Report
                    </button>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Thumbnail</th>
                                <th scope="col" className="px-6 py-3">Title</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.map((destination) => (
                                <tr key={destination._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={`http://localhost:5001/DestinationImages/${destination.dThumbnail}`} alt="Destination Thumbnail" className="w-16 md:w-32 max-w-full max-h-full" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {destination.dTitle}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {destination.dDescription}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                                        <button 
                                            onClick={() => editDestination(destination._id)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => deleteDestination(destination._id)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <Footer /> {/* Footer fixed at the bottom */}
        </div>
    );
}
