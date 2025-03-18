// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config';
// import connectDB from './config/mongodb.js';
// import connectCloudinary from './config/cloudinary.js';
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRoute.js';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import contentRouter from './routes/contentRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
// import influencerRoutes from './routes/influencerRoutes.js';
// import sellerRoutes from './routes/sellerRoutes.js';
// import cookieParser from 'cookie-parser';
// import fs from 'fs';
// import path from 'path';
// import http from 'http';
// import { Server } from 'socket.io';

// // App Config
// const app = express();
// const port = process.env.PORT || 4000;
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175","http://localhost:5176"],
//     credentials: true,
//   },
// });

// // Connect to DB and Cloudinary
// connectDB();
// connectCloudinary();

// // Ensure the uploads directory exists
// const uploadDir = path.join("uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Allowed frontend origins
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175","http://localhost:5176"];

// // Set up CORS middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "token"],
//   })
// );
// app.options("*", cors());

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(uploadDir));

// // API Endpoints
// app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/content", contentRouter);
// app.use("/api/influencer", influencerRoutes);
// app.use("/api/seller", sellerRoutes);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // WebSocket Setup for Live Streaming
// const activeStreams = new Map(); // Store active live streams

// io.on("connection", (socket) => {
//   console.log("New client connected: ", socket.id);

//   // Seller starts a live stream
//   socket.on("start-live", ({ userId }) => {
//     activeStreams.set(socket.id, { userId, socketId: socket.id });
//     io.emit("active-streams", Array.from(activeStreams.values())); // Broadcast active streams
//   });

//   // Seller stops the live stream
//   socket.on("stop-live", () => {
//     activeStreams.delete(socket.id);
//     io.emit("active-streams", Array.from(activeStreams.values()));
//   });

//   // Viewer joins a live stream
//   socket.on("join-stream", (streamerId) => {
//     if (activeStreams.has(streamerId)) {
//       socket.to(streamerId).emit("viewer-joined", socket.id);
//     }
//   });
  
//   // WebRTC Offer (streamer to viewer)
//   socket.on("stream-offer", ({ viewerId, offer }) => {
//     socket.to(viewerId).emit("stream-offer", { streamerId: socket.id, offer });
//   });

//   // WebRTC Answer (viewer to streamer)
//   socket.on("stream-answer", ({ streamerId, answer }) => {
//     socket.to(streamerId).emit("stream-answer", { viewerId: socket.id, answer });
//   });

//   // ICE Candidate (for connection stability)
//   socket.on("stream-candidate", ({ candidate }) => {
//     socket.broadcast.emit("stream-candidate", { candidate });
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     activeStreams.delete(socket.id);
//     io.emit("active-streams", Array.from(activeStreams.values()));
//     console.log("Client disconnected: ", socket.id);
//   });
// });

// server.listen(port, () => console.log(`Server started on PORT: ${port}`));

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import contentRouter from "./routes/contentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import influencerRoutes from "./routes/influencerRoutes.js";
// import sellerRoutes from "./routes/sellerRoutes.js";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import Mux from "@mux/mux-node";
// import path from "path";
// import fs from "fs";



// // Initialize Mux
// const mux = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID,
//   tokenSecret: process.env.MUX_TOKEN_SECRET,
// });



// // App Config
// const app = express();
// const port = process.env.PORT || 4000;
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
//     credentials: true,
//   },
// });

// // Connect to DB and Cloudinary
// connectDB();
// connectCloudinary();


// const uploadDir = path.join("uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Allowed frontend origins
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175","http://localhost:5176"];

// // Set up CORS middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "token"],
//   })
// );
// app.options("*", cors());

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(uploadDir));

// // API Endpoints
// app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/content", contentRouter);
// app.use("/api/influencer", influencerRoutes);
// app.use("/api/seller", sellerRoutes);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // WebSocket Setup for Live Streaming
// const activeStreams = new Map(); // Store active live streams

// io.on("connection", (socket) => {
//   console.log("New client connected: ", socket.id);

//   socket.on("start-live", async ({ userId }) => {
//     try {
//       const stream = await mux.video.liveStreams.create({
//         playback_policy: "public",
//         new_asset_settings: { playback_policy: "public" },
//         reduced_latency: true,
//       });
      

