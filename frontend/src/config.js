const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
};
