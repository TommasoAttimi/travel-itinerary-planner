const express = require("express");
const { updateUser, deleteUser } = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.put("/", auth, updateUser);
router.delete("/", auth, deleteUser);

module.exports = router;
