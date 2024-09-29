import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/landing/Home";
import About from "../pages/common/About";
import Contact from "../pages/common/Contact";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import TicketList from "../pages/ticket/TicketList"; // Import TicketList component
import AddTicket from "../pages/ticket/AddTicket"; // Import AddTicket component
import ViewTicket from "../pages/ticket/ViewTicket"; // Import ViewTicket component
import AllTickets from "../pages/ticket/AllTickets"; // Import AllTickets component
import EditTicketPage from "../pages/ticket/EditTicketPage"; // Import EditTicketPage component
import EditSupportTicketPage from "../pages/ticket/EditSupportTicketPage"; // Import EditSupportTicketPage component
import SupportAgentTicket from "../pages/ticket/SupportAgentTickets"; // Adjust the import path as necessary


function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/tickets" element={<AllTickets />} /> {/* Route for All Tickets */}
                <Route path="/tickets/add" element={<AddTicket />} /> {/* Route for Adding a Ticket */}
                <Route path="/tickets/:id" element={<ViewTicket />} /> {/* Route for Viewing a Specific Ticket */}
                <Route path="/tickets/edit/:ticketID" element={<EditTicketPage />} /> {/* Route for Editing a Ticket */}
                <Route path="/tickets/edit-support/:ticketID" element={<EditSupportTicketPage />} /> {/* Route for Editing a Support Ticket */}
                <Route path="/support-agent-tickets" element={<SupportAgentTicket />} /> 

            </Routes>
        </Router>
    );
}

export default AppRoutes;
