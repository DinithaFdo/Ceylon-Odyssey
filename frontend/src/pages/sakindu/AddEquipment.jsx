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

  function addEquipment(e) {
    e.preventDefault();

    // Create object for validation
    const equipment = {
      equipmentId,
      equipmentName,
      equipmentType,
      equipmentDescription,
      equipmentImage,
      equipmentPrice,
      equipmentQuantity
    };

    // Validate form fields
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
        alert("Equipment Successfully Added!!");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add Equipment</h1>
        <form onSubmit={addEquipment}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentId">Equipment ID</label>
              <input
                id="equipmentId"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentId(e.target.value)}
              />
              {errors.equipmentId && <p className="text-red-500">{errors.equipmentId}</p>}
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentName">Equipment Name</label>
              <input
                id="equipmentName"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentName(e.target.value)}
              />
              {errors.equipmentName && <p className="text-red-500">{errors.equipmentName}</p>}
            </div>

            
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentType">Equipment Type</label>
              <select
                id="equipmentType"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option>Hiking</option>
                <option>Luggage</option>
                <option>Clothes</option>
                <option>Toiletries</option>
              </select>
              {errors.equipmentType && <p className="text-red-500">{errors.equipmentType}</p>}
            </div>

            
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentDescription">Equipment Description</label>
              <textarea
                id="equipmentDescription"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentDescription(e.target.value)}
              />
              {errors.equipmentDescription && <p className="text-red-500">{errors.equipmentDescription}</p>}
            </div>

            
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentPrice">Equipment Price</label>
              <input
                id="equipmentPrice"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentPrice(parseFloat(e.target.value))}
              />
              {errors.equipmentPrice && <p className="text-red-500">{errors.equipmentPrice}</p>}
            </div>

            
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentQuantity">Equipment Quantity</label>
              <input
                id="equipmentQuantity"
                type="text"
                className="block w-full px-4 py-2 mt-2"
                onChange={(e) => setEquipmentQuantity(parseFloat(e.target.value))}
              />
              {errors.equipmentQuantity && <p className="text-red-500">{errors.equipmentQuantity}</p>}
            </div>

            
            <div className="mb-8">
              <label className="block mb-2 text-l font-medium text-gray-900 dark:text-white" htmlFor="equipmentImage">Upload Image</label>
              <input
                name="equipmentImage"
                className="block w-full p-2.5"
                id="equipmentImage"
                type="file"
                onChange={(e) => {
                  setEquipmentImage(e.target.files[0]);
                }}
              />
              
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-6 py-2 leading-5 text-white bg-pink-500 rounded-md hover:bg-pink-700">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddEquipment;
