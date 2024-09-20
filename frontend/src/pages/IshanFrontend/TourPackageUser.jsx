import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function TourPackageUser() {

    const [adventurePackages, setPackagesAdventure] = useState([]);
    const [culturalPackages, setPackagesCultural] = useState([]);
    const [wildlifePackages, setPackagesWildlife] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tourPackage/')
            .then(res => {
                console.log(res.data)
                const adventurePackages = res.data.filter(tPackage => tPackage.pCategory === "Adventure Tours");
                setPackagesAdventure(adventurePackages);

                const culturalPackages = res.data.filter(tPackage => tPackage.pCategory === "Cultural Tours");
                setPackagesCultural(culturalPackages);

                const wildlifePackages = res.data.filter(tPackage => tPackage.pCategory === "Wildlife and Nature Tours");
                setPackagesWildlife(wildlifePackages);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);



    return(

        <div className="container mx-auto px-8">
            {/*Adventure Packages list*/}
            <h1 className="text-2xl font-semibold text-gray-700 mt-8">Adventure Tours</h1>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                {adventurePackages.length > 0 ? (adventurePackages.map((advenPackage, index) => (
                    <Link to={`/tourPackage/${advenPackage._id}`}>
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
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                {culturalPackages.length > 0 ? (culturalPackages.map((culturalPackage, index) => (
                    <Link to={`/tourPackage/${culturalPackage._id}`}>
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
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                {wildlifePackages.length > 0 ? (wildlifePackages.map((wildLifePackage, index) => (
                    <Link to={`/tourPackage/${wildLifePackage._id}`}>
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