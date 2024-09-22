import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

export default function QuotationForm() {

    const [tourPackages, setTourPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [basePrice, setBasePrice] = useState("");
    const [numPeople, setNumPeople] = useState(1);

    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [eqPrice, setEqPrice] = useState(0);
    const [baseEqPrice, setBaseEqPrice] = useState("");
    const [numItems, setNumItems] = useState();

    const handleFee = 1000;
    const vat = ((parseFloat(pPrice) + parseFloat(eqPrice)) * 0.05);
    const totalPrice = pPrice + eqPrice + handleFee + vat;
    const formatedHandleFee = handleFee.toFixed(2);
    const formatedVat = vat.toFixed(2);
    const formatedTotalPrice = totalPrice.toFixed(2);

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

    useEffect(() => {
        axios.get('http://localhost:5000/equipment/')
            .then(res => {
                console.log(res.data)

                setEquipment(res.data);

            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    const handePackageChange = (e) => {
        const selectedPackageID = e.target.value;
        setSelectedPackage(selectedPackageID);

        const selectedPckg = tourPackages.find((pkg) => pkg._id === selectedPackageID);
        
        if (selectedPckg) {
            setPPrice(selectedPckg.packagePrice * numPeople);
            setBasePrice(selectedPckg.packagePrice);
        } else {
            setPPrice("");
            setBasePrice("");
        }

    }

    const handleNumPeopleChange = (e) => {
        const peopleCount = e.target.value;
        setNumPeople(peopleCount);
        if (basePrice) {
            setPPrice(basePrice * peopleCount);
        }
    };

    const handleEquipmentChange = (e) => {
        const selectedEqID = e.target.value;
        setSelectedEquipment(selectedEqID);

        const selectedEq = equipment.find((eq) => eq._id === selectedEqID);
        
        if (selectedEq) {
            setEqPrice(selectedEq.equipmentPrice * numItems);
            setBaseEqPrice(selectedEq.equipmentPrice);
        } else {
            setEqPrice("");
            setBaseEqPrice("");
        }

    }

    const handleNumItemsChange = (e) => {
        const itemCount = e.target.value;
        setNumItems(itemCount);
        if (baseEqPrice) {
            setEqPrice(baseEqPrice * itemCount);
        }
    }

    const generatePdf = () => {
        const doc = new jsPDF();
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
    
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
        doc.setFontSize(30);
        doc.text('Quotation', 80, 25);
        
        doc.setFontSize(14);
        doc.text("Package Name", 25, 50);
        doc.text("Number of People", 95, 50);
        doc.text("Price (LKR) ", 170, 50);
    
        const packageName = tourPackages.find(pkg => pkg._id === selectedPackage)?.package_Title || 'No packages';
        doc.setFontSize(12);
        doc.text(packageName, 20, 70);
        doc.text(`${numPeople}`, 100, 70);
        doc.text(`${pPrice.toFixed(2)}`, 180, 70); 
    
        doc.setFontSize(14);
        doc.text("Equipment:", 25, 100);
        doc.text("Number of Items:", 95, 100);
        doc.text("Price (LKR) ", 170, 100);
        
        const eqName = equipment.find(eq => eq._id === selectedEquipment)?.equipmentName || 'No Items';
        doc.setFontSize(12);
        doc.text(eqName, 20, 120);
        doc.text(`${numItems ? numItems : 'No Items'}`, 100, 120);
        doc.text(`${eqPrice.toFixed(2)}`, 180, 120);
    
        doc.setFontSize(13);
        doc.text("Handling Fee (LKR) :", 125, 150);
        doc.text(`${handleFee.toFixed(2)}`, 180, 150);
        doc.text("5% VAT (LKR) :", 125, 160);
        doc.text(`${vat.toFixed(2)}`, 180, 160);
    
        doc.setFontSize(15);
        doc.text("Total Price (LKR) :", 125, 180);
        doc.text(`${(pPrice + eqPrice).toFixed(2)}`, 175, 180);
    
        doc.setFontSize(12)
        doc.text("Note: The prices mentioned in this quotation are subject to change without prior notice due to", 15, 250);
        doc.text("fluctuations in market conditions, availability, or other unforeseen circumstances. Please confirm", 15, 257);
        doc.text("the prices before proceeding with the booking.", 15, 264);
        
        doc.save('quotation.pdf');
        
    }

    return (
        <div className="p-10">
            <div className="container mx-auto p-20">
                <form className="bg-white shadow-md rounded-lg p-8"
                onSubmit={(e) =>
                    {
                        e.preventDefault();
                        generatePdf();
                    }
                 } >
                    <h2 className="text-3xl font-semibold mb-6 text-center pb-10">Get a Quotation</h2>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    
                        <div>
                            <label htmlFor="packageId" className="block text-gray-700 font-medium mb-2 text-center ">Package Name</label>
                            <select
                                id="packageId"
                                value={selectedPackage}
                                onChange={handePackageChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select a Package</option>
                                {tourPackages.map((pkg) => (
                                    <option key={pkg._id} value={pkg._id}>
                                        {pkg.package_Title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="numPeople" className="block text-gray-700 font-medium mb-2 text-center">Number of People</label>
                            <input
                            type="number"
                            id="numPeople"
                            min="1"
                            value={numPeople}
                            onChange={handleNumPeopleChange}
                            placeholder="Enter Number of People"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-center">Price (LKR)</label>
                            <input
                            type="number"
                            id="pckPrice"
                            value={pPrice.toFixed(2)}
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled/>
                        </div>

                        <div className='mt-8'>
                            <label htmlFor="equipmenetID" className="block text-gray-700 font-medium mb-2 text-center">Equipment</label>
                            <select
                                id="equipmentID"
                                value={selectedEquipment}
                                onChange={handleEquipmentChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Select an Equipment</option>
                                {equipment.map((eqp) => (
                                    <option key={eqp._id} value={eqp._id}>
                                        {eqp.equipmentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='mt-8'>
                            <label htmlFor="numEquipment" className="block text-gray-700 font-medium mb-2 text-center">Number of items</label>
                            <input
                            type="number"
                            id="numItems"
                            value={numItems}
                            onChange={handleNumItemsChange}
                            min="1"
                            placeholder="Enter Number of items"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div className='mt-8 mb-8'>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-center">Price (LKR)</label>
                            <input
                            type="number"
                            id="eqPrice"
                            value={eqPrice.toFixed(2)}
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled/>
                        </div>

                    </div>

                    <div className='mt-10 flex justify-end items-center x-2 text-lg'>
                        <label className="font-medium">Handling Fee (LKR)</label>
                        <input
                            type="text"
                            id="handleFee"
                            value={formatedHandleFee}
                            className="w-auto p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right"
                            disabled
                        />
                    </div>

                    <div className='pt-3 flex justify-end items-center x-2 text-lg'>
                        <label className="font-medium">5% vat (LKR)</label>
                        <input
                            type="text"
                            id="vat"
                            value={formatedVat}
                            className="w-auto p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right"
                            disabled
                        />
                    </div>

                    <div className='pt-3 flex justify-end items-center x-2 text-xl'>
                        <label className="font-medium">Total price (LKR)</label>
                        <input
                            type="text"
                            id="totalPrice"
                            value={formatedTotalPrice}
                            className="w-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right"
                            disabled
                        />
                    </div>


                    <div className="mt-10 flex justify-end">
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