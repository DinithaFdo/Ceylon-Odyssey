import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function IndivudualPackage() {

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
        <div className="mt-6 md:mt-10 md:mx-10">
            <h1 className="text-4xl font-bold text-left mb-8">{tourPackage.package_Title}</h1>
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <img 
                    src={`http://localhost:5000/TourPackageImages/${tourPackage.pImage}`} 
                    alt={tourPackage.title} 
                    className="w-full md:w-1/2 rounded-lg shadow-lg"
                />
                
                <div className="mt-6 md:mt-0 md:ml-8">
                    <p className="text-lg mb-4"><strong>Package Category:</strong> {tourPackage.pCategory}</p>
                    <p className="text-lg mb-4 break-words whitespace-normal"><strong>Description:</strong> {tourPackage.packageDes}</p>
                    <p className="text-lg mb-4"><strong>Included Destinations :</strong> {tourPackage.pDestination} days</p>
                    <p className="text-lg mb-4"><strong>Duration:</strong> {tourPackage.pDays} days</p>
                    <p className="text-lg mb-4"><strong>Price:</strong> LKR {(tourPackage.packagePrice.toFixed(2))} Per Person</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4">
                        Book Now
                    </button>
                </div>
            </div>

            
        </div>
    )
}