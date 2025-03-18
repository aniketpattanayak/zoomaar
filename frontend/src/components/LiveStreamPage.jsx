import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:4000");

const LiveStreamPage = () => {
  const { streamerId } = useParams(); // Get the seller's ID
  const videoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    socket.emit("join-stream", { streamerId });
    console.log(`Joining stream of seller: ${streamerId}`);

    socket.on("stream-offer", async ({ streamerId, offer }) => {
      console.log(`Received stream offer from seller: ${streamerId}`);

      peerConnection.current = new RTCPeerConnection();

      // Handle received tracks (video/audio)
      peerConnection.current.ontrack = (event) => {
        console.log("Receiving tracks...");
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("stream-candidate", { streamerId, candidate: event.candidate });
        }
      };

      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("stream-answer", { streamerId, answer });
    });

    // Handle ICE candidates from the seller
    socket.on("stream-candidate", ({ candidate }) => {
      if (peerConnection.current) {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      // Remove event listeners instead of disconnecting socket
      socket.off("stream-offer");
      socket.off("stream-candidate");
    };
  }, [streamerId]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <video ref={videoRef} autoPlay playsInline controls style={{ width: "80%", height: "auto", background: "black" }}></video>
    </div>
  );
};

export default LiveStreamPage;
