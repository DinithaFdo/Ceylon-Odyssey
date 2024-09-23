import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';

const AllTourPackages = () => { 
    const [tourPackages, setTourPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPackages, setFilteredPackages] = useState([]);

    const fetchTourPackages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tourPackage/');
            setTourPackages(response.data);
            setFilteredPackages(response.data);
        } catch (error) {
            console.error('Error fetching tour packages:', error);
        }
    };

    useEffect(() => {
        fetchTourPackages();

        const interval = setInterval(() => {
            fetchTourPackages();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const deleteTourPackage = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Tour Package?");
        if(confirmed) {
            try {
                await axios.delete(`http://localhost:5000/tourPackage/delete/${id}`);
                fetchTourPackages();
            } catch (error) {
                console.error('Error deleting tour package:', error);
                alert('Failed to delete the package.');
            }
        }
        
    };

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        const filtered = tourPackages.filter(
            (tourPackage) =>
                tourPackage.packageId.toLowerCase().includes(lowerCaseQuery) ||
                tourPackage.package_Title.toLowerCase().includes(lowerCaseQuery) ||
                tourPackage.pDestination.toLowerCase().includes(lowerCaseQuery) ||
                tourPackage.pCategory.toLowerCase().includes(lowerCaseQuery) ||
                tourPackage.pDays.toString().includes(lowerCaseQuery) ||
                tourPackage.packagePrice.toString().includes(lowerCaseQuery)
        );

        setFilteredPackages(filtered);
    }, [searchQuery, tourPackages]);
    

    return (
    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-10 bg-gray-100 min-h-screen">
            <div className="flex justify-center mt-24 relative">
                <div className="flex items-center w-1/2">
                    <input
                    type="text"
                    placeholder="Search for Tour packages"
                    className="flex-grow p-2 pl-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    style={{ height: '3.5rem' }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    
                </div>
            </div>

            <h1 className='pt-10 pb-10 text-3xl font-semibold text-black text-center'>All listed Tour Packages</h1>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Images
                        </th>
                        <th scope="col" className="px-6 py-3">
                            PackageID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Package Title
                        </th>
                        <th scope="col" className="px-6 py-3" >
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Create Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Destinations
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Days
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredPackages.length > 0 ? (
                        filteredPackages.map((tPackage, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                <img src={`http://localhost:5000/TourPackageImages/${tPackage.pImage}`} alt="Tour image" className="w-16 md:w-32 max-w-full max-h-full" />
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {tPackage.packageId}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white table-cell-wrap">
                                    {tPackage.package_Title}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white table-cell-wrap">
                                    {tPackage.packageDes}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {tPackage.pCreateDate}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {tPackage.pCategory}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {(tPackage.packagePrice).toFixed(2)}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {tPackage.pDestination}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {tPackage.pDays}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center space-y-1">
                                    <Link className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center w-28 h-10" 
                                        to={`/manageTourPackages/${tPackage._id}`} state={{ packageToEdit : tPackage }}>Update</Link>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out flex items-center justify-center w-28 h-10"
                                        onClick={() => deleteTourPackage(tPackage._id)}> Delete </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="text-center py-4">No current packages available</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}
export default AllTourPackages;