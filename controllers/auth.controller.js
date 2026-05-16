const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Register Error:", error); // <--- Tambahkan ini
    res.status(500).json({ message: "Registration failed", error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};

// GET /register – bisa untuk testing endpoint atau return HTML/form
exports.getRegister = (req, res) => {
  res.status(200).send("GET Register endpoint - for testing or rendering a form.");
};

// GET /login – bisa untuk testing endpoint atau return HTML/form
exports.getLogin = (req, res) => {
  res.status(200).send("GET Login endpoint - for testing or rendering a form.");
};

exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({
      id: admin._id,
      username: admin.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving admin", error });
  }
};

