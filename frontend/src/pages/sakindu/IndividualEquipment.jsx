import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../components/Navbar/Navbar"; // Import your Navbar component

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
            <Navbar /> {/* Add Navbar here */}
            <div className="mt-6 md:mt-10 md:mx-10 pt-20"> {/* Add padding-top to avoid overlap */}
                <h1 className="text-4xl font-bold text-left mb-8">{equipment.equipmentName}</h1>
                
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <img 
                        src={`http://localhost:5000/equipmentImages/${equipment.equipmentImage}`} 
                        alt={equipment.equipmentName} 
                        className="w-full h-36 object-contain rounded-lg mb-4"
                    />
                    
                    <div className="mt-6 md:mt-0 md:ml-8">
                        <p className="text-lg mb-4"><strong>Type:</strong> {equipment.equipmentType}</p>
                        <p className="text-lg mb-4 break-words whitespace-normal"><strong>Description:</strong> {equipment.equipmentDescription}</p>
                        <p className="text-lg mb-4"><strong>Price:</strong> LKR {equipment.equipmentPrice && equipment.equipmentPrice.toFixed(2)}</p>
                        <p className="text-lg mb-4"><strong>Available Quantity:</strong> {equipment.equipmentQuantity}</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg mt-4">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
