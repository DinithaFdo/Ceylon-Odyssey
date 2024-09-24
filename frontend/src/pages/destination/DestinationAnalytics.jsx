import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import * as XLSX from 'xlsx';

export default function DestinationAnalytics() {
    const [destinations, setDestinations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/destination/');
            setDestinations(response.data);
            setFilteredData(response.data); // Initialize filteredData with all destinations
        } catch (error) {
            console.error('Error fetching destination analytics:', error);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const generateReport = () => {
        // Create a workbook and a worksheet
        const wb = XLSX.utils.book_new();
        const wsData = destinations.map(destination => ({
            Title: destination.dTitle,
            Clicks: destination.clickCount,
        }));
        const ws = XLSX.utils.json_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Destinations');

        // Generate a file download
        XLSX.writeFile(wb, 'destinations_report.xlsx');
    };

    // Function to filter destinations by date
    const filterByDate = () => {
        const filtered = destinations.filter(destination => {
            const creationDate = new Date(destination.creationDate);
            return (!startDate || creationDate >= new Date(startDate)) && (!endDate || creationDate <= new Date(endDate));
        });
        setFilteredData(filtered);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Navbar fixed at the top */}

            <br /><br />

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16"> {/* Add padding-top to avoid overlap with Navbar */}
                <center><h1 className="text-2xl font-bold mb-4">Destination Analytics</h1></center>

                <br />

                <div className="flex justify-center space-x-4 mb-4">
                    
                <button 
                            onClick={generateReport}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
                        >
                            Generate Report
                </button>
                </div>

                {/* Line Chart for clicks */}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={filteredData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dTitle" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="clickCount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>

            </main>

            <br /><br />

            <Footer /> {/* Footer fixed at the bottom */}
        </div>
    );
}
