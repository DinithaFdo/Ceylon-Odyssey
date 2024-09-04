import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllDestinations() { 
    const [destinations, setDestinations] = useState([]);
    const [editingDestination, setEditingDestination] = useState(null);

    const fetchDestinations = async () => {
        try {
            const response = await axios.get('http://localhost:5001/destination/');
            setDestinations(response.data);
        } catch (error) {
            console.error('Error fetching destinations:', error);
        }
    };

    const deleteDestination = async (destinationID) => {
        try {
            await axios.delete(`http://localhost:5001/destination/delete/${destinationID}`);
            setDestinations(destinations.filter(destination => destination._id !== destinationID));
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };

    const editDestination = (destination) => {
        setEditingDestination(destination);
    };

    const updateDestination = async (updatedDestination) => {
        try {
            await axios.put(`http://localhost:5001/destination/update/${updatedDestination._id}`, updatedDestination);
            setDestinations(destinations.map(destination => 
                destination._id === updatedDestination._id ? updatedDestination : destination
            ));
            setEditingDestination(null);
        } catch (error) {
            console.error('Error updating destination:', error);
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 md:px-8 lg:px-16">
            <h1>All Listed Destinations</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Thumbnail</th>
                        <th scope="col" className="px-6 py-3">Destination ID</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">District</th>
                        <th scope="col" className="px-6 py-3">Province</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {destinations.map((destination) => (
                        <tr key={destination._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src={"http://localhost:5001/DestinationImages/" + destination.dThumbnail} alt="Destination Thumbnail" className="w-16 md:w-32 max-w-full max-h-full" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {destination.destinationID}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {destination.dTitle}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {destination.dDescription}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {destination.dDistrict}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {destination.dProvince}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center">
                                <button 
                                    onClick={() => editDestination(destination)}
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

            {editingDestination && (
                <EditDestinationForm 
                    destination={editingDestination}
                    updateDestination={updateDestination}
                />
            )}
        </div>
    );
}

function EditDestinationForm({ destination, updateDestination }) {
    const [formData, setFormData] = useState({ ...destination });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDestination(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto border border-gray-300 p-4 rounded-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Edit Destination</h2>

            <div className="mb-4">
                <label htmlFor="dTitle" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                <input 
                    type="text" 
                    id="dTitle" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.dTitle}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dDescription" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea 
                    id="dDescription" 
                    rows="4" 
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.dDescription}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="dThumbnail" className="block mb-2 text-sm font-medium text-gray-900">Thumbnail Image</label>
                <input 
                    type="text" 
                    id="dThumbnail" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.dThumbnail}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dDistrict" className="block mb-2 text-sm font-medium text-gray-900">District</label>
                <input 
                    type="text" 
                    id="dDistrict" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.dDistrict}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="dProvince" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                <input 
                    type="text" 
                    id="dProvince" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.dProvince}
                    onChange={handleChange}
                />
            </div>

            <button 
                type="submit" 
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
                Save Changes
            </button>
        </form>
    );
}
