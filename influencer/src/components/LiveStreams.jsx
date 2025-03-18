import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const LiveStreams = () => {
  const videoRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [streamKey, setStreamKey] = useState("");
  const userId = localStorage.getItem("userId");

  const [socketInstance, setSocketInstance] = useState(null);

useEffect(() => {
  if (!socketInstance) {
    const socket = io("http://localhost:4000");
    setSocketInstance(socket);
    console.log("🔵 WebSocket connected");

    socket.on("live-stream-created", ({ streamKey }) => {
      console.log("✅ Mux Stream Key:", streamKey);
      setStreamKey(streamKey);
      startFFmpeg(streamKey);
    });

    return () => {
      console.log("🔴 WebSocket disconnected");
      socket.disconnect();
    };
  }
}, []);


  useEffect(() => {
    if (!userId) return;

    socket.on("live-stream-created", ({ streamKey }) => {
      console.log("✅ Mux Stream Key:", streamKey);
      setStreamKey(streamKey);
      //startFFmpeg(streamKey);
    });

    return () => {
      stopLive();
      socket.disconnect();
    };
  }, [userId]);

  const startLive = async () => {
    const userId = localStorage.getItem("userId");
    console.log("🔍 Retrieved userId from localStorage:", userId);
  
    if (!userId) {
      console.error("❌ User ID is missing. Cannot start live stream.");
      alert("User ID is missing! Please log in again.");
      return;
    }
  
    setIsLive(true);
    console.log(`🎥 Emitting start-live for user: ${userId}`);
    socket.emit("start-live", { userId });
  
  
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("🚨 Error accessing camera:", error);
      alert("Please allow camera & microphone access.");
      setIsLive(false);
    }
  };
  
  const stopLive = () => {
    setIsLive(false);
    socket.emit("stop-live");

    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };
  // const startFFmpeg = (streamKey) => {
  //   const ffmpegCommand = `ffmpeg -f dshow -i video="HP Wide Vision HD Camera" -c:v libx264 -preset veryfast -b:v 4500k -f flv "rtmp://live.mux.com/app/${streamKey}"`;
    
  //   console.log("📡 Run this FFmpeg command in your terminal to start streaming:\n", ffmpegCommand);
    
  //   // Display the command in an alert box for easy copying
  //   alert(`Copy & Run this FFmpeg command in your terminal:\n\n${ffmpegCommand}`);
  // };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLive ? (
        <>
          <h1 className="text-xl font-bold mb-4">Live Now</h1>
          <video ref={videoRef} autoPlay playsInline muted className="w-[350px] h-[620px] border-2 border-gray-400 rounded-xl shadow-xl" />
          <button onClick={stopLive} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Stop Live</button>
        </>
      ) : (
        <button onClick={startLive} className="bg-green-600 text-white px-4 py-2 rounded">Start Live</button>
      )}
    </div>
  );
};

export default LiveStreams;
