const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose'); 
const Ticket = require('../models/Ticket'); 

// Add a new ticket
router.post("/add", [
  // Validation rules
  body('subject')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Subject must be between 3 and 100 characters.'),
    
  body('description')
    .isString()
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters.'),
    
  body('priority')
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be either Low, Medium, or High.'),
    
  body('email')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
    
  body('solution')
    .optional()
    .isString()
    .withMessage('Solution must be a valid string if provided.'),
    
  body('isComplete')
    .optional()
    .isBoolean()
    .withMessage('isComplete must be a boolean value.')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { subject, description, priority, email, solution, isComplete } = req.body;

    const newTicket = new Ticket({
      subject,
      description,
      priority,
      email,
      date: new Date(), // Automatically set to current date
      solution,
      isComplete
    });

    await newTicket.save();
    
    res.status(201).json({
      message: "Ticket added successfully",
      ticket: newTicket
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding ticket" });
  }
});

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching tickets" });
  }
});

// Get a specific ticket
router.get("/get/:id", async (req, res) => {
  try {
    const ticketID = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(ticketID)) {
      return res.status(400).json({ error: "Invalid ticket ID format" });
    }

    const ticket = await Ticket.findById(ticketID);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ status: "Ticket fetched successfully", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching ticket" });
  }
});

// Update an existing ticket
router.put("/update/:id", async (req, res) => {
  try {
    const ticketID = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(ticketID)) {
      return res.status(400).json({ error: "Invalid ticket ID format" });
    }

    const { subject, description, priority, email, solution, isComplete } = req.body;

    // Prepare the update object
    const updatedTicket = {
      subject,
      description,
      priority,
      email, 
      date: new Date(),
      solution,
      isComplete
    };

    const result = await Ticket.findByIdAndUpdate(ticketID, updatedTicket, { new: true });
    if (!result) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ status: "Ticket updated successfully", ticket: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating ticket" });
  }
});

// Delete a ticket
router.delete("/delete/:id", async (req, res) => {
  try {
    const ticketID = req.params.id;

    // Validate if the provided ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(ticketID)) {
      return res.status(400).json({ error: "Invalid ticket ID format" });
    }

    const result = await Ticket.findByIdAndDelete(ticketID);
    if (!result) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ status: "Ticket deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting ticket" });
  }
});

module.exports = router;
