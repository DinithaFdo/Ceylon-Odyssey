import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import quotationIcon from "../../assets/Ishan/quotation_icon.png";

const TourPackageUser = () => {

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
        
        <div className="container mx-auto pl-10 pr-10 bg-gray-100 min-h-screen">
            <div className="pb-5">
                <Navbar />
            </div>

            <div className="flex justify-center mt-24 relative">
                <div className="flex items-center w-1/2">
                    <input
                    type="text"
                    placeholder="Search for Tour packages"
                    className="flex-grow p-2 pl-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    style={{ height: '3.5rem' }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="absolute right-0 flex items-center mr-4">
                        <Link to="/quotationForm" className="flex items-center">
                        <img
                            src={quotationIcon}
                            alt="quotation icon"
                            className="w-16 h-16 cursor-pointer"
                        />
                        <h3 className="ml-2 text-xl text-black hover:text-blue-600 transition duration-300">Get Your Quotation</h3>
                        </Link>
                    </div>
                    
                </div>
            </div>

            {/*Adventure Packages list*/}
            <h1 className="text-3xl font-semibold text-black-700 mt-10 pb-5 flex justify-center">Adventure Tours</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {filteredPackages.filter(p => p.pCategory === "Adventure Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Adventure Tours").map((advenPackage, index) => (
                    <Link to={`/tour-packages/${advenPackage._id}`} key={advenPackage._id} 
                    className="transform transition duration-300 ease-in-out hover:-translate-y-2">
                        
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                        <h1 className="text-xl font-semibold mb-4">{advenPackage.package_Title}</h1>

                        <div className="relative w-full h-50 mb-4 overflow-hidden rounded-2xl">
                            <img 
                                className="w-full h-full object-cover" 
                                src={`http://localhost:5000/TourPackageImages/${advenPackage.pImage}`} 
                                alt="Tour package image"
                            />
                        </div>

                        <p className="text-black-700 text-lg mb-4">
                            Destinations: {advenPackage.pDestination}
                        </p>

                        <p className="text-black-700 text-lg mb-4">
                            Days: {advenPackage.pDays}
                        </p>

                        <p className="text-black-700 text-lg">
                            LKR {(advenPackage.packagePrice).toFixed(2)} Per person
                        </p>
                        </div>
                    </Link>
                    
                ))):(<h1 className="text-center col-span-full">
                        <p>No current packages available</p>
                        <img 
                            src="path_to_your_image" 
                            alt="No packages available" 
                            className="mx-auto mt-4 w-32 h-32"
                        />
                    </h1>)
                    
                }

            </div>

            {/*Cultural Packages list*/}
            <h1 className="text-3xl font-semibold text-black-700 mt-10 pt-10 pb-5 flex justify-center">Cultural Tours</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 ">
            {filteredPackages.filter(p => p.pCategory === "Cultural Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Cultural Tours").map((culturalPackage, index) => (
                    <Link to={`/tour-packages/${culturalPackage._id}`} key={culturalPackage._id}
                    className="transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                            <h1 className="text-xl font-semibold mb-4">{culturalPackage.package_Title}</h1>
                            
                            <div className="relative w-full h-50 mb-4 overflow-hidden rounded-2xl">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={`http://localhost:5000/TourPackageImages/${culturalPackage.pImage}`} 
                                    alt="Tour package image"
                                />
                            </div>

                            <p className="text-black-700 text-lg mb-4">
                                Destinations: {culturalPackage.pDestination}
                            </p>

                            <p className="text-black-700 text-lg mb-4">
                                Days: {culturalPackage.pDays}
                            </p>

                            <p className="text-black-700 text-lg">
                                LKR {(culturalPackage.packagePrice).toFixed(2)} Per person
                            </p>
                        </div>
                    </Link>
                ))):(<h1 className="text-center col-span-full">
                        <p>No current packages available</p>
                        <img 
                            src="path_to_your_image" 
                            alt="No packages available" 
                            className="mx-auto mt-4 w-32 h-32"
                        />
                    </h1>)
                
                }

            </div>

            {/*wildlifePackages list*/}
            <h1 className="text-3xl font-semibold text-black-700 mt-10 pt-10 pb-5 flex justify-center">Wildlife and Nature Tours</h1>
            <div className="mt-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {filteredPackages.filter(p => p.pCategory === "Wildlife and Nature Tours").length > 0 ? (
                filteredPackages.filter(p => p.pCategory === "Wildlife and Nature Tours").map((wildLifePackage, index) => (
                    <Link to={`/tour-packages/${wildLifePackage._id}`} key={wildLifePackage._id}
                    className="transform transition duration-300 ease-in-out hover:-translate-y-2">
                        <div key={index} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center">

                            <h1 className="text-xl font-semibold mb-4">{wildLifePackage.package_Title}</h1>
                            
                            <div className="relative w-full h-50 mb-4 overflow-hidden rounded-2xl">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={`http://localhost:5000/TourPackageImages/${wildLifePackage.pImage}`} 
                                    alt="Tour package image"
                                />
                            </div>

                            <p className="text-black-700 text-lg mb-4">
                                Destinations: {wildLifePackage.pDestination}
                            </p>

                            <p className="text-black-700 text-lg mb-4">
                                Days: {wildLifePackage.pDays}
                            </p>

                            <p className="text-black-700 text-lg">
                                LKR {(wildLifePackage.packagePrice).toFixed(2)} Per person
                            </p>
                        </div>
                    </Link>
                ))):(<h1 className="text-center col-span-full">
                        <p>No current packages available</p>
                        <img 
                            src="path_to_your_image" 
                            alt="No packages available" 
                            className="mx-auto mt-4 w-32 h-32"
                        />
                    </h1>)
                
                }

            </div>
        </div>
        
    )
}
export default TourPackageUser;