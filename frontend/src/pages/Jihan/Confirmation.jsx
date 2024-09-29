import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const bookingData = location.state?.data;

  console.log(bookingData);

  // Redirect if booking data is missing
  useEffect(() => {
    if (!bookingData || !bookingData._id) {
      navigate('/package');
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handleDelete = () => {
    if (!bookingData._id) {
      setErrorMessage('Booking data is missing.');
      return;
    }
    axios.delete(`http://localhost:5000/api/bookings/${bookingData._id}`)
      .then(() => {
        navigate('/package');
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Error deleting the booking. Please try again.');
      });
  };

  const handleEdit = () => {
    if (!bookingData._id) {
      setErrorMessage('Booking data is missing.');
      return;
    }
    navigate(`/book/${bookingData._id}`, { state: { data: bookingData } });
  };

 

const handlePayNow = () => {
    if (!bookingData._id) {
        setErrorMessage('Booking data is missing.');
        return;
    }

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Set the title of the PDF
    doc.setFontSize(20);
    doc.text('Booking Receipt', 14, 22);

    // Optional: Add an image (logo)
    // const imgData = 'data:image/png;base64,...'; // Your image in base64 format
    // doc.addImage(imgData, 'PNG', 15, 40, 50, 50); // Adjust the position and size as needed

    // Set font size for details
    doc.setFontSize(12);
    const details = [
        { title: 'Full Name', value: bookingData.fullName },
        { title: 'Email', value: bookingData.email },
        { title: 'Phone', value: bookingData.phone },
        { title: 'Address', value: bookingData.address },
        { title: 'Date', value: new Date(bookingData.date).toLocaleDateString() },
        { title: 'Equipment', value: bookingData.equipment.map(eq => eq.name).join(', ') },
        { title: 'Package', value: bookingData.packageName },
        { title: 'Total Price', value: `$${bookingData.totalPrice}` },
    ];

    // Create a table for the details
    const tableColumn = ["Item", "Details"];
    const tableRows = details.map(item => [item.title, item.value]);

    doc.autoTable(tableColumn, tableRows, {
        startY: 40,
        theme: 'grid',
        styles: { cellPadding: 5, fontSize: 12 },
        headStyles: {
            fillColor: '#1D4ED8',
            textColor: '#FFFFFF',
            fontSize: 14,
            fontStyle: 'bold',
        },
        bodyStyles: {
            fillColor: '#F3F4F6',
            textColor: '#333333',
        }
    });

    // Save the PDF
    doc.save(`${bookingData.fullName}_receipt.pdf`);
};


  return (
    <div className="font-inter mt-12 p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-2xl mx-auto bg-white">
      <Typography variant="h4" gutterBottom className="font-semibold text-3xl text-gray-800 text-center">
        Booking Confirmation
      </Typography>

      <table className="min-w-full table-auto mt-6 text-left">
        <tbody>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Full Name</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.fullName}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Email</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.email}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Phone</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.phone}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Address</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.address}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Date</th>
            <td className="py-2 px-4 text-gray-600">{new Date(bookingData.date).toLocaleDateString()}</td>
          </tr>
          <tr>
              <th className="py-2 px-4 text-gray-800 font-medium">Equipment</th>
              <td className="py-2 px-4 text-gray-600">
                  {bookingData.equipment && bookingData.equipment.length > 0 ? (
                      bookingData.equipment.map(eq => `${eq.equipmentName} ($${eq.equipmentPrice.toFixed(2)})`).join(', ')
                  ) : (
                      'No equipment selected'
                  )}
              </td>
          </tr>

          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Package</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.packageName}</td>
          </tr>
          <tr>
            <th className="py-2 px-4 text-gray-800 font-medium">Total Price (LKR)</th>
            <td className="py-2 px-4 text-gray-600">{bookingData.totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      <div className="flex justify-center flex-wrap gap-4 mt-8">
      <Button
  onClick={handleEdit}
  sx={{
    backgroundColor: '#1D4ED8', // Blue 600 from Tailwind
    color: '#fff',
    fontWeight: '500',
    padding: '8px 24px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#1E40AF', // Hover effect
    },
  }}
>
  Edit Booking
</Button>

<Button
  onClick={() => setOpenDialog(true)}
  sx={{
    backgroundColor: '#DC2626', // Red 600 from Tailwind
    color: '#fff',
    fontWeight: '500',
    padding: '8px 24px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#EF4444', // Hover effect
    },
  }}
>
  Delete Booking
</Button>
<Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this booking?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once deleted, you will not be able to recover this booking.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} className="text-gray-600">
              No
            </Button>
            <Button onClick={handleDelete} className="text-red-600">
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

<Button
  onClick={handlePayNow}
  sx={{
    backgroundColor: '#16A34A', // Green 600 from Tailwind
    color: '#fff',
    fontWeight: '500',
    padding: '8px 24px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#22C55E', // Hover effect
    },
  }}
>
  Pay Now (Generate Receipt)
</Button>

<Button
  onClick={() => navigate('/package')}
  sx={{
    backgroundColor: '#1E3A8A', // Gray 600 from Tailwind
    color: '#fff',
    fontWeight: '500',
    padding: '8px 24px',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#4B5563', // Hover effect
    },
  }}
>
  Back to Home
</Button>

      </div>
    </div>
  );
};

export default Confirmation;
