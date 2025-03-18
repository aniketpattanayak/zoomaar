import { Schema, model } from "mongoose";

const SellerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["seller"], default: "seller" },
}, { timestamps: true });

export default model("Seller", SellerSchema);
