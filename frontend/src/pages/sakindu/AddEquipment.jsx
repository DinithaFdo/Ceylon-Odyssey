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

            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="equipmentQuantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
                <input
                  type="range"
                  id="equipmentQuantity"
                  className="w-full accent-indigo-600"
                  min="0"
                  max="100"
                  value={equipmentQuantity}
                  onChange={(e) => setEquipmentQuantity(parseFloat(e.target.value))}
                />
              </div>
              <div className="flex justify-between text-gray-500">
                <span id="minQty">{equipmentQuantity}</span>
                <span id="maxQty">100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) => setEquipmentImage(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
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
