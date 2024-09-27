import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import Navbar from '../../components/Navbar/Navbar';
import AddIcon from '../../assets/Ishan/add-button.png';
import removeIcon from '../../assets/Ishan/removeBtnImg.png';
import {imgData} from './PdfImg'

const QuotationForm = () => {

    const [tourPackages, setTourPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [basePrice, setBasePrice] = useState("");
    const [numPeople, setNumPeople] = useState(1);

    const [equipment, setEquipment] = useState([]);
    const [equipmentList, setEquipmentList] = useState([
        { selectedEquipment: "", numItems: 1, eqPrice: 0, baseEqPrice: "" }
    ]);

    const handleFee = 1000;
    const totalEquipmentPrice = equipmentList.reduce((total, item) => total + item.eqPrice, 0);
    const vat = ((parseFloat(pPrice) + totalEquipmentPrice + handleFee) * 0.05);
    const totalPrice = pPrice + totalEquipmentPrice + handleFee + vat;
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

    const handleEquipmentChange = (index, e) => {
        const updatedList = [...equipmentList];
        const selectedEqID = e.target.value;
        updatedList[index].selectedEquipment = selectedEqID;
      
        const selectedEq = equipment.find((eq) => eq._id === selectedEqID);
        
        if (selectedEq) {
          updatedList[index].eqPrice = selectedEq.equipmentPrice * updatedList[index].numItems;
          updatedList[index].baseEqPrice = selectedEq.equipmentPrice;
        } else {
          updatedList[index].eqPrice = 0;
          updatedList[index].baseEqPrice = "";
        }
      
        setEquipmentList(updatedList);
      };
      
    const handleNumItemsChange = (index, e) => {
        const updatedList = [...equipmentList];
        const itemCount = e.target.value;
        updatedList[index].numItems = itemCount;
        
        if (updatedList[index].baseEqPrice) {
            updatedList[index].eqPrice = updatedList[index].baseEqPrice * itemCount;
        }
        
        setEquipmentList(updatedList);
    };

    const addEquipmentRow = () => {
        setEquipmentList([
            ...equipmentList,
            { selectedEquipment: "", numItems: 1, eqPrice: 0, baseEqPrice: "" }
        ]);
    };

    const removeEquipmentRow = (index) => {
        const updatedList = equipmentList.filter((_, idx) => idx !== index);
        setEquipmentList(updatedList);
    };

      
    const generatePdf = async () => {
        const doc = new jsPDF();
    
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        const imgWidth = 156;
        const imgHeight = 46;
        const xPos = (pageWidth - imgWidth) / 2;
        const yPos = (pageHeight - imgHeight) / 2;
        doc.setGState(new doc.GState({ opacity: 0.3 }));
        doc.addImage(imgData, 'png', xPos, yPos, imgWidth, imgHeight);

        doc.setGState(new doc.GState({ opacity: 1.0 })); // Reset opacity
        
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
        doc.setFontSize(30);
        doc.text('Quotation', pageWidth / 2, 25, { align: 'center' });
        
        doc.setFontSize(15);
        doc.text("Package Name", 25, 50);
        doc.text("Number of People", 95, 50);
        doc.text("Price (LKR) ", 170, 50);
        doc.line(23, 52, 198, 52);

    
        const packageName = tourPackages.find(pkg => pkg._id === selectedPackage)?.package_Title || 'No packages';
        const wrappedPackageName = doc.splitTextToSize(packageName, 70);

        doc.setFontSize(12);
        doc.text(wrappedPackageName, 20, 60);
        doc.text(`${numPeople}`, 100, 60);
        doc.text(`${pPrice.toFixed(2)}`, 173, 60); 
        
        let equipmentYPos = 100;
        doc.setFontSize(15);
        doc.text("Equipment Name", 25, equipmentYPos);
        doc.text("Number of Items", 95, equipmentYPos);
        doc.text("Price (LKR)", 170, equipmentYPos);
        doc.line(23, 102, 198, 102);

        equipmentList.forEach((equipmentItem, index) => {
            const eqName = equipment.find(eq => eq._id === equipmentItem.selectedEquipment)?.equipmentName || 'No Items';
            equipmentYPos += 10;
            doc.setFontSize(12);
            doc.text(eqName, 20, equipmentYPos);
            doc.text(`${equipmentItem.numItems ? equipmentItem.numItems : 'No Items'}`, 100, equipmentYPos);
            doc.text(`${equipmentItem.eqPrice.toFixed(2)}`, 173, equipmentYPos);
        });

        let pricingYPos = equipmentYPos + 30;

        doc.setFontSize(13);
        doc.text("Handling Fee (LKR):", 120, pricingYPos);
        doc.text(`${handleFee.toFixed(2)}`, 173, pricingYPos);
        
        pricingYPos += 10;
        doc.text("5% VAT (LKR):", 120, pricingYPos);
        doc.text(`${vat.toFixed(2)}`, 173, pricingYPos);
        
        pricingYPos += 20;
        doc.setFontSize(15);
        doc.text("Total Price (LKR):", 120, pricingYPos);
        doc.text(`${totalPrice.toFixed(2)}`, 170, pricingYPos);

        doc.setFontSize(12);
        doc.text("Note: The prices mentioned in this quotation are subject to change without prior notice due to", 15, pageHeight - 40);
        doc.text("fluctuations in market conditions, availability, or other unforeseen circumstances. Please confirm", 15, pageHeight - 33);
        doc.text("the prices before proceeding with the booking.", 15, pageHeight - 26);

        doc.save('quotation.pdf');
        
    }

    return (
        <div className="container mx-auto pl-10 pr-10 bg-gray-100 min-h-screen">

            <div className="pb-5">
                <Navbar />
            </div>

            <div className="container mx-auto p-24 pb-20">
                <form className="bg-white shadow-md rounded-lg p-8"
                    onSubmit={(e) =>
                    {
                        e.preventDefault();
                        generatePdf();
                    }} >

                    <h2 className="text-3xl font-semibold mb-6 text-center pb-10">Get a Quotation</h2>
                    
                    {/*Package Section*/}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                        {/*Package Name*/}
                        <div>
                            <label htmlFor="packageId" className="block text-gray-700 font-medium mb-2 text-center ">Package Name</label>
                            <select
                                id="packageId"
                                value={selectedPackage}
                                onChange={handePackageChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required >
                                <option value="">Select a Package</option>
                                {tourPackages.map((pkg) => (
                                    <option key={pkg._id} value={pkg._id}>
                                        {pkg.package_Title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/*Number of people*/}
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
                            
                        {/*Package Price*/}
                        <div>
                            <label htmlFor="price" className="block text-gray-700 font-medium mb-2 text-center">Price (LKR)</label>
                            <input
                            type="number"
                            id="pckPrice"
                            value={pPrice.toFixed(2)}
                            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled/>
                        </div>
                    
                    </div>

                    {/*Equipmenet Section*/}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 mt-8">
                        <div className='flex items-center justify-between mt-4'>
                            
                            {/* Add more Equipment button */}
                            <button 
                                type="button" 
                                onClick={() => addEquipmentRow()} 
                                className="ml-2">
                                <img src={AddIcon} alt="add" className="h-10 w-10" />
                            </button>
                            <label className="flex-grow text-gray-700 font-medium text-center">Equipment</label>
                        </div>

                        {/* Number of items */}
                        <div className='flex items-center justify-center mt-4'>
                            <label className="block text-gray-700 font-medium">Number of items</label>
                        </div>

                        {/* Equipment Price */}
                        <div className='flex items-center justify-center mt-4'>
                            <label className="block text-gray-700 font-medium">Price (LKR)</label>
                        </div>
                    </div>


                    {equipmentList.map((equipmentItem, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        {/*Equipment Name*/}
                        <div className='mt-4'>
                            <select
                                id={`eq-${index}`}
                                value={equipmentItem.selectedEquipment}
                                onChange={(e) => handleEquipmentChange(index, e)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
                                <option value="">Select an Equipment</option>
                                {equipment.map((eqp) => (
                                <option key={eqp._id} value={eqp._id}>
                                    {eqp.equipmentName}
                                </option>
                                ))}
                            </select>
                        </div>
                        
                        {/*Number of Equipment items*/}
                        <div className='mt-4'>
                            <input
                                type="number"
                                id={`eqItems-${index}`}
                                value={equipmentItem.numItems}
                                onChange={(e) => handleNumItemsChange(index, e)}
                                min="1"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>
                            
                        {/*Equipment Price*/}
                        <div className='mt-4 flex justify-between items-center'>
                            <input
                                type="number"
                                id={`eqPrice-${index}`}
                                value={equipmentItem.eqPrice.toFixed(2)}
                                className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled />
                            
                            {/*Remove more Equipmenet button*/}
                            <button 
                                type="button" 
                                onClick={() => removeEquipmentRow(index)} 
                                className="ml-2">
                                <img src={removeIcon} alt="remove" className="h-10 w-11" />
                            </button>
                        </div>

                    </div>
                    ))}

                    <div className='mt-10 flex justify-end items-center x-2 text-lg'>
                        <label className="font-medium">Handling Fee (LKR)</label>
                        <input
                            type="number"
                            id="handleFee"
                            value={formatedHandleFee}
                            className="w-auto p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled />
                    </div>

                    <div className='pt-3 flex justify-end items-center x-2 text-lg'>
                        <label className="font-medium">5% vat (LKR)</label>
                        <input
                            type="number"
                            id="vat"
                            value={formatedVat}
                            className="w-auto p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right" disabled />
                    </div>

                    <div className='pt-3 flex justify-end items-center x-2 text-xl pb-8'>
                        <label className="font-medium">Total price (LKR)</label>
                        <input
                            type="number"
                            id="totalPrice"
                            value={formatedTotalPrice}
                            className="w-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-none text-right pr-2" disabled />
                    </div>

                    {/*Download button*/}
                    <div className="mt-10 flex justify-end pb-5">
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
export default QuotationForm;