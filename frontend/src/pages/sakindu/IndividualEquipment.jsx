import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar"; 
import Footer from "../../components/Footer/Footer";

export default function IndividualEquipment() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState({});

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`http://localhost:5000/equipment/get/${id}`).then((res) => {
            setEquipment(res.data.equipment);
        }).catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <div>
            <Navbar />
            <div className="mt-6 md:mt-10 md:mx-10 pt-20"> 
                <h1 className="text-4xl font-bold text-left mb-8">{equipment.equipmentName}</h1>
                
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <img 
                    src={`http://localhost:5000/equipmentImages/${equipment.equipmentImage}`} 
                    alt={equipment.equipmentName} 
                    className="w-full h-60 object-contain rounded-lg mb-10"
                />

                <div className="mt-6 md:mt-0 md:ml-1 w-full">
                    
                    <div className="p-6 bg-gray-200 rounded-lg shadow-lg">
                       
                        <p className="text-lg mb-2"><strong>Type:</strong> {equipment.equipmentType}</p>

                        
                        <p className="text-s mb-2 break-words whitespace-normal">
                            <strong>Description:</strong> {equipment.equipmentDescription}
                        </p>
                        <br></br>
                        
                        <p className="text-lg mb-2"><strong>Price:</strong> LKR {equipment.equipmentPrice && equipment.equipmentPrice.toFixed(2)}</p>

                        <p className="text-lg mb-2"><strong>Available Quantity:</strong> {equipment.equipmentQuantity}</p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-8">
                        Add to Cart
                    </button>
                    </div>
                </div>


            </div>
            <Footer />
        </div>
    );
}
