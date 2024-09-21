import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { set } from "mongoose";

export default function TourPackageUser() {

    const [tourPackages, setTourPackages] = useState([]);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tourPackage/')
            .then(res => {
                console.log(res.data)

                setTourPackages(res.data);
                setFilteredPackages(res.data);

            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();

        const filtered = tourPackages.filter(
            (tourPackage) => tourPackage.package_Title.toLowerCase().includes(lowerCaseQuery) ||
                            tourPackage.pDestination.toLowerCase().includes(lowerCaseQuery) ||
                            tourPackage.pCategory.toLowerCase().includes(lowerCaseQuery) ||
                            tourPackage.pDays.toString().includes(lowerCaseQuery) ||
                            tourPackage.packagePrice.toString().includes(lowerCaseQuery)
        );

        setFilteredPackages(filtered);

    }, [searchQuery, tourPackages]);



    return(

        <div className="container mx-auto px-8">

            <div className="search-bar mt-8">
                <input
                    type="text"
                    placeholder="Search for Tour packages"
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/*Adventure Packages list*/}
            <h1 className="text-2xl font-semibold text-gray-700 mt-8">Adventure Tours</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {filteredPackages.filter(p => p.pCategory === "Adventure Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Adventure Tours").map((advenPackage, index) => (
                    <Link to={`/tourPackage/${advenPackage._id}`} key={advenPackage._id}>
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                        <h2 className="text-lg font-semibold mb-2">{advenPackage.package_Title}</h2>

                        <div className="relative w-full h-36 mb-4">
                            <img 
                                className="w-full h-full object-contain rounded-2xl" 
                                src={`http://localhost:5000/TourPackageImages/${advenPackage.pImage}`} 
                                alt="Tour package image"
                            />
                        </div>

                        <p className="text-gray-700 mb-2">
                            Destination: {advenPackage.pDestination}
                        </p>

                        <p className="text-gray-700 mb-2">
                            Days: {advenPackage.pDays}
                        </p>

                        <p className="text-blue-600 font-bold text-lg">
                            LKR {advenPackage.packagePrice} Per person
                        </p>
                        </div>
                    </Link>
                    
                ))):(<h1><p className="text-center col-span-full">No current packages available</p></h1>)
                    
                }

            </div>

            {/*Cultural Packages list*/}
            <h1 className="text-2xl font-semibold text-gray-700 mt-8">Cultural Tours</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {filteredPackages.filter(p => p.pCategory === "Cultural Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Cultural Tours").map((culturalPackage, index) => (
                    <Link to={`/tourPackage/${culturalPackage._id}`} key={culturalPackage._id}>
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                            <h2 className="text-lg font-semibold mb-2">{culturalPackage.package_Title}</h2>
                            
                            <div className="relative w-full h-36 mb-4">
                                <img 
                                    className="w-full h-full object-contain rounded-2xl" 
                                    src={`http://localhost:5000/TourPackageImages/${culturalPackage.pImage}`} 
                                    alt="Tour package image"
                                />
                            </div>

                            <p className="text-gray-700 mb-2">
                                Destination: {culturalPackage.pDestination}
                            </p>

                            <p className="text-gray-700 mb-2">
                                Days: {culturalPackage.pDays}
                            </p>

                            <p className="text-blue-600 font-bold text-lg">
                                LKR {culturalPackage.packagePrice} Per person
                            </p>
                        </div>
                    </Link>
                ))):(<h1><p className="text-center col-span-full">No current packages available</p></h1>)
                
                }

            </div>

            {/*wildlifePackages list*/}
            <h1 className="text-2xl font-semibold text-gray-700 mt-8">Wildlife and Nature Tours</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {filteredPackages.filter(p => p.pCategory === "Wildlife and Nature Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Wildlife and Nature Tours").map((wildLifePackage, index) => (
                    <Link to={`/tourPackage/${wildLifePackage._id}`} key={wildLifePackage._id}>
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                            <h2 className="text-lg font-semibold mb-2">{wildLifePackage.package_Title}</h2>
                            
                            <div className="relative w-full h-36 mb-4">
                                <img 
                                    className="w-full h-full object-contain rounded-2xl" 
                                    src={`http://localhost:5000/TourPackageImages/${wildLifePackage.pImage}`} 
                                    alt="Tour package image"
                                />
                            </div>

                            <p className="text-gray-700 mb-2">
                                Destination: {wildLifePackage.pDestination}
                            </p>

                            <p className="text-gray-700 mb-2">
                                Days: {wildLifePackage.pDays}
                            </p>

                            <p className="text-blue-600 font-bold text-lg">
                                LKR {wildLifePackage.packagePrice} Per person
                            </p>
                        </div>
                    </Link>
                ))):(<h1><p className="text-center col-span-full">No current packages available</p></h1>)
                
                }

            </div>
        </div>
        
    )
}