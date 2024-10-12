/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/userContext'; 
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import toast from 'react-hot-toast'
const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Get id from the URL
  const _id = location.pathname.split('/').pop();

  const bookingData = location.state?.data;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    numberOfPeople: 1,
    selectedEquipment: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipmentPrice, setSelectedEquipmentPrice] = useState(0); 
  const handlingFee = 1000; 

  useEffect(() => {
    if (bookingData) {
      setFormData({
        fullName: bookingData.fullName || '',
        email: bookingData.email || '',
        phone: bookingData.phone || '',
        address: bookingData.address || '',
        numberOfPeople: 1, 
        selectedEquipment: bookingData.selectedEquipment || '',
        date: '',
      });
      calculateTotalPrice(1, bookingData.packagePrice);
    }

    // Fetch the equipment list from the backend
    axios.get('http://localhost:5000/equipment/')
      .then(response => {
        setEquipmentList(response.data);
      })
      .catch(error => {
        console.error('Error fetching equipment list:', error);
      });

  }, [bookingData]);

  const calculateTotalPrice = (numberOfPeople, packagePrice = 0, equipmentPrice = 0) => {
    const total = ((packagePrice * numberOfPeople) + handlingFee + equipmentPrice) * 1.05;
    setTotalPrice(total);
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(formData.date);

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.phone && formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (formData.numberOfPeople < 1) newErrors.numberOfPeople = 'At least one person is required';
    if (!formData.selectedEquipment) newErrors.selectedEquipment = 'Please select equipment';

    // Validate date is in the future
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else if (selectedDate <= currentDate.setHours(0, 0, 0, 0)) {
      newErrors.date = 'Please select a future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedBookingData = {
      ...formData,
      packageName: bookingData?.packageName,
      packagePrice: bookingData?.packagePrice,
      userId: user.userId,
      totalPrice: totalPrice,
    };

    const apiCall = bookingData?._id
  ? axios.put(`http://localhost:5000/api/bookings/${bookingData._id}`, updatedBookingData)
  : axios.post(`http://localhost:5000/api/bookings`, updatedBookingData);

apiCall
  .then(() => {
    const message = bookingData?._id ? "Booking Updated Successfully" : "Booking Placed Successfully";
    toast.success(message);
  })
  .catch((error) => {
    toast.error("An error occurred: " + error.message);
  });


    apiCall
      .then((response) => {
        navigate('/confirmation', { state: { data: response.data } });
      })
      .catch((error) => {
        console.error('Error processing booking:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="mt-6 md:mt-10 md:mx-10 pt-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Booking Form for {bookingData?.packageName || 'Your Tour Package'}
          </h2>

          {['fullName', 'email', 'phone', 'address'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Number of People</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.numberOfPeople}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value, 10)); // Ensure at least 1 person
                setFormData({ ...formData, numberOfPeople: value });
                calculateTotalPrice(value, bookingData?.packagePrice, selectedEquipmentPrice);
              }}
            />
            {errors.numberOfPeople && <p className="text-red-500 text-sm">{errors.numberOfPeople}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Select Equipment</label>
            <select
              className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={(e) => {
                const selectedEquipmentId = e.target.value;
                const selectedEquipment = equipmentList.find(equipment => equipment._id === selectedEquipmentId);
                const equipmentPrice = selectedEquipment ? selectedEquipment.equipmentPrice : 0;

                setFormData({ ...formData, selectedEquipment: selectedEquipmentId });
                setSelectedEquipmentPrice(equipmentPrice);
                calculateTotalPrice(formData.numberOfPeople, bookingData?.packagePrice, equipmentPrice);
              }}
            >
              <option value="">Select equipment</option>
              {equipmentList.map((equipment) => (
                <option key={equipment._id} value={equipment._id}>
                  {equipment.equipmentName}
                </option>
              ))}
            </select>
            {errors.selectedEquipment && <p className="text-red-500 text-sm">{errors.selectedEquipment}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Selected Equipment Price</label>
            <input
              type="text"
              className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={selectedEquipmentPrice}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Select Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <p className="text-lg font-semibold text-gray-900">
            Total Price (including handling fee & VAT): Rs. {totalPrice.toFixed(2)}
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit Booking
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingForm;
