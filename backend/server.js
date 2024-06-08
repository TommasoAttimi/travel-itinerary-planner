const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("API is running..."));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/itineraries", require("./routes/itineraries"));
app.use("/api/users", require("./routes/users"));
