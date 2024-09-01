import React, { useState } from 'react';
import axios from 'axios';

function AddDestination() {
    const [destinationID, setDestinationID] = useState("");
    const [dTitle, setDTitle] = useState("");
    const [dDescription, setDDescription] = useState("");
    const [dThumbnail, setDThumbnail] = useState("");
    const [dExtImage, setDExtImage] = useState("");
    const [dDistrict, setDDistrict] = useState("");
    const [dProvince, setDProvince] = useState("");

    function addDestination(e) {
        e.preventDefault();
        alert("Destination Added Successfully");

        const newDestination = {
            destinationID,
            dTitle,
            dDescription,
            dThumbnail,
            dExtImage,
            dDistrict,
            dProvince,
        };

        axios.post("http://localhost:5001/destination/add", newDestination).then(() => {
            alert("Destination Added Successfully");

        }).catch((err) => {
            alert(err);
        });

        console.log(newDestination);
    }

    return (
        <form onSubmit={addDestination} className="max-w-lg mx-auto border border-gray-300 p-4 rounded-lg">
            <h1 className="text-3xl font-bold mb-7 text-gray-800">Add New Destination</h1>

            <div className="mb-8">
                <label htmlFor="destinationID" className="block mb-2 text-l font-medium text-gray-900">Destination ID</label>
                <input type="text" id="destinationID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDestinationID(e.target.value)} required />
            </div>

            <div className="mb-8">
                <label htmlFor="dTitle" className="block mb-2 text-l font-medium text-gray-900">Title</label>
                <input type="text" id="dTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDTitle(e.target.value)} required />
            </div>

            <div className="mb-8">
                <label htmlFor="dDescription" className="block mb-2 text-l font-medium text-gray-900">Description</label>
                <textarea id="dDescription" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setDDescription(e.target.value)} required></textarea>
            </div>

            <div className="mb-8">
                <label htmlFor="dThumbnail" className="block mb-2 text-l font-medium text-gray-900">Thumbnail Image</label>
                <input type="text" id="dThumbnail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDThumbnail(e.target.value)} required/>
            </div>

            <div className="mb-8">
                <label htmlFor="dExtImage" className="block mb-2 text-l font-medium text-gray-900">External Image</label>
                <input type="text" id="dExtImage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDExtImage(e.target.value)} required/>
            </div>

            <div className="mb-8">
                <label htmlFor="dDistrict" className="block mb-2 text-l font-medium text-gray-900">District</label>
                <input type="text" id="dDistrict" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDDistrict(e.target.value)} required />
            </div>

            <div className="mb-8">
                <label htmlFor="dProvince" className="block mb-2 text-l font-medium text-gray-900">Province</label>
                <input type="text" id="dProvince" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    onChange={(e) => setDProvince(e.target.value)} required />
            </div>

            <button type="submit" href="/add" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>

        </form>
    );
}

export default AddDestination;