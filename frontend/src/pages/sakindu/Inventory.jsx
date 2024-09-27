import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";

function AllEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await axios.get("http://localhost:5000/equipment/");
      setEquipment(res.data);
      setFilteredEquipment(res.data);

      
      const types = [...new Set(res.data.map(equip => equip.equipmentType))];
      setEquipmentTypes(types);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEquipment = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Equipment?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/equipment/delete/${id}`);
        toast.success('Equipment Deleted Successfully!');
        fetchEquipment();
      } catch (error) {
        console.error('Error deleting Equipment:', error);
        toast.error('Error Deleting Equipment');
      }
    }
  };

  const downloadReport = () => {
    window.open('http://localhost:5000/equipment/report', '_blank');
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);

    if (type === 'All') {
      setFilteredEquipment(equipment);
    } else {
      const filtered = equipment.filter(equip => equip.equipmentType === type);
      setFilteredEquipment(filtered);
    }
  };

  return (
    <>
    <div>
                    <Toaster />
      <section className="max-w-4xl p-6 mx-auto bg-gray-700 rounded-md shadow-md dark:bg-gray-800 mt-20">
        
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold text-white capitalize dark:text-white">Inventory</h1>
          <button
            onClick={downloadReport}
            className="bg-blue-900 hover:bg-blue-700 text-white px-2 py-2 rounded"
          >
            Download Equipment Report
          </button>
        </div>
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="mb-4 p-2 rounded border"
        >
          <option value="All">All Equipment</option>
          {equipmentTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        <div className="grid grid-cols-1 gap-6 mt-2 sm:grid-cols-3">
          {filteredEquipment.map((equip) => (
            <div key={equip._id} className="bg-white dark:bg-gray-800 rounded-md shadow-md">
              <div className="flex justify-center items-center">
                <img
                  src={"http://localhost:5000/EquipmentImages/" + equip.equipmentImage}
                  alt={equip.equipmentImage}
                  className="w-auto h-auto sm:h-48 object-cover rounded-t-md"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{equip.equipmentName}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Rs. {equip.equipmentPrice}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{equip.equipmentType}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Qty: {equip.equipmentQuantity}</p>
              </div>
              <div className="flex justify-end mb-1">
                <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mr-3" onClick={() => deleteEquipment(equip._id)}>Delete</button>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-1">
                  <Link to={`/Equipment-dashboard/updateequipment/${equip._id}`} state={{ equipmentToEdit: equip }}>Update</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
    </>
  );
}

export default AllEquipment;
