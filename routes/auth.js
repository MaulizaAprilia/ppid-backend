const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { getAdminById } = require("../controllers/auth.controller");

// POST routes for API calls
router.post("/register", register);
router.post("/login", login);

// Optional: GET routes for testing or form rendering (if needed)
router.get("/register", (req, res) => {
    res.send("Register Page (GET) – You can use this route for rendering a form or testing.");
});

router.get("/login", (req, res) => {
    res.send("Login Page (GET) – You can use this route for rendering a form or testing.");
});

router.get("/admin/:id", getAdminById);

module.exports = router;
