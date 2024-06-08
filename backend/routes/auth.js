const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, getUser);

module.exports = router;
