import React, { useState } from 'react';
import axios from 'axios';
import ValidateAddEquipment from './validateAddEquipment';

function AddEquipment() {
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentDescription, setEquipmentDescription] = useState("");
  const [equipmentImage, setEquipmentImage] = useState(null);
  const [equipmentPrice, setEquipmentPrice] = useState("");
  const [equipmentQuantity, setEquipmentQuantity] = useState(50);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); 

  function addEquipment(e) {
    e.preventDefault();

    const equipment = {
      equipmentId,
      equipmentName,
      equipmentType,
      equipmentDescription,
      equipmentImage,
      equipmentPrice,
      equipmentQuantity
    };

    const validationErrors = ValidateAddEquipment(equipment);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("equipmentId", equipmentId);
    formData.append("equipmentName", equipmentName);
    formData.append("equipmentType", equipmentType);
    formData.append("equipmentDescription", equipmentDescription);
    formData.append("equipmentImage", equipmentImage);
    formData.append("equipmentPrice", equipmentPrice);
    formData.append("equipmentQuantity", equipmentQuantity);

    axios.post("http://localhost:5000/equipment/add", formData)
      .then(() => {
        setSuccessMessage('✅ Equipment added successfully!');
        setEquipmentId('');
        setEquipmentName('');
        setEquipmentType('');
        setEquipmentDescription('');
        setEquipmentPrice('');
        setEquipmentQuantity(50);
        setEquipmentImage(null);

        
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md">
            <p className="font-medium">{successMessage}</p>
          </div>
        )}
  
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Add Equipment</h2>
          </div>
  
          <form onSubmit={addEquipment} className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            
              <div>
                <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-700">
                  Equipment ID
                </label>
                <input
                  id="equipmentId"
                  type="text"
                  className="mt-2 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setEquipmentId(e.target.value)}
                />
                {errors.equipmentId && <p className="mt-2 text-sm text-red-600">{errors.equipmentId}</p>}
              </div>
  
             
              <div>
                <label htmlFor="equipmentName" className="block text-sm font-medium text-gray-700">
                  Equipment Name
                </label>
                <input
                  id="equipmentName"
                  type="text"
                  className="mt-2 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setEquipmentName(e.target.value)}
                />
                {errors.equipmentName && <p className="mt-2 text-sm text-red-600">{errors.equipmentName}</p>}
              </div>
  
              
              <div>
                <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700">
                  Equipment Type
                </label>
                <select
                  id="equipmentType"
                  className="mt-2 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setEquipmentType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option>Hiking</option>
                  <option>Luggage</option>
                  <option>Clothes</option>
                  <option>Toiletries</option>
                </select>
                {errors.equipmentType && <p className="mt-2 text-sm text-red-600">{errors.equipmentType}</p>}
              </div>
  
              <div className="sm:col-span-2">
                <label htmlFor="equipmentDescription" className="block text-sm font-medium text-gray-700">
                  Equipment Description
                </label>
                <textarea
                  id="equipmentDescription"
                  rows="4"
                  className="mt-2 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setEquipmentDescription(e.target.value)}
                />
                {errors.equipmentDescription && <p className="mt-2 text-sm text-red-600">{errors.equipmentDescription}</p>}
              </div>
  
           
              <div>
                <label htmlFor="equipmentPrice" className="block text-sm font-medium text-gray-700">
                  Equipment Price
                </label>
                <div className="mt-2 relative rounded-md shadow-sm">
                  
                  <input
                    id="equipmentPrice"
                    type="text"
                    className="block w-full pl-7 pr-12 border border-gray-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                    placeholder=" 0.00"
                    onChange={(e) => setEquipmentPrice(parseFloat(e.target.value))}
                  />
                </div>
                {errors.equipmentPrice && <p className="mt-2 text-sm text-red-600">{errors.equipmentPrice}</p>}
              </div>
  
              
              <div>
                <label htmlFor="equipmentQuantity" className="block text-sm font-medium text-gray-700">
                  Equipment Quantity
                </label>
                <input
                  id="equipmentQuantity"
                  type="number"
                  min="0"
                  className="mt-2 block w-full px-4 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  onChange={(e) => setEquipmentQuantity(parseFloat(e.target.value))}
                />
                {errors.equipmentQuantity && <p className="mt-2 text-sm text-red-600">{errors.equipmentQuantity}</p>}
              </div>
  
           
              <div className="sm:col-span-2">
                <label htmlFor="equipmentImage" className="block text-sm font-medium text-gray-700">
                  Upload Image
                </label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-500 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="equipmentImage"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="equipmentImage"
                          name="equipmentImage"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            setEquipmentImage(e.target.files[0]);
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                document.getElementById('imagePreview').src = event.target.result;
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <img id="imagePreview" alt="Selected Image" className="mx-auto mt-2 max-h-24" />
                  </div>
                </div>
              </div>
            </div>
  
           
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  
}

export default AddEquipment;
