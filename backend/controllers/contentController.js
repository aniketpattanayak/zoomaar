import Content from "../models/Content.js";

export const uploadContent = async (req, res) => {

  try {
    console.log("Received Data:", req.body);
console.log("Received Files:", req.files);

    const { title, description } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No media uploaded" });
    }

    // Store file paths relative to backend
    const media = req.files.map((file) => `/uploads/${file.filename}`);

    const newContent = new Content({ title, description, media });
    await newContent.save();

    res.status(201).json({ message: "Content uploaded successfully", content: newContent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error uploading content" });
  }
};


// Get all uploaded content
export const getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ createdAt: -1 });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: "Error fetching content" });
  }
};
