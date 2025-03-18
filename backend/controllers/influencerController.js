import Influencer from "../models/Influencer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Generate JWT Token
const generateToken = (newInfluencer) => {
  return jwt.sign({ id: newInfluencer._id, role: newInfluencer.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Influencer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newInfluencer = new Influencer({ name, email, password: hashedPassword });

    await newInfluencer.save();

    console.log("signup successful");
    res.status(201).json({
        message: "influencer registered successfully",
        token: generateToken(newInfluencer),
        influencer: { id: newInfluencer._id, name: newInfluencer.name, email: newInfluencer.email, role: newInfluencer.role },
      });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const influencer = await Influencer.findOne({ email });

    if (!influencer || !(await bcrypt.compare(password, influencer.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //const token = jwt.sign({ id: influencer._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({  token: generateToken(influencer), message: "Login successful!" });

    console.log("login successful");
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getDashboard = (req, res) => {
  res.json({ message: "Welcome to the influencer dashboard!" });
};