//       activeStreams.set(socket.id, {
//         userId,
//         socketId: socket.id,
//         streamKey: stream.stream_key,
//         playbackUrl: `https://stream.mux.com/${stream.playback_ids[0].id}.m3u8`,
//       });
//       console.log("✅ New live stream started:", activeStreams.get(socket.id));
//       io.emit("active-streams", Array.from(activeStreams.values()));

//       socket.emit("live-stream-created", {
//         streamKey: stream.stream_key,
//         playbackUrl: `https://stream.mux.com/${stream.playback_ids[0].id}.m3u8`,
//       });

//     } catch (error) {
//       console.error("Mux Error:", error);
//       socket.emit("live-stream-error", { message: "Failed to create live stream" });
//     }
//   });

//   socket.on("stop-live", () => {
//     activeStreams.delete(socket.id);
//     io.emit("active-streams", Array.from(activeStreams.values()));
//   });

//   socket.on("disconnect", () => {
//     activeStreams.delete(socket.id);
//     io.emit("active-streams", Array.from(activeStreams.values()));
//   });
// });

// server.listen(port, () => console.log(`Server started on PORT: ${port}`));



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";
// import userRouter from "./routes/userRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import contentRouter from "./routes/contentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import influencerRoutes from "./routes/influencerRoutes.js";
// import sellerRoutes from "./routes/sellerRoutes.js";
// import cookieParser from "cookie-parser";
// import http from "http";
// import { Server } from "socket.io";
// import fs from "fs";
// import Mux from "@mux/mux-node";
// import path from "path";
// import { exec } from "child_process"; // ✅ Import child_process to run FFmpeg

// dotenv.config();

// // ✅ Initialize Mux
// const mux = new Mux({
//   tokenId: process.env.MUX_TOKEN_ID,
//   tokenSecret: process.env.MUX_TOKEN_SECRET,
// });

// // App Config
// const app = express();
// const port = process.env.PORT || 4000;
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
//     credentials: true,
//   },
// });

// // Connect to DB and Cloudinary
// connectDB();
// connectCloudinary();

// const uploadDir = path.join("uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Allowed frontend origins
// const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175","http://localhost:5176"];

// // Set up CORS middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "token"],
//   })
// );
// app.options("*", cors());

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(uploadDir));

// // API Endpoints
// app.use("/api/admin", adminRoutes);
// app.use("/api/user", userRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/content", contentRouter);
// app.use("/api/influencer", influencerRoutes);
// app.use("/api/seller", sellerRoutes);

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// // WebSocket Setup for Live Streaming
// const activeStreams = new Map(); // Store active live streams

// io.on("connection", (socket) => {
//   console.log("New client connected: ", socket.id);

//   socket.on("start-live", async ({ userId }) => {
//     try {
//       const stream = await mux.video.liveStreams.create({
//         playback_policy: "public",
//         new_asset_settings: { playback_policy: "public" },
//         reduced_latency: true,
//       });
  
//       activeStreams.set(socket.id, {
//         userId,
//         socketId: socket.id,
//         streamKey: stream.stream_key,
//         playbackUrl: `https://stream.mux.com/${stream.playback_ids[0].id}.m3u8`,
//       });
  
//       console.log("✅ New live stream started:", activeStreams.get(socket.id));
  
//       io.emit("active-streams", Array.from(activeStreams.values()));  // ✅ Send to viewers
  
//       socket.emit("live-stream-created", {
//         streamKey: stream.stream_key,
//         playbackUrl: `https://stream.mux.com/${stream.playback_ids[0].id}.m3u8`,
//       });
  
//     } catch (error) {
//       console.error("❌ Mux Error:", error);
//       socket.emit("live-stream-error", { message: "Failed to create live stream" });
//     }
//   });
  

//   socket.on("stop-live", () => {
//     activeStreams.delete(socket.id);
//     io.emit("active-streams", Array.from(activeStreams.values()));
//   });

//   socket.on("disconnect", () => {
//     console.log(`🔴 User disconnected: ${socket.id}`);
//     activeStreams.delete(socket.id);
//     console.log("📡 Active Streams After Disconnect:", Array.from(activeStreams.values()));
//     io.emit("active-streams", Array.from(activeStreams.values()));
//   });
// });

