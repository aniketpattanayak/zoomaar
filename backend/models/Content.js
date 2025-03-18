// import mongoose from "mongoose";

// const contentSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   media: { type: [String], required: true }, // Array to store media file paths
//   createdAt: { type: Date, default: Date.now },
// });

// const Content = mongoose.model("Content", contentSchema);
// export default Content;


import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: [String], required: true }, // Array of file paths (image/video URLs)
  createdAt: { type: Date, default: Date.now },
});

// Middleware to validate either 1 video OR up to 10 images
contentSchema.pre("save", function (next) {
  const images = this.media.filter((m) => m.endsWith(".jpg") || m.endsWith(".png") || m.endsWith(".jpeg"));
  const videos = this.media.filter((m) => m.endsWith(".mp4") || m.endsWith(".mov") || m.endsWith(".avi"));

  if (videos.length > 1 || (videos.length === 1 && images.length > 0) || images.length > 10) {
    return next(new Error("You can upload either 1 video OR up to 10 images."));
  }
  next();
});

const Content = mongoose.model("Content", contentSchema);
export default Content;
