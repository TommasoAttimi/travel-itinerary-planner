const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  createItinerary,
  updateItinerary,
  getAllItineraries,
  getItineraryById,
  deleteItinerary,
} = require("../controllers/itineraryController");

router.post("/", auth, upload.array("photos", 10), createItinerary);
router.put("/:id", auth, upload.array("photos", 10), updateItinerary);
router.get("/", auth, getAllItineraries);
router.get("/:id", auth, getItineraryById);
router.delete("/:id", auth, deleteItinerary);

module.exports = router;
