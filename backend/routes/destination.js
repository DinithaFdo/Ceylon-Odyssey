const router = require('express').Router();
const Destination = require('../models/destination');
const { body, validationResult } = require('express-validator');

// Add a new destination
router.post("/add", [
  // Validation rules
  body('destinationID')
    .matches(/^D\d{3}$/)
    .withMessage('Destination ID must be in the format Dxxx, where xxx is a 3-digit number.'),

  body('dTitle')
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters.'),

  body('dDescription')
    .isString()
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters.'),

  body('dThumbnail')
    .isString()
    .withMessage('Thumbnail must be a valid string.'),

  body('dExtImage')
    .isString()
    .withMessage('Extra Images must be a valid string.'),

  body('dDistrict')
    .notEmpty()
    .withMessage('District is required.'),

  body('dProvince')
    .notEmpty()
    .withMessage('Province is required.'),

  body('longitude')
    .isNumeric()
    .withMessage('Longitude must be a valid number.'),

  body('latitude')
    .isNumeric()
    .withMessage('Latitude must be a valid number.'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { destinationID, dTitle, dDescription, dThumbnail, dExtImage, dDistrict, dProvince, longitude, latitude } = req.body;

    const newDestination = new Destination({
      destinationID,
      dTitle,
      dDescription,
      dThumbnail,
      dExtImage,
      dDistrict,
      dProvince,
      longitude,
      latitude,
      clickCount: 0 // Initialize click count to 0
    });

    await newDestination.save();
    res.status(201).json("Destination added");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding destination" });
  }
});

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find().select('destinationID dTitle dDescription dThumbnail dExtImage dDistrict dProvince longitude latitude creationDate clickCount');
    res.status(200).json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching destinations" });
  }
});

// Update an existing destination
router.put("/update/:id", [
  // Validation rules
  body('dTitle')
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters.'),

  body('dDescription')
    .optional()
    .isString()
    .isLength({ min: 20, max: 500 })
    .withMessage('Description must be between 20 and 500 characters.'),

  body('dThumbnail')
    .optional()
    .isString()
    .withMessage('Thumbnail must be a valid string.'),

  body('dExtImage')
    .optional()
    .isString()
    .withMessage('Extra Images must be a valid string.'),

  body('dDistrict')
    .optional()
    .notEmpty()
    .withMessage('District is required.'),

  body('dProvince')
    .optional()
    .notEmpty()
    .withMessage('Province is required.'),

  body('longitude')
    .optional()
    .isNumeric()
    .withMessage('Longitude must be a valid number.'),

  body('latitude')
    .optional()
    .isNumeric()
    .withMessage('Latitude must be a valid number.'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const destinationID = req.params.id;
    const { dTitle, dDescription, dThumbnail, dExtImage, dDistrict, dProvince, longitude, latitude } = req.body;

    const updatedDestination = {
      dTitle,
      dDescription,
      dThumbnail,
      dExtImage,
      dDistrict,
      dProvince,
      longitude,
      latitude
      // creationDate should not be updated
    };

    const result = await Destination.findByIdAndUpdate(destinationID, updatedDestination, { new: true });
    if (!result) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ status: "Destination updated", destination: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating destination" });
  }
});

// Delete a destination
router.delete("/delete/:id", async (req, res) => {
  try {
    const destinationID = req.params.id;
    const result = await Destination.findByIdAndDelete(destinationID);
    if (!result) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ status: "Destination deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting destination" });
  }
});

// Get a specific destination
router.get("/get/:id", async (req, res) => {
  try {
    const destinationID = req.params.id;
    const destination = await Destination.findById(destinationID);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(200).json({ status: "Destination fetched", destination });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching destination" });
  }
});

// Route to handle incrementing the click count
router.put('/:id/click', async (req, res) => {
  try {
      const { id } = req.params;
      const destination = await Destination.findById(id);

      if (!destination) {
          return res.status(404).json({ message: 'Destination not found' });
      }

      // Increment the click count
      destination.clickCount = (destination.clickCount || 0) + 1;
      await destination.save();

      res.json({ message: 'Click count updated', clickCount: destination.clickCount });
  } catch (error) {
      res.status(500).json({ message: 'Error updating click count', error });
  }
});

module.exports = router;