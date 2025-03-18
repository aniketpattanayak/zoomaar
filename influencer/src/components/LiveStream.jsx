// // import React, { useEffect, useState } from "react";

// // const LiveStream = () => {
// //   const [stream, setStream] = useState(null);
// //   const [viewerCount, setViewerCount] = useState(0);
// //   const [isLive, setIsLive] = useState(false);

// //   useEffect(() => {
// //     // Simulate Viewer Count Update (Replace with backend socket connection)
// //     const interval = setInterval(() => {
// //       setViewerCount((prevCount) => prevCount + Math.floor(Math.random() * 3));
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, []);

// //   const startLiveStream = async () => {
// //     try {
// //       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
// //       setStream(userStream);
// //       setIsLive(true);
// //     } catch (error) {
// //       console.error("Error accessing camera:", error);
// //     }
// //   };

// //   const stopLiveStream = () => {
// //     if (stream) {
// //       stream.getTracks().forEach((track) => track.stop());
// //       setStream(null);
// //       setIsLive(false);
// //       setViewerCount(0);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center h-screen w-screen relative">
// //       {isLive ? (
// //         <>
// //           {/* Video Container */}
// //           <div className="relative w-[350px] h-[620px] rounded-xl overflow-hidden border-2 border-gray-400 shadow-xl">
// //             <video
// //               ref={(video) => video && stream && (video.srcObject = stream)}
// //               autoPlay
// //               className="w-full h-full object-cover"
// //             />
            
// //             {/* Live Badge */}
// //             <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
// //               LIVE
// //             </div>

// //             {/* Viewer Count */}
// //             <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold">
// //               👀 {viewerCount}
// //             </div>

// //             {/* Stop Live Button */}
// //             <button
// //               onClick={stopLiveStream}
// //               className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 px-6 py-2 text-white rounded-full text-lg font-semibold"
// //             >
// //               Stop Live
// //             </button>
// //           </div>
// //         </>
// //       ) : (
// //         // Start Live Button
// //         <button
// //           onClick={startLiveStream}
// //           className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
// //         >
// //           Start Live
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default LiveStream;



// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // Change this to your backend URL

// const LiveStream = ({ role }) => {
//   const [stream, setStream] = useState(null);
//   const [viewerCount, setViewerCount] = useState(0);
//   const [isLive, setIsLive] = useState(false);
//   const [reactions, setReactions] = useState([]);

//   useEffect(() => {
//     // Listen for viewer count updates
//     socket.on("viewer-count", (count) => {
//       setViewerCount(count);
//     });

//     // Listen for reactions
//     socket.on("receive-reaction", (reaction) => {
//       setReactions((prev) => [...prev, reaction]);
//       setTimeout(() => {
//         setReactions((prev) => prev.slice(1)); // Remove old reactions after 3 seconds
//       }, 3000);
//     });

//     return () => {
//       socket.off("viewer-count");
//       socket.off("receive-reaction");
//     };
//   }, []);

//   const startLiveStream = async () => {
//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(userStream);
//       setIsLive(true);

//       // Send Start Live Event
//       socket.emit("start-live", { role });

//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const stopLiveStream = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//       setIsLive(false);
//       setViewerCount(0);

//       // Send Stop Live Event
//       socket.emit("stop-live", { role });
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen relative">
//       {isLive ? (
//         <>
//           {/* Video Container */}
//           <div className="relative w-[350px] h-[620px] rounded-xl overflow-hidden border-2 border-gray-400 shadow-xl">
//             <video
//               ref={(video) => video && stream && (video.srcObject = stream)}
//               autoPlay
//               className="w-full h-full object-cover"
//             />

//             {/* Live Badge */}
//             <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
//               LIVE
//             </div>

//             {/* Viewer Count */}
//             <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold">
//               👀 {viewerCount}
//             </div>

//             {/* Display Reactions */}
//             <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 space-x-2">
//               {reactions.map((emoji, index) => (
//                 <span key={index} className="text-2xl animate-bounce">{emoji}</span>
//               ))}
//             </div>

//             {/* Stop Live Button */}
//             <button
//               onClick={stopLiveStream}
//               className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 px-6 py-2 text-white rounded-full text-lg font-semibold"
//             >
//               Stop Live
//             </button>
//           </div>
//         </>
//       ) : (
//         // Start Live Button
//         <button
//           onClick={startLiveStream}
//           className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
//         >
//           Start Live
//         </button>
//       )}
//     </div>
//   );
// };

// export default LiveStream;



// import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000"); // Change this to your backend URL

