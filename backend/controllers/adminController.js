import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin Signup
export const adminSignup = async (req, res) => {

   
  try {
    console.log("Received signup request:", req.body);

    // if (!name || !email || !password) {
    //     return res.status(400).json({ message: "All fields are required" });
    //   }
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });


    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // Create new admin
    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      token: generateToken(admin),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      token: generateToken(admin),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
