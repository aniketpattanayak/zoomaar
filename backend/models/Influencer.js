import mongoose from "mongoose";

const InfluencerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["influencer"], default: "influencer" },
});

export default mongoose.model("Influencer", InfluencerSchema);