// // ✅ Function to start FFmpeg automatically
// // const startFFmpegStream = (streamKey) => {
// //   console.log("🎥 Starting FFmpeg for streamKey:", streamKey);

// //   const ffmpegCommand = `ffmpeg -f dshow -rtbufsize 100000000 -i video="HP Wide Vision HD Camera" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -f flv "rtmp://live.mux.com/app/${streamKey}"`;

// //   const ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
// //     if (error) {
// //       console.error("❌ FFmpeg Error:", error.message);
// //       return;
// //     }
// //     console.log("🎬 FFmpeg Output:", stdout);
// //     console.error("⚠️ FFmpeg Warnings:", stderr);
// //   });

// //   ffmpegProcess.on("exit", (code) => {
// //     console.log(`🛑 FFmpeg process exited with code ${code}`);
// //   });
// // };

// server.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));








///----------------------------------------------------------> new approach

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contentRouter from "./routes/contentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import influencerRoutes from "./routes/influencerRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import fs from "fs";
import Mux from "@mux/mux-node";
import path from "path";
import { exec } from "child_process"; // ✅ Import child_process to run FFmpeg

dotenv.config();

// ✅ Initialize Mux
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

// App Config
const app = express();
const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"],
    credentials: true,
  },
});

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed frontend origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176"];

// Set up CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  })
);
app.options("*", cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadDir));

// API Endpoints
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/content", contentRouter);
app.use("/api/influencer", influencerRoutes);
app.use("/api/seller", sellerRoutes);

app.get("/", (req, res) => {
  res.send("API Working");
});

// WebSocket Setup for Live Streaming
const activeStreams = new Map(); // Store active live streams

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("start-live", async ({ userId }) => {
    console.log("🟢 Received start-live from user:", userId);
  
    if (!userId) {
      console.error("❌ Missing userId in start-live event");
      return;
    }
  
    try {
      console.log("🚀 Requesting Mux to create a live stream...");
      const stream = await mux.video.liveStreams.create({
        playback_policy: "public",
        new_asset_settings: { playback_policy: "public" },
        reduced_latency: true,
      });
  
      console.log("✅ Mux Stream Created:", stream);
  
      if (!stream || !stream.playback_ids || stream.playback_ids.length === 0) {
        console.error("❌ Mux did not return a playback ID.");
        return;
      }
  
      const playbackUrl = `https://stream.mux.com/${stream.playback_ids[0].id}.m3u8`;
      activeStreams.set(socket.id, { userId, socketId: socket.id, streamKey: stream.stream_key, playbackUrl });
  
      console.log("📡 Active Streams Updated:", Array.from(activeStreams.values()));
  
      // ✅ Notify all clients
      io.emit("active-streams", Array.from(activeStreams.values()));
      socket.emit("live-stream-created", { streamKey: stream.stream_key, playbackUrl });
  
    } catch (error) {
      console.error("❌ Mux Error:", error);
      socket.emit("live-stream-error", { message: "Failed to create live stream", details: error.message });
    }
  });
  
  
  socket.on("stop-live", () => {
    activeStreams.delete(socket.id);
    io.emit("active-streams", Array.from(activeStreams.values()));
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
    activeStreams.delete(socket.id);
    io.emit("active-streams", Array.from(activeStreams.values()));
  });
});

// ✅ Function to start FFmpeg automatically
const startFFmpegStream = (streamKey) => {
  console.log("🎥 Starting FFmpeg for streamKey:", streamKey);

  const ffmpegCommand = `ffmpeg -f dshow -i video="HP Wide Vision HD Camera" -c:v libx264 -preset veryfast -b:v 2500k -maxrate 2500k -bufsize 5000k -f flv "rtmp://live.mux.com/app/${streamKey}"`;

  const ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ FFmpeg Error:", error.message);
      return;
    }
    console.log("🎬 FFmpeg Output:", stdout);
    console.error("⚠️ FFmpeg Warnings:", stderr);
  });

  ffmpegProcess.on("exit", (code) => {
    console.log(`🛑 FFmpeg process exited with code ${code}`);
  });
};

server.listen(port, () => console.log(`✅ Server started on PORT: ${port}`));
