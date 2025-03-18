import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";




export const generateToken = (seller) => {
  return jwt.sign(
    { id: seller._id, role: seller.role }, // ✅ Include `id` inside the token payload
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

//const JWT_SECRET = process.env.JWT_SECRET; // Use environment variables


// 🟢 Seller Signup
export const signupSeller = async (req, res) => {
  try {

    console.log("request body",req.body);
    const { name, email, password } = req.body;
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) return res.status(400).json({ message: "Seller already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = new Seller({ name, email, password: hashedPassword });
    await newSeller.save();

    res.status(201).json({ 
        message: "Seller registered successfully",
        token: generateToken(newSeller),
        id: newSeller._id, 
        name: newSeller.name, 
        email: newSeller.email, 
        role: newSeller.role // ✅ Directly include role at the top level
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Seller Login
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller) return res.status(400).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    //const token = jwt.sign({ id: seller._id, role: "seller" }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ 
        message: "Seller registered successfully",
        token: generateToken(seller),
        id: seller._id, 
        name: seller.name, 
        email: seller.email, 
        role: seller.role // ✅ Directly include role at the top level
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Get Seller Profile
export const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller.id).select("-password");

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    res.status(200).json(seller);
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};
