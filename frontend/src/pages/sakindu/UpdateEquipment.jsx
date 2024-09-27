import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

export default function UpdateEquipment() {
    const { id } = useParams();

    const [values, setValues] = useState({
        equipmentId: '',
        equipmentName: '',
        equipmentPrice: 0,
        equipmentType: '',
        equipmentQuantity: 0,
        equipmentImage: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/equipment/get/${id}`)
            .then((response) => {
                const equipmentData = response.data.equipment;
                setValues({
                    equipmentId: equipmentData.equipmentId, 
                    equipmentName: equipmentData.equipmentName,
                    equipmentPrice: equipmentData.equipmentPrice,
                    equipmentType: equipmentData.equipmentType,
                    equipmentQuantity: equipmentData.equipmentQuantity,
                    equipmentImage: equipmentData.equipmentImage
                });
            })
            .catch((err) => {
                console.error('Error fetching equipment:', err);
            });
    }, [id]);

    const navigate = useNavigate();

    const updateequipment = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'equipmentImage' && typeof values[key] === 'object') {
                formData.append(key, values[key]);
            } else if (key !== 'equipmentImage') {
                formData.append(key, values[key]);
            }
        });

        axios.put(`http://localhost:5000/equipment/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            toast.success('Equipment Updated Successfully!');
           
            
        }).catch((err) => {
            toast.error('Error Updating Equipment');
            console.error('Error:', err);
        });
    };

    return (

        <div>
                    <Toaster />
        <form onSubmit={updateequipment} encType="multipart/form-data" className="max-w-4xl p-6 mx-auto bg-gray-700 rounded-md shadow-md dark:bg-gray-800 mt-20" >
            <h1 className="text-3xl font-bold mb-7 text-white">Update Equipment</h1>


            <div className="grid grid-cols-2 gap-8">
                
           
                <div className="mb-8">
                    <label htmlFor="equipmentId" className="block mb-2 text-l font-medium text-white dark:text-white">Equipment ID</label>
                    <input type="text" id="equipmentId" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={values.equipmentId}  />
                </div>

                <div className="mb-8">
                    <label htmlFor="equipmentName" className="block mb-2 text-l font-medium text-white dark:text-white">Equipment Name</label>
                    <input type="text" id="equipmentName"className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     value={values.equipmentName} 
                     onChange={(e) => setValues({ ...values, equipmentName: e.target.value })} required />
                </div>


                <div className="mb-8">
                    <label htmlFor="equipmentPrice" className="block mb-2 text-l font-medium text-white dark:text-white">Equipment Price</label>
                    <input type="number" id="equipmentPrice" className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={values.equipmentPrice}
                    onChange={(e) => setValues({...values, equipmentPrice: parseFloat(e.target.value)})} required />
                </div>

                <div className="mb-8">
                    <label htmlFor="equipmentType" className="block mb-2 text-l font-medium text-white dark:text-white">Equipment Type</label>
        
                    <select id="equipmentType" className="text-base block w-full px-4 py-2 mt-2" value={values.equipmentType}
                onChange={(e) => setValues({...values, equipmentType: e.target.value})} required
                    >
                    <option value={values.equipmentType}>{values.equipmentType}</option>
                    <option>Hiking</option>
                    <option>Luggage</option>
                    <option>Clothes</option>
                    <option>Toiletries</option>
                </select>
                </div>


                <div className="mb-8">
                    <label htmlFor="equipmentQuantity" className="block mb-2 text-l font-medium text-white dark:text-white">Equipment Quantity</label>
                    <input type="number" id="equipmentQuantity" className="text-base bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={values.equipmentQuantity}
                    onChange={(e) => setValues({...values, equipmentQuantity: parseFloat(e.target.value)})} required />
                </div>

                <div className="mb-8">
                    <label className="block mb-2 text-l font-medium text-white dark:text-white" htmlFor="equipmentImage">Upload Image</label>
                    <input name="equipmentImage" id="equipmentImage" type="file" onChange={(e) => setValues({ ...values, equipmentImage: e.target.files[0] })} />
                </div>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Equipment</button>
        </form>
        </div>
    );
}
