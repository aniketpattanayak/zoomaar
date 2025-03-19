//--------------------------------------------------------> its like boxes 

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation } from "swiper/modules";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const ContentCarousel = () => {
//   const [contentList, setContentList] = useState([]);
//   const [selectedStory, setSelectedStory] = useState(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/content/");
//         setContentList(response.data);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       }
//     };

//     fetchContent();
//   }, []);

//   // Initialize Video.js player when modal opens
//   useEffect(() => {
//     if (selectedStory && playerRef.current) {
//       const player = videojs(playerRef.current, {
//         autoplay: true,
//         controls: true,
//         muted: false,
//         loop: false,
//         fluid: true, // Responsive video
//       });

//       player.on("ended", () => {
//         console.log("Video ended");
//       });

//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, [selectedStory]);

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-center">Latest Stories</h2>
//       {contentList.length === 0 ? (
//         <p className="text-center text-gray-500">No content uploaded yet.</p>
//       ) : (
//         <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={"auto"} navigation>
//           {contentList.map((item) => (
//             <SwiperSlide
//               key={item._id}
//               className="w-28 sm:w-32 md:w-40 lg:w-48 cursor-pointer"
//               onClick={() => setSelectedStory(item)}
//             >
//               <div className="bg-gray-200 rounded-lg p-2 flex flex-col items-center">
//                 <h3 className="text-sm font-semibold text-center truncate w-full">{item.title}</h3>
//                 <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mt-2">
//                   {item.media.length > 0 &&
//                     (item.media[0].endsWith(".mp4") ? (
//                       <video
//                         src={`http://localhost:4000${item.media[0]}`} // ✅ Corrected path
//                         className="w-full h-full object-cover"
//                         controls
//                       />
//                     ) : (
//                       <img
//                         src={`http://localhost:4000${item.media[0]}`} // ✅ Corrected path
//                         alt={item.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ))}
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}

//       {/* Modal for Video/Image Story Display */}
//       {selectedStory && (
//         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setSelectedStory(null)}>
//             ✖
//           </button>
//           <div className="bg-black rounded-lg p-4 flex flex-col items-center w-72 h-[500px] sm:w-80 sm:h-[550px] md:w-96 md:h-[600px]">
//             <Swiper direction="vertical" slidesPerView={1} className="w-full h-full">
//               {selectedStory.media.map((mediaUrl, index) => (
//                 <SwiperSlide key={index} className="flex justify-center items-center">
//                   {mediaUrl.endsWith(".mp4") ? (
//                     <video
//                       ref={playerRef}
//                       className="video-js vjs-default-skin w-full h-full rounded-lg"
//                       controls
//                     >
//                       <source src={`http://localhost:4000${mediaUrl}`} type="video/mp4" />
//                     </video>
//                   ) : (
//                     <img
//                       src={`http://localhost:4000${mediaUrl}`}
//                       alt="Story"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   )}
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContentCarousel;



//-----------------------------------------------------> its like video side
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Keyboard } from "swiper/modules";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const ContentCarousel = () => {
//   const [contentList, setContentList] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const playerRefs = useRef([]);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/content/");
//         setContentList(response.data);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       }
//     };

//     fetchContent();
//   }, []);

//   useEffect(() => {
//     if (selectedIndex !== null && playerRefs.current[selectedIndex]) {
//       const player = videojs(playerRefs.current[selectedIndex], {
//         autoplay: true,
//         controls: false,
//         muted: false,
//         loop: false,
//         fluid: true,
//       });

//       player.on("ended", () => {
//         handleNextStory();
//       });

//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, [selectedIndex]);

//   const handleNextStory = () => {
//     if (selectedIndex < contentList.length - 1) {
//       setSelectedIndex(selectedIndex + 1);
//     } else {
//       setSelectedIndex(null);
//     }
//   };

//   const handlePrevStory = () => {
//     if (selectedIndex > 0) {
//       setSelectedIndex(selectedIndex - 1);
//     } else {
//       setSelectedIndex(null);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 text-center text-white">Stories</h2>
//       {contentList.length === 0 ? (
//         <p className="text-center text-gray-500">No content uploaded yet.</p>
//       ) : (
//         <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView="auto" navigation>
//           {contentList.map((item, index) => (
//             <SwiperSlide
//               key={item._id}
//               className="w-24 sm:w-28 md:w-32 lg:w-36 cursor-pointer"
//               onClick={() => setSelectedIndex(index)}
//             >
//               <div className="flex flex-col items-center">
//                 <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-pink-500 shadow-md">
//                   {item.media.length > 0 &&
// //                     (item.media[0].endsWith(".mp4") ? (
// //                       <video
// //                         src={`http://localhost:4000${item.media[0]}`}
// //                         className="w-full h-full object-cover"
// //                         autoPlay
// //                         loop
// //                         muted
// //                       />
// //                     ) : (
// //                       <img
// //                         src={`http://localhost:4000${item.media[0]}`}
// //                         alt={item.title}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     ))}
// //                 </div>
// //                 <h3 className="text-xs text-white font-semibold mt-1 truncate w-full text-center">
// //                   {item.title}
// //                 </h3>
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       )}

