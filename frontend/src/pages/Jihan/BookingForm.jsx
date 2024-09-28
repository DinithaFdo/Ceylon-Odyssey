import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const equipments = [
  { id: '1', name: 'Surfboard', price: 50 },
  { id: '2', name: 'Hiking Gear', price: 75 },
  { id: '3', name: 'City Guide', price: 30 },
];

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    equipment: [],
  });

  const [errors, setErrors] = useState({});
  const bookingData = location.state?.data;
  const [totalEquipmentPrice, setTotalEquipmentPrice] = useState(0);
  const { packageName, packagePrice } = bookingData || location.state;

  // Get today's date for validation
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (bookingData) {
      setFormData({
        fullName: bookingData.fullName,
        email: bookingData.email,
        phone: bookingData.phone,
        address: bookingData.address,
        date: bookingData.date.split('T')[0],
        equipment: bookingData.equipment,
      });
      setTotalEquipmentPrice(
        bookingData.equipment.reduce((acc, eq) => acc + eq.price, 0)
      );
    }
  }, [bookingData]);

  const handleCheckboxChange = (event, equipmentItem) => {
    const isChecked = event.target.checked;
    let updatedEquipment = [...formData.equipment];

    if (isChecked) {
      updatedEquipment.push(equipmentItem);
    } else {
      updatedEquipment = updatedEquipment.filter(
        (eq) => eq.id !== equipmentItem.id
      );
    }

    const equipmentPrice = updatedEquipment.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    setFormData({ ...formData, equipment: updatedEquipment });
    setTotalEquipmentPrice(equipmentPrice);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.phone && formData.phone.length !== 10)
      newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (new Date(formData.date) < new Date(today))
      newErrors.date = 'Please select a future date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const totalPrice = packagePrice + totalEquipmentPrice;
    const updatedBookingData = {
      ...formData,
      packageName: bookingData?.packageName || packageName,
      packagePrice: bookingData?.packagePrice || packagePrice,
      totalPrice,
    };

    if (bookingData?._id) {
      axios
        .put(`http://localhost:5000/api/bookings/${bookingData._id}`, updatedBookingData)
        .then((response) => {
          navigate('/confirmation', { state: { data: response.data } });
        })
        .catch((error) => {
          console.error('Error updating booking:', error);
        });
    } else {
      axios
        .post('http://localhost:5000/api/bookings', updatedBookingData)
        .then((response) => {
          navigate('/confirmation', { state: { data: response.data } });
        })
        .catch((error) => {
          console.error('Error creating booking:', error);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {bookingData
          ? `Edit Booking for ${bookingData.packageName}`
          : `Booking Form for ${packageName}`}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Full Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.phone}
          maxLength="10"
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
        <input
          type="text"
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={formData.date}
          min={today}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium mb-1 text-gray-700">Add Equipment:</h3>
        {equipments.map((equipment) => (
          <div key={equipment.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2 focus:ring-2 focus:ring-blue-600"
              checked={formData.equipment.some((eq) => eq.id === equipment.id)}
              onChange={(e) => handleCheckboxChange(e, equipment)}
            />
            <label className="text-gray-700">{`${equipment.name} - $${equipment.price}`}</label>
          </div>
        ))}
      </div>

      <p className="mb-4 text-gray-700">Total Equipment Price: Rs.{totalEquipmentPrice}</p>
      <p className="text-lg font-semibold text-gray-900">Total Price: Rs.{packagePrice + totalEquipmentPrice}</p>
      <p className="text-lg font-semibold text-gray-900">
  Total Price with VAT (5%): Rs.
  {((packagePrice + totalEquipmentPrice) * 1.05).toFixed(2)}
</p>

<br></br>
      

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
      >
        {bookingData ? 'Update Booking' : 'Submit Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
