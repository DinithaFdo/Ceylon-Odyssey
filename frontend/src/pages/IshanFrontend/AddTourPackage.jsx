import React, { useState } from 'react';
function AddTourPackage() {

    const [packageId, setPackageId] = useState("");
    const [package_Title, setPackage_Title] = useState("");
    const [pCreateDate, setPCreateDate] = useState("");
    const [packageDes, setPackageDes] = useState("");
    const [pCategory, setPCategory] = useState("");
    const [pImage, setPImage] = useState("null");
    const [packagePrice, setPackagePrice] = useState("");
    const [pDestination, setPDestination] = useState("");
    const [pDays, setPDays] = useState("");

    function addPackage(e){
        e.preventDefault();
        alert("Package Added Successfully");

        const newPackage = {
            packageId,
            package_Title,
            pCreateDate,
            packageDes,
            pCategory,
            pImage,
            packagePrice,
            pDestination,
            pDays
        }
        console.log(newPackage);
    }


    return (
        <form onSubmit={addPackage} className="max-w-lg mx-auto border border-gray-300 p-4 rounded-lg">
            <h1 className="text-3xl font-bold mb-7 text-gray-800">Add New Tour Package</h1>

            <div className="mb-8">
                <label htmlFor="packageId" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Package ID</label>
                <input type="text" id="packageId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPackageId(e.target.value);
                }} required />
            </div>

            <div className="mb-8">
                <label htmlFor="package_Title" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Package Title</label>
                <input type="text" id="package_Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPackage_Title(e.target.value);
                }} required />
            </div>

            <div className="mb-8">
                <label htmlFor="pCreateDate" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Creation Date</label>
                <input type="date" id="pCreateDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPCreateDate(e.target.value);
                }} required />
            </div> 

            <div className="mb-8">
                <label htmlFor="packageDes" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Package Description</label>
                <textarea id="packageDes" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write package Description" 
                onChange={(e) => {
                    setPackageDes(e.target.value);
                }} required></textarea>
            </div>

            <div className="mb-8">
                <label htmlFor="pCategory" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Select Package Category</label>
                <select id="pCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPCategory(e.target.value);
                }} required>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Wildlife and Nature Tours">Wildlife and Nature Tours</option>
                </select>
            </div>

            <div className="mb-8">
                <label className="block mb-2 text-l font-medium text-gray-900 dark:text-white" htmlFor="pImage">Upload Image</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" aria-describedby="user_avatar_help" id="pImage" type="file" 
                onChange={(e) => {
                    setPImage(e.target.files[0]);
                }} required/>
            </div>

            <div className="mb-8">
                <label htmlFor="packagePrice" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Package Price</label>
                <input type="number" id="packagePrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPackagePrice(parseFloat(e.target.value));
                }} required />
            </div>

            <div className="mb-8">
                <label htmlFor="pDestination" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Destinations</label>
                <input type="text" id="pDestination" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPDestination(e.target.value);
                }} required />
            </div>
            
            <div className="mb-8">
                <label htmlFor="pDays" className="block mb-2 text-l font-medium text-gray-900 dark:text-white">Number Of Days</label>
                <input type="number" id="pDays" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                onChange={(e) => {
                    setPDays(parseFloat(e.target.value));
                }} required />
            </div>

            <div className="flex items-start mb-8">
                <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 ml-2">I confirm that the tour package details are accurate</label>
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

  )
}

export default AddTourPackage;