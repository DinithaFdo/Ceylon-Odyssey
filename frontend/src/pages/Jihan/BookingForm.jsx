import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../components/userContext'; 

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  
  const bookingData = location.state?.data;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    numberOfPeople: 1,
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const handlingFee = 1000; 

  useEffect(() => {
    if (bookingData) {
      setFormData({
        fullName: bookingData.fullName || '',
        email: bookingData.email || '',
        phone: bookingData.phone || '',
        address: bookingData.address || '',
        numberOfPeople: 1, 
      });
      calculateTotalPrice(1, bookingData.packagePrice);
    }
  }, [bookingData]);

  const calculateTotalPrice = (numberOfPeople, packagePrice) => {
    const total = (packagePrice * numberOfPeople) + handlingFee;
    setTotalPrice(total);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (formData.numberOfPeople < 1) newErrors.numberOfPeople = 'At least one person is required';

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
      userId: user?._id, 
      totalPrice: totalPrice,
    };

    const apiCall = bookingData?._id
      ? axios.put(`http://localhost:5000/api/bookings/${bookingData._id}`, updatedBookingData)
      : axios.post('http://localhost:5000/api/bookings', updatedBookingData);

    apiCall
      .then((response) => {
        navigate('/confirmation', { state: { data: response.data } });
      })
      .catch((error) => {
        console.error('Error processing booking:', error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Booking Form for {bookingData?.packageName || 'Your Tour Package'}
      </h2>

      {['fullName', 'email', 'phone', 'address'].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
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
            calculateTotalPrice(value, bookingData?.packagePrice);
          }}
        />
        {errors.numberOfPeople && <p className="text-red-500 text-sm">{errors.numberOfPeople}</p>}
      </div>

      <p className="text-lg font-semibold text-gray-900">
        Total Price (including handling fee): Rs. {totalPrice}
      </p>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
