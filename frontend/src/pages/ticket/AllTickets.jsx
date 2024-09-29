import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import * as XLSX from 'xlsx';

export default function AllTickets() {
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch all tickets
    const fetchTickets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/tickets/');
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    // Delete ticket
    const deleteTicket = async (ticketID) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            try {
                await axios.delete(`http://localhost:5000/tickets/delete/${ticketID}`);
                setTickets(tickets.filter(ticket => ticket._id !== ticketID));
            } catch (error) {
                console.error('Error deleting ticket:', error);
            }
        }
    };

    // Edit ticket
    const editTicket = (ticketID) => {
        navigate(`/tickets/edit/${ticketID}`);
    };

    // Add new ticket
    const addNewTicket = () => {
        navigate('/tickets/add');
    };

    // Generate report
    const generateReport = () => {
        const wb = XLSX.utils.book_new();
        const wsData = tickets.map(ticket => ({
            TicketID: `TIC${ticket.ticketID.toString().padStart(4, '0')}`,
            Subject: ticket.subject,
            Description: ticket.description,
            Email: ticket.email,  // Add email field to report
            Status: ticket.isComplete ? 'Complete' : 'Incomplete',
            CreatedOn: new Date(ticket.date).toLocaleDateString(),
            Solution: ticket.solution || 'Pending',
        }));
        const ws = XLSX.utils.json_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Tickets');
        XLSX.writeFile(wb, 'tickets_report.xlsx');
    };

    // Fetch tickets when the component loads
    useEffect(() => {
        fetchTickets();
        const interval = setInterval(() => {
            fetchTickets();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Filter tickets based on search term
    const filteredTickets = tickets.filter(ticket =>
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchTerm.toLowerCase())  // Add email to filtering
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <br/><br/>

            <main className="flex-grow pt-16 px-4 md:px-8 lg:px-16">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <center><h1 className="text-2xl font-bold mb-4">All Tickets</h1></center>

                    {/* Search input */}
                    <input 
                        type="text"
                        placeholder="Search by Subject, Description, or Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 px-4 py-2 border rounded-full w-full md:w-1/2"
                    />

                    {/* Add new ticket button */}
                    <div className="flex space-x-4 mb-4">
                        <button 
                            onClick={addNewTicket}
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                        >
                            Create Ticket
                        </button>

                        {/* Generate Report button */}
                        <button 
                            onClick={generateReport}
                            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300"
                        >
                            Generate Report
                        </button>
                    </div>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Ticket ID</th>
                                <th scope="col" className="px-6 py-3">Subject</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Email</th>  {/* Add Email header */}
                                <th scope="col" className="px-6 py-3">Created On</th>
                                <th scope="col" className="px-6 py-3">Solution</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map(ticket => (
                                <tr key={ticket._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.ticketID.toString().padStart(4, '0')}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.subject}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.description}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.email}  {/* Display Email */}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.isComplete ? 'Complete' : 'Incomplete'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {new Date(ticket.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {ticket.solution || 'Pending'}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => editTicket(ticket._id)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => deleteTicket(ticket._id)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <br/><br/>

            <Footer />
        </div>
    );
}
