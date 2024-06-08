const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
  photos: [{ type: String }],
  link: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const ItinerarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    locations: [LocationSchema],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", ItinerarySchema);
