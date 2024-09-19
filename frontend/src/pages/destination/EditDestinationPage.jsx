import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import AddDestinationValidation from '../../pages/destination/AddDestinationValidation';

export default function EditDestinationPage() {
    const [destination, setDestination] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        destinationID: '',
        dTitle: '',
        dDescription: '',
        dThumbnail: '',
        dExtImage: '',
        dDistrict: '',
        dProvince: ''
    });

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/destination/get/${id}`);
                if (response.data.status === 'Destination fetched') {
                    const destinationData = response.data.destination;
                    setDestination(destinationData);
                    setFormData({
                        destinationID: destinationData.destinationID,
                        dTitle: destinationData.dTitle,
                        dDescription: destinationData.dDescription,
                        dThumbnail: destinationData.dThumbnail,
                        dExtImage: destinationData.dExtImage,
                        dDistrict: destinationData.dDistrict,
                        dProvince: destinationData.dProvince
                    });
                }
            } catch (error) {
                console.error('Error fetching destination:', error);
            }
        };

        fetchDestination();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = AddDestinationValidation(
            formData.destinationID,
            formData.dTitle,
            formData.dDescription,
            formData.dThumbnail,
            formData.dExtImage,
            formData.dDistrict,
            formData.dProvince
        );

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.put(`http://localhost:5001/destination/update/${id}`, formData);
            setSuccessMessage('Destination updated successfully!');
            setTimeout(() => navigate('/view-destinations'), 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error updating destination:', error);
            setErrors({ update: 'Error updating destination. Please try again later.' });
        }
    };

    if (!destination) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16">
                <div className="max-w-lg mx-auto border border-gray-300 p-4 rounded-lg mt-8">
                    <h2 className="text-2xl font-bold mb-4">Edit Destination</h2>

                    {successMessage && (
                        <div className="mb-4 p-4 text-green-800 bg-green-100 rounded-lg">
                            <p>{successMessage}</p>
                        </div>
                    )}

                    {errors.update && (
                        <div className="mb-4 p-4 text-red-800 bg-red-100 rounded-lg">
                            <p>{errors.update}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="destinationID" className="block mb-2 text-sm font-medium text-gray-900">Destination ID</label>
                            <input 
                                type="text" 
                                id="destinationID" 
                                value={formData.destinationID}
                                readOnly
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.destinationID ? 'border-red-500' : ''}`}
                            />
                            {errors.destinationID && <p className="text-red-500 text-sm">{errors.destinationID}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dTitle" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input 
                                type="text" 
                                id="dTitle" 
                                value={formData.dTitle}
                                onChange={handleChange}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.dTitle ? 'border-red-500' : ''}`}
                            />
                            {errors.dTitle && <p className="text-red-500 text-sm">{errors.dTitle}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dDescription" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea 
                                id="dDescription" 
                                rows="4" 
                                value={formData.dDescription}
                                onChange={handleChange}
                                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 ${errors.dDescription ? 'border-red-500' : ''}`}
                            ></textarea>
                            {errors.dDescription && <p className="text-red-500 text-sm">{errors.dDescription}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dThumbnail" className="block mb-2 text-sm font-medium text-gray-900">Thumbnail Image</label>
                            <input 
                                type="text" 
                                id="dThumbnail" 
                                value={formData.dThumbnail}
                                onChange={handleChange}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.dThumbnail ? 'border-red-500' : ''}`}
                            />
                            {errors.dThumbnail && <p className="text-red-500 text-sm">{errors.dThumbnail}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dExtImage" className="block mb-2 text-sm font-medium text-gray-900">Extra Images</label>
                            <input 
                                type="text" 
                                id="dExtImage" 
                                value={formData.dExtImage}
                                onChange={handleChange}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.dExtImage ? 'border-red-500' : ''}`}
                            />
                            {errors.dExtImage && <p className="text-red-500 text-sm">{errors.dExtImage}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dDistrict" className="block mb-2 text-sm font-medium text-gray-900">District</label>
                            <input 
                                type="text" 
                                id="dDistrict" 
                                value={formData.dDistrict}
                                onChange={handleChange}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.dDistrict ? 'border-red-500' : ''}`}
                            />
                            {errors.dDistrict && <p className="text-red-500 text-sm">{errors.dDistrict}</p>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="dProvince" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                            <input 
                                type="text" 
                                id="dProvince" 
                                value={formData.dProvince}
                                onChange={handleChange}
                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors.dProvince ? 'border-red-500' : ''}`}
                            />
                            {errors.dProvince && <p className="text-red-500 text-sm">{errors.dProvince}</p>}
                        </div>

                        <button 
                            type="submit" 
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
