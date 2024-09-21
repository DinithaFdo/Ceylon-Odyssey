import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuotationForm() {

    const [tourPackages, setTourPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [pPrice, setPPrice] = useState("");

    const [packageField, setPackageField] = useState([
        { packageId: "", numPeople: "", price: 0 }
    ]);

    const addPackageField = () => {
        setPackageField([...packageField, { packageId: "", numPeople: "", price: "" }]);
    };


    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [eqPrice, setEqPrice] = useState("");

    const [equipmentField, setEquipmentField] = useState([
        { equipmentID: "", numItems: "", price: "" }
    ]);

    const addEquipmentField = () => {
        setEquipmentField([...equipmentField, { equipmentID: "", numItems: "", price: 0 }]);
    }


    useEffect(() => {
        axios.get('http://localhost:5000/tourPackage/')
            .then(res => {
                console.log(res.data)

                setTourPackages(res.data);

            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const handePackageChange = (index, e) => {
        const {packageTitle, value} = e.target;
        const values = [...packageField];

        if(packageTitle === "packageId") {
            const selectedPackage = tourPackages.find((pkg) => pkg._id === value);
            values[index].price = selectedPackage.price;
        } else if(packageTitle === "numPeople") {
            values[index].numPeople = value;
            const basePrice = values[index].price;
            values.index.totalPrice = basePrice * value;
        } else {
            values[index].price = value;
        }

        setPackageField(values);

    }


    return (
        <div className="">
            <div className="container mx-auto p-20">
                <form className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-semibold mb-6">Get a Quotation</h2>
                    
                    {packageField.map((field, index) => (
                        <div key={index} className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        
                            <div>
                                <label htmlFor="packageId" className="block text-gray-700 font-medium mb-2 text-center">Package Name</label>
                                <select
                                    name="packageId"
                                    id={`packageId-${index}`}
                                    value={field.packageId}
                                    onChange={(event) => handePackageChange(index, event)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Select a Package</option>
                                    {tourPackages.map((pkg) => (
                                        <option key={pkg._id} value={pkg._id}>
                                            {pkg.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                            <div>
                                <label htmlFor="numPeople" className="block text-gray-700 font-medium mb-2 text-center">Number of People</label>
                                <input
                                    type="number"
                                    name="numPeople"
                                    id={`numPeople-${index}`}
                                    value={field.numPeople}
                                    placeholder="Enter Number of People"
                                    min="1"
                                    onChange={(event) => handePackageChange(index, event)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-center">Price</label>
                                <input
                                    type="text"
                                    id={`totalPrice-${index}`}
                                    value={field.totalPrice || 0}
                                    readOnly
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled/>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    onClick={addPackageField}
                                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    Add Another Package
                                </button>
                            </div>

                            <div>
                                <label htmlFor="equipmenetID" className="block text-gray-700 font-medium mb-2 text-center">Equipment</label>
                                <input
                                type="text"
                                id="equipmenetID"
                                placeholder="Enter Equipment Name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                            </div>

                            <div>
                                <label htmlFor="numEquipment" className="block text-gray-700 font-medium mb-2 text-center">Number of items</label>
                                <input
                                type="number"
                                id="numItems"
                                min="1"
                                placeholder="Enter Number of items"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                            </div>
                            

                        </div>
                    ))}

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Download Quotation
                        </button>
                    </div>
                </form>
            </div>

        </div>


    )

}