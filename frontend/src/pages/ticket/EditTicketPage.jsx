import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

export default function EditTicketPage() {
    const { ticketID } = useParams(); // Get ticket ID from URL parameters
    const navigate = useNavigate();

    // State to hold ticket details
    const [ticket, setTicket] = useState({
        subject: '',
        description: '',
        email: '',
        date: '',
        ticketID: ''
    });

    // State for loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch ticket details by ID when component mounts
    const fetchTicketDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tickets/get/${ticketID}`);
            setTicket(response.data.ticket);  // Set ticket data to the response
            setLoading(false);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
            setError('Error fetching ticket details');
            setLoading(false);
        }
    };

    // Update state when input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value
        });
    };

    // Submit updated ticket details
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Submitting:', ticket); // Log the form data for debugging

        try {
            const response = await axios.put(`http://localhost:5000/tickets/update/${ticketID}`, ticket);
            console.log('Ticket updated successfully:', response.data);
            alert('Ticket updated successfully');
            navigate('/tickets'); // Redirect back to tickets list
        } catch (error) {
            console.error('Error updating ticket:', error);
            alert('Error updating ticket');
        }
    };

    // Fetch ticket details on component mount
    useEffect(() => {
        fetchTicketDetails();
    }, [ticketID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow pt-24 px-4 md:px-8 lg:px-16">
                <center><h1 className="text-2xl font-bold mb-4">Edit Ticket</h1></center>
                <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                    <form onSubmit={handleSubmit}>
                        {/* Non-editable Ticket ID */}
                        <div className="mb-4">
                            <label htmlFor="ticketID" className="block font-semibold">Ticket ID</label>
                            <input
                                type="text"
                                id="ticketID"
                                name="ticketID"
                                value={ticket.ticketID}  // Display the correct ticket ID
                                readOnly
                                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Subject field */}
                        <div className="mb-4">
                            <label htmlFor="subject" className="block font-semibold">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={ticket.subject}  // Display existing subject
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>

                        {/* Description field */}
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-semibold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={ticket.description}  // Display existing description
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>

                        {/* Email field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={ticket.email}  // Display existing email
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>

                        {/* Ticket Creation Date (Non-editable) */}
                        <div className="mb-4">
                            <label htmlFor="date" className="block font-semibold">Created On</label>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                value={new Date(ticket.date).toLocaleDateString()}  // Display formatted date
                                readOnly
                                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Submit button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"
                                onClick={() => navigate('/tickets')}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
