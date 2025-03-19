import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";

const StoryFeed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const startIndex = parseInt(queryParams.get("index"), 10) || 0;

  const [contentList, setContentList] = useState([]);
  const playerRefs = useRef({}); // Store video refs

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

  // Handle video play/pause when slide changes
  const handleSlideChange = (swiper) => {
    Object.values(playerRefs.current).forEach((video) => {
      if (video) video.pause();
    });

    const activeIndex = swiper.activeIndex;
    const activeStory = contentList[activeIndex];
    if (activeStory && activeStory.media.some((m) => m.endsWith(".mp4"))) {
      const video = playerRefs.current[activeIndex];
      if (video) video.play();
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <button
        className="absolute top-4 left-4 text-white text-3xl z-50"
        onClick={() => navigate(-1)}
      >
        ✖
      </button>

      {/* Vertical Swiper for switching between stories */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        spaceBetween={0}
        speed={500}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
        modules={[Keyboard, Mousewheel]}
        initialSlide={startIndex}
        className="w-full h-full"
        onSlideChange={handleSlideChange}
      >
        {contentList.map((story, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            {/* Centered Instagram-like display */}
            <div className="relative w-[350px] h-[600px] bg-black rounded-lg overflow-hidden">
              {/* Horizontal Swiper for scrolling within a single story */}
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="w-full h-full"
              >
                {story.media.map((media, mediaIndex) => (
                  <SwiperSlide key={mediaIndex} className="flex justify-center items-center">
                    {media.endsWith(".mp4") ? (
                      <video
                        ref={(el) => (playerRefs.current[index] = el)}
                        className="w-full h-full object-cover"
                        autoPlay
                        controls
                        loop
                        muted
                      >
                        <source src={`http://localhost:4000${media}`} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={`http://localhost:4000${media}`}
                        alt="Story"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StoryFeed;



