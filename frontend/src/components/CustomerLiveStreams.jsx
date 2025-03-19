import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://zoomaar.onrender.com"); // Adjust to your backend URL

const CustomerLiveStreams = () => {
  const [activeStreams, setActiveStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [reaction, setReaction] = useState("");

  useEffect(() => {
    // Listen for active live streams
    socket.on("active-streams", (streams) => {
      setActiveStreams(streams);
    });

    // Listen for reactions
    socket.on("receive-reaction", (emoji) => {
      setReaction(emoji);
      setTimeout(() => setReaction(""), 2000); // Clear reaction after 2 sec
    });

    return () => {
      socket.off("active-streams");
      socket.off("receive-reaction");
    };
  }, []);

  const sendReaction = (emoji) => {
    socket.emit("send-reaction", emoji);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Live Streams</h1>

      {selectedStream ? (
        <div className="relative w-[350px] h-[620px] rounded-xl overflow-hidden border-2 border-gray-400 shadow-xl">
          <video autoPlay className="w-full h-full object-cover" />

          {/* LIVE Badge */}
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            LIVE
          </div>

          {/* Reaction Overlay */}
          {reaction && (
            <div className="absolute bottom-16 right-6 text-5xl animate-bounce">
              {reaction}
            </div>
          )}

          {/* Emoji Reaction Buttons */}
          <div className="absolute bottom-5 flex gap-3 justify-center w-full">
            {["❤️", "🔥", "😂", "👏"].map((emoji) => (
              <button
                key={emoji}
                className="text-3xl p-2 bg-white rounded-full shadow-lg"
                onClick={() => sendReaction(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Stop Watching Button */}
          <button
            className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded text-sm"
            onClick={() => setSelectedStream(null)}
          >
            ❌ Exit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {activeStreams.length > 0 ? (
            activeStreams.map((stream, index) => (
              <button
                key={index}
                className="bg-white p-4 rounded-lg shadow-md text-center"
                onClick={() => setSelectedStream(stream)}
              >
                🎥 {stream.role} Live - {stream.userId}
              </button>
            ))
          ) : (
            <p>No live streams available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerLiveStreams;
