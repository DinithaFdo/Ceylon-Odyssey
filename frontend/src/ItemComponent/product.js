import { useState } from "react";
import axios from "axios";
import './additem.css';
import { useNavigate } from 'react-router-dom';

function Product() {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        ticketId: "",
        subject: "",
        description: "",
        priority: "",
        date: "",
    });

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        
        // Validate Ticket ID
        if (!order.ticketId) newErrors.ticketId = "Ticket ID is required.";
        
        // Validate Subject
        if (!order.subject) newErrors.subject = "Subject is required.";
        
        // Validate Description
        if (!order.description) newErrors.description = "Description is required.";
        
        // Validate Priority
        if (!order.priority) newErrors.priority = "Priority is required.";

        // Validate Date
        if (!order.date) {
            newErrors.date = "Date is required.";
        } else {
            const selectedDate = new Date(order.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only the date part
            
            if (selectedDate < today) {
                newErrors.date = "Date cannot be in the past.";
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8020/item_create", order);
            console.log(response.data);
      
            alert("Ticket booked successfully!");
            setOrder({
                ticketId: "",
                subject: "",
                description: "",
                priority: "",
                date: "",
            });
            setErrors({});
            navigate("/itemdetails");
        } catch (error) {
            console.error("There was an error booking the ticket:", error);
        }
    };

    return (
        <div className="add-product">
            <h2>Ticket Booking</h2>
            <form onSubmit={handleSubmit} id="ticket-form">
                <label>Ticket ID:</label>
                <input
                    type="text"
                    id="ticketId"
                    name="ticketId"
                    value={order.ticketId}
                    onChange={handleOnChange}
                />
                {errors.ticketId && <span className="error">{errors.ticketId}</span>}
                <br />

                <label>Subject:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={order.subject}
                    onChange={handleOnChange}
                />
                {errors.subject && <span className="error">{errors.subject}</span>}
                <br />

                <label>Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={order.description}
                    onChange={handleOnChange}
                />
                {errors.description && <span className="error">{errors.description}</span>}
                <br />

                <label>Priority:</label>
                <select
                    id="priority"
                    name="priority"
                    value={order.priority}
                    onChange={handleOnChange}>
                    <option value="">Select Priority</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                {errors.priority && <span className="error">{errors.priority}</span>}
                <br />

                <label>Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={order.date}
                    onChange={handleOnChange}
                />
                {errors.date && <span className="error">{errors.date}</span>}
                <br />

                <button type="submit">Submit</button>
            </form>
            <br />
        </div>
    );
}

export default Product;