// //       {/* Story Modal */}
// //       {selectedIndex !== null && (
// //         <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
// //           <button
// //             className="absolute top-4 right-4 text-white text-3xl"
// //             onClick={() => setSelectedIndex(null)}
// //           >
// //             ✖
// //           </button>
// //           <div className="bg-black rounded-lg p-4 flex flex-col items-center w-80 h-[500px] sm:w-96 sm:h-[600px]">
// //             <Swiper
// //               direction="horizontal"
// //               slidesPerView={1}
// //               spaceBetween={10}
// //               navigation
// //               keyboard={{ enabled: true }}
// //               onSlideChange={(swiper) => setSelectedIndex(swiper.activeIndex)}
// //               initialSlide={selectedIndex}
// //               modules={[Navigation, Keyboard]}
// //               className="w-full h-full"
// //             >
// //               {contentList.map((story, index) => (
// //                 <SwiperSlide key={index} className="flex justify-center items-center">
// //                   {story.media[0].endsWith(".mp4") ? (
// //                     <video
// //                       ref={(el) => (playerRefs.current[index] = el)}
// //                       className="video-js vjs-default-skin w-full h-full rounded-lg"
// //                       controls
// //                       autoPlay
// //                     >
// //                       <source src={`http://localhost:4000${story.media[0]}`} type="video/mp4" />
// //                     </video>
// //                   ) : (
// //                     <img
// //                       src={`http://localhost:4000${story.media[0]}`}
// //                       alt="Story"
// //                       className="w-full h-full object-cover rounded-lg"
// //                     />
// //                   )}
// //                 </SwiperSlide>
// //               ))}
// //             </Swiper>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ContentCarousel;











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { useNavigate } from "react-router-dom";

// const ContentCarousel = () => {
//   const [contentList, setContentList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/content/");
//         setContentList(response.data);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//       }
//     };
//     fetchContent();
//   }, []);

//   const handleStoryClick = (index) => {
//     navigate(`/stories-feed?index=${index}`);
//   };

//   return (
//     <div className="w-full bg-gray-900 p-4">
//       <Swiper
//         slidesPerView="auto"
//         spaceBetween={10}
//         navigation
//         modules={[Navigation]}
//         className="w-full"
//       >
//         {contentList.map((story, index) => (
//           <SwiperSlide
//             key={story._id}
//             className="w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500 cursor-pointer"
//             onClick={() => handleStoryClick(index)}
//           >
//             <img
//               src={`http://localhost:4000${story.media[0]}`}
//               alt="Story"
//               className="w-full h-full object-cover"
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ContentCarousel;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const ContentCarousel = () => {
  const [contentList, setContentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("https://zoomaar.onrender.com/api/content/");
        setContentList(response.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleStoryClick = (index) => {
    navigate(`/stories-feed?index=${index}`);
  };

  return (
    <div className="w-full flex justify-center py-4">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        navigation
        modules={[Navigation]}
        className="w-full max-w-2xl px-4"
      >
        {contentList.map((story, index) => (
          <SwiperSlide
            key={story._id}
            className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden border-2 border-pink-500 flex justify-center items-center cursor-pointer"
            onClick={() => handleStoryClick(index)}
          >
            {story.media[0].endsWith(".mp4") || story.media[0].endsWith(".webm") ? (
              <video
                src={`http://localhost:4000${story.media[0]}`}
                className="w-full h-full object-cover rounded-full"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={`http://localhost:4000${story.media[0]}`}
                alt="Story"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
