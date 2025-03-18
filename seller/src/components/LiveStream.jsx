import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LiveStream = ({ setIsLive }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const startLiveStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
        setIsLive(true); // Hide Navbar & Sidebar
      } catch (error) {
        console.error("Error accessing webcam:", error);
        navigate("/");
      }
    };

    startLiveStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Run only once on mount

  const stopLiveStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsLive(false); // Show Navbar & Sidebar again
    navigate("/"); // Navigate back after stopping
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black relative">
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
      <button
        onClick={stopLiveStream}
        className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded">
        Stop Live
      </button>
    </div>
  );
};

export default LiveStream;
