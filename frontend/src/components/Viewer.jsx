// import React, { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");

// const Viewer = () => {
//   const videoRef = useRef(null);
//   const peerConnection = useRef(null);
//   const [activeStreams, setActiveStreams] = useState([]);
//   const [selectedStream, setSelectedStream] = useState(null);
  
//   // Fetch active streams from server
//   useEffect(() => {
//     socket.on("active-streams", (streams) => {
//       setActiveStreams(streams);
//     });

//     return () => {
//       socket.off("active-streams");
//     };
//   }, []);

//   // Join a selected live stream
//   const joinStream = (streamerId) => {
//     setSelectedStream(streamerId);
//     socket.emit("join-stream", streamerId);

//     socket.on("stream-offer", async ({ streamerId, offer }) => {
//       peerConnection.current = new RTCPeerConnection();
//       peerConnection.current.ontrack = (event) => {
//         videoRef.current.srcObject = event.streams[0];
//       };

//       await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
//       const answer = await peerConnection.current.createAnswer();
//       await peerConnection.current.setLocalDescription(answer);

//       socket.emit("stream-answer", { streamerId, answer });
//     });

//     socket.on("stream-candidate", ({ candidate }) => {
//       peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
//     });
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white">
//       {/* Full-Screen Live View */}
//       {selectedStream ? (
//         <>
//           <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
//           <button
//             onClick={() => setSelectedStream(null)}
//             className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Close Live
//           </button>
//         </>
//       ) : (
//         <>
//           {/* Instagram-Style Horizontal Story Carousel */}
//           <div className="absolute top-5 w-full overflow-x-auto flex gap-4 px-5">
//             {activeStreams.map(({ userId }, index) => (
//               <div
//                 key={index}
//                 className="relative w-24 h-24 rounded-full border-4 border-pink-500 cursor-pointer overflow-hidden"
//                 onClick={() => joinStream(userId)}
//               >
//                 <img
//                   src={`https://via.placeholder.com/100?text=${userId}`} // Placeholder avatar
//                   alt="Live Stream"
//                   className="w-full h-full object-cover"
//                 />
//                 <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//                   Live
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Waiting for Stream Message */}
//           <h2 className="absolute text-2xl top-1/3 text-center">Waiting for stream...</h2>
//         </>
//       )}
//     </div>
//   );
// };

// export default Viewer;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");

// const Viewer = () => {
//   const [activeStreams, setActiveStreams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     socket.emit("get-active-streams");

//     socket.on("active-streams", (streams) => {
//       setActiveStreams(streams);
//     });

//     return () => {
//       socket.off("active-streams");
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
//       <h1 className="text-2xl font-semibold mb-4">Live Streams</h1>

//       {/* Horizontal Story Carousel */}
//       <div className="flex overflow-x-auto space-x-4 p-4 w-full">
//         {activeStreams.map(({ userId }, index) => (
//           <div
//             key={index}
//             className="relative w-24 h-24 rounded-full border-4 border-pink-500 cursor-pointer overflow-hidden"
//             onClick={() => navigate(`/live/${userId}`)}
//           >
//             <img
//               src={`https://via.placeholder.com/100?text=${userId}`} // Placeholder avatar
//               alt="Live Stream"
//               className="w-full h-full object-cover"
//             />
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//               Live
//             </span>
//           </div>
//         ))}
//       </div>

//       {activeStreams.length === 0 && (
//         <h2 className="text-2xl text-center mt-5">No Live Streams Available</h2>
//       )}
//     </div>
//   );
// };

// export default Viewer;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const Viewer = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    socket.emit("join-stream", userId);

    const pc = new RTCPeerConnection();

    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("stream-candidate", { candidate: event.candidate });
      }
    };

    socket.on("stream-offer", async ({ streamerId, offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit("stream-answer", { streamerId, answer });
    });

    socket.on("stream-candidate", ({ candidate }) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    setPeerConnection(pc);

    return () => {
      pc.close();
      socket.off("stream-offer");
      socket.off("stream-candidate");
    };
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={() => navigate(-1)} className="absolute top-5 left-5 bg-gray-700 text-white px-4 py-2 rounded">
        Back
      </button>
      <h1 className="text-xl font-bold mb-4">Live Stream</h1>
      <video ref={videoRef} autoPlay className="w-[350px] h-[620px] border-2 border-gray-400 rounded-xl shadow-xl" />
    </div>
  );
};

export default Viewer;