// const LiveStream = ({ userId }) => {
//   const [stream, setStream] = useState(null);
//   const [viewerCount, setViewerCount] = useState(0);
//   const [isLive, setIsLive] = useState(false);
//   const [reactions, setReactions] = useState([]);
//   const videoRef = useRef(null);
//   const peerConnections = useRef({}); // Store viewer connections

//   useEffect(() => {
//     // Listen for viewer count updates
//     socket.on("viewer-count", (count) => setViewerCount(count));

//     // Listen for reactions
//     socket.on("receive-reaction", (reaction) => {
//       setReactions((prev) => [...prev, reaction]);
//       setTimeout(() => setReactions((prev) => prev.slice(1)), 3000);
//     });

//     // Handle incoming viewer connections
//     socket.on("viewer-joined", async (viewerId) => {
//       console.log("New Viewer Joined:", viewerId);

//       const peerConnection = new RTCPeerConnection();
//       stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

//       peerConnection.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit("stream-candidate", { viewerId, candidate: event.candidate });
//         }
//       };

//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket.emit("stream-offer", { viewerId, offer });

//       peerConnections.current[viewerId] = peerConnection;
//     });

//     socket.on("stream-answer", ({ viewerId, answer }) => {
//       peerConnections.current[viewerId]?.setRemoteDescription(new RTCSessionDescription(answer));
//     });

//     socket.on("stream-candidate", ({ candidate }) => {
//       Object.values(peerConnections.current).forEach((pc) => pc.addIceCandidate(new RTCIceCandidate(candidate)));
//     });

//     return () => {
//       socket.off("viewer-count");
//       socket.off("receive-reaction");
//       socket.off("viewer-joined");
//       socket.off("stream-answer");
//       socket.off("stream-candidate");
//     };
//   }, [stream]);

//   const startLiveStream = async () => {
//     try {
//       const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(userStream);
//       setIsLive(true);
//       if (videoRef.current) videoRef.current.srcObject = userStream;

//       socket.emit("start-live", { userId });

//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const stopLiveStream = () => {
//     stream?.getTracks().forEach((track) => track.stop());
//     setStream(null);
//     setIsLive(false);
//     setViewerCount(0);

//     // Close peer connections
//     Object.values(peerConnections.current).forEach((pc) => pc.close());
//     peerConnections.current = {};

//     socket.emit("stop-live", { userId });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-screen relative">
//       {isLive ? (
//         <>
//           <div className="relative w-[350px] h-[620px] rounded-xl overflow-hidden border-2 border-gray-400 shadow-xl">
//             <video ref={videoRef} autoPlay className="w-full h-full object-cover" />

//             <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
//               LIVE
//             </div>

//             <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold">
//               👀 {viewerCount}
//             </div>

//             <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 space-x-2">
//               {reactions.map((emoji, index) => (
//                 <span key={index} className="text-2xl animate-bounce">{emoji}</span>
//               ))}
//             </div>

//             <button
//               onClick={stopLiveStream}
//               className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-red-600 px-6 py-2 text-white rounded-full text-lg font-semibold"
//             >
//               Stop Live
//             </button>
//           </div>
//         </>
//       ) : (
//         <button onClick={startLiveStream} className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold">
//           Start Live
//         </button>
//       )}
//     </div>
//   );
// };

// export default LiveStream;


import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const LiveStream = ({ userId }) => {
  const videoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
    };
  }, [peerConnection]);

  const startLiveStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const pc = new RTCPeerConnection();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("stream-candidate", { candidate: event.candidate });
        }
      };

      socket.on("stream-answer", async ({ viewerId, answer }) => {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on("stream-candidate", ({ candidate }) => {
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("start-live", { userId, offer });

      setPeerConnection(pc);
      setIsLive(true);
    } catch (error) {
      console.error("Error starting live stream:", error);
    }
  };

  const stopLiveStream = () => {
    if (peerConnection) {
      peerConnection.close();
    }
    setIsLive(false);
    socket.emit("stop-live", { userId });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {isLive ? (
        <>
          <h1 className="text-xl font-bold mb-4">Live Now</h1>
          <video ref={videoRef} autoPlay className="w-[350px] h-[620px] border-2 border-gray-400 rounded-xl shadow-xl" />
          <button onClick={stopLiveStream} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Stop Live</button>
        </>
      ) : (
        <button onClick={startLiveStream} className="bg-green-600 text-white px-4 py-2 rounded">Start Live</button>
      )}
    </div>
  );
};

export default LiveStream;
