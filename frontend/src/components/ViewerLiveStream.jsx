// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useNavigate } from "react-router-dom";

// const socket = io("http://localhost:4000");

// const ViewerLiveStream = () => {
//   const [activeStreams, setActiveStreams] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     socket.on("active-streams", (streams) => {
//       setActiveStreams(streams);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Streams</h2>
//       <div style={{ display: "flex", overflowX: "auto" }}>
//         {activeStreams.map((stream, index) => (
//           <div
//             key={index}
//             style={{ margin: 10, cursor: "pointer" }}
//             onClick={() => navigate(`/live/${stream.socketId}`)}
//           >
//             <div style={{ width: 100, height: 100, background: "gray", borderRadius: "50%" }}>
//               {/* Placeholder for seller's profile or thumbnail */}
//             </div>
//             <p>Seller {stream.userId}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default ViewerLiveStream;

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");

// const ViewerLiveStream = () => {
//   const [activeStreams, setActiveStreams] = useState([]);

//   useEffect(() => {
//     socket.on("active-streams", (streams) => {
//       console.log("📡 Received active streams:", streams);
//       setActiveStreams(streams);
//     });
  
//     return () => {
//       socket.off("active-streams"); // Ensure we don't have multiple listeners
//     };
//   }, []);
  

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Live Streams</h2>
//       <div style={{ display: "flex", overflowX: "auto" }}>
//         {activeStreams.map((stream, index) => (
//           <div key={index} style={{ margin: 10 }}>
//             <h3>Seller {stream.userId}</h3>
//             <video controls autoPlay style={{ width: 320, height: 180 }}>
//               <source src={stream.playbackUrl} type="application/x-mpegURL" />
//             </video>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewerLiveStream;


///---------------------------------------------> new one 

import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Hls from "hls.js";

const socket = io("http://localhost:4000");

const ViewerLiveStream = () => {
  const [activeStreams, setActiveStreams] = useState([]);
  const videoRefs = useRef({});
  const [socketInstance, setSocketInstance] = useState(null);

  useEffect(() => {
    socket.on("active-streams", (streams) => {
      console.log("📡 Received active streams:", streams);
      setActiveStreams(streams);
    });

    return () => {
      socket.off("active-streams");
    };
  }, []);

  

useEffect(() => {
  if (!socketInstance) {
    const socket = io("https://zoomaar.onrender.com");
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
    activeStreams.forEach((stream) => {
      if (Hls.isSupported() && stream.playbackUrl) {
        const video = videoRefs.current[stream.userId];

        if (video) {
          const hls = new Hls();
          hls.loadSource(stream.playbackUrl);
          hls.attachMedia(video);
          console.log("🔹 HLS stream loaded:", stream.playbackUrl);
        }
      } else {
        console.error("❌ Invalid playback URL:", stream.playbackUrl);
      }
    });
  }, [activeStreams]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Live Streams</h2>
      <div style={{ display: "flex", overflowX: "auto" }}>
        {activeStreams.map((stream, index) => (
          <div key={index} style={{ margin: 10 }}>
            <h3>Seller {stream.userId}</h3>
            <video ref={(el) => (videoRefs.current[stream.userId] = el)} controls autoPlay muted style={{ width: 320, height: 180 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewerLiveStream;
