const Itinerary = require("../models/Itinerary");

// Create an itinerary
exports.createItinerary = async (req, res) => {
  const { title, description, startDate, endDate, locations } = req.body;

  // Handle photo uploads
  const photos = req.files
    ? req.files.map((file) => `/uploads/${file.filename}`)
    : [];

  try {
    const newItinerary = new Itinerary({
      title,
      description,
      startDate,
      endDate,
      locations: JSON.parse(locations).map((location, index) => ({
        ...location,
        photos: photos.slice(index * 10, (index + 1) * 10), // Assign photos to corresponding locations
      })),
      user: req.user.id,
    });

    const itinerary = await newItinerary.save();
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update an itinerary
exports.updateItinerary = async (req, res) => {
  const { title, description, startDate, endDate, locations } = req.body;

  // Handle photo uploads
  const photos = req.files
    ? req.files.map((file) => `/uploads/${file.filename}`)
    : [];

  try {
    let itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ msg: "Itinerary not found" });
    }

    // Check if user owns the itinerary
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Update itinerary
    itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          description,
          startDate,
          endDate,
          locations: JSON.parse(locations).map((location, index) => ({
            ...location,
            photos: photos.slice(index * 10, (index + 1) * 10), // Assign photos to corresponding locations
          })),
        },
      },
      { new: true }
    );

    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id });
    res.json(itineraries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get an itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ msg: "Itinerary not found" });
    }

    // Check if user owns the itinerary
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete an itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);

    if (!itinerary) {
      return res.status(404).json({ msg: "Itinerary not found" });
    }

    // Check if user owns the itinerary
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Itinerary.findByIdAndDelete(req.params.id);

    res.json({ msg: "Itinerary removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
