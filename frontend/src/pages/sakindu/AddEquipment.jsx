import React, { useState } from 'react';
import axios from 'axios';

function AddEquipment() {
  const [equipmentId, setEquipmentId] = useState("");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentDescription, setEquipmentDescription] = useState("");
  const [equipmentImage, setEquipmentImage] = useState(null);
  const [equipmentPrice, setEquipmentPrice] = useState("");
  const [equipmentQuantity, setEquipmentQuantity] = useState(50);

  function addEquipment(e) {
    e.preventDefault();

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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentId(e.target.value)}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentName">Equipment Name</label>
              <input
                id="equipmentName"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentType">Equipment Type</label>
              <select
                id="equipmentType"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentType(e.target.value)}
              >
                <option>Hiking</option>
                <option>Luggage</option>
                <option>Clothes</option>
                <option>Toiletries</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentDescription">Equipment Description</label>
              <textarea
                id="equipmentDescription"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentPrice">Equipment Price</label>
              <input
                id="equipmentPrice"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentPrice(parseFloat(e.target.value))}
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="equipmentPrice">Equipment Quantity</label>
              <input
                id="equipmentQuantity"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setEquipmentQuantity(parseFloat(e.target.value))}
              />
            </div>

            <div className="mb-8">
                <label className="block mb-2 text-l font-medium text-gray-900 dark:text-white" htmlFor="pImage">Upload Image</label>
                <input name="equipmentImage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-describedby="user_avatar_help" id="equipmentImage" type="file" 
                onChange={(e) => {
                  setEquipmentImage(e.target.files[0]);
                }} required/>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button type="submit" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AddEquipment;
