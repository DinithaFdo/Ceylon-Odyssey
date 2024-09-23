import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar";

const IndivudualPackage = () => {

    const {id} = useParams();
    const [tourPackage, setTourPackage] = useState({});

    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get(`http://localhost:5000/tourPackage/get/${id}`).then((res) => {
            setTourPackage(res.data.package);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);


    return (
        <div className="container mx-auto pl-10 pr-10 bg-gray-100 min-h-screen">

            <div className="pb-5">
                <Navbar />
            </div>

            <h1 className="text-4xl font-bold text-left mb-10 mt-24">{tourPackage.package_Title}</h1>
            
            <div className="flex flex-col md:flex-row items-start justify-between pb-10 relative">
                <img 
                    src={`http://localhost:5000/TourPackageImages/${tourPackage.pImage}`} 
                    alt={tourPackage.title} 
                    className="w-full md:w-1/2 h-auto rounded-lg shadow-lg"
                />
                
                <div className="mt-6 md:mt-0 md:ml-8 pr-10 text-justify">
                    <p className="text-lg mb-8"><strong>Package Category:</strong> {tourPackage.pCategory}</p>
                    <p className="text-lg mb-8 break-words whitespace-normal"><strong>Description:<br/></strong> {tourPackage.packageDes}</p>
                    <p className="text-lg mb-8"><strong>Included Destinations :</strong> {tourPackage.pDestination} days</p>
                    <p className="text-lg mb-8"><strong>Duration:</strong> {tourPackage.pDays} days</p>
                    <p className="text-lg "><strong>Price:</strong> LKR {parseFloat(tourPackage.packagePrice).toFixed(2)} Per Person</p>
                    <button className="bg-blue-600 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4 float-right transition duration-300 ease-in-out">
                        Book Now
                    </button>
                </div>
            </div>

            
        </div>
    )
}
export default IndivudualPackage;