import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://zoomaar.onrender.com");

const LivePage = () => {
  const { streamerId } = useParams();
  const videoRef = useRef(null);
  const peerConnection = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit("join-stream", streamerId);

    socket.on("stream-offer", async ({ offer }) => {
      peerConnection.current = new RTCPeerConnection();

      peerConnection.current.ontrack = (event) => {
        videoRef.current.srcObject = event.streams[0];
        setLoading(false);
      };

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("stream-answer", { streamerId, answer });
    });

    socket.on("stream-candidate", ({ candidate }) => {
      peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      peerConnection.current?.close();
      socket.emit("leave-stream", streamerId);
    };
  }, [streamerId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-5 bg-gray-800 text-white px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      {loading ? (
        <h2 className="text-2xl">Connecting to Live Stream...</h2>
      ) : (
        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
      )}
    </div>
  );
};

export default LivePage;
