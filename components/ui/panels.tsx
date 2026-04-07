"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

const PANELS_DATA = [
  { type: "video", src: `${prefix}/intro_video_speed.mp4`, id: "landing-page" },
  { type: "image", src: `${prefix}/a-block.webp`, id: "are-you-ready" },
  {
    type: "image",
    src: `${prefix}/b-block.webp`,
    id: "charge-organisational-batteries",
  },
  {
    type: "image",
    src: `${prefix}/c-block.webp`,
    id: "challenge-limiting-beliefs",
  },
  {
    type: "image",
    src: `${prefix}/d-block.webp`,
    id: "reset-strategic-direction",
  },
  { type: "image", src: `${prefix}/e-block.webp`, id: "build-two-engines" },
  { type: "image", src: `${prefix}/f-block.webp`, id: "ecosystems-thinking" },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/VYF7ZbEnoao",
    id: "why-we-started",
  },
  { type: "video", src: `${prefix}/outro_video_speed.mp4`, id: "who-we-are" },
];

const PanelGrid = ({ activeId }: { activeId: string }) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    let requestRunning = false;

    const updateVideoFrames = () => {
      PANELS_DATA.forEach((panel, index) => {
        if (panel.type !== "video") return;

        const container = containerRefs.current[index];
        const video = videoRefs.current[index];

        if (container && video && video.readyState >= 2) {
          const rect = container.getBoundingClientRect();
          const totalScrollableHeight = rect.height - window.innerHeight;

          // Progress is 0 when top of container is at top of screen
          // Progress is 1 when bottom of container is at top of screen
          const progress = -rect.top / totalScrollableHeight;
          const clampedProgress = Math.max(0, Math.min(1, progress));

          // Directly updating currentTime inside the animation frame
          if (video.duration) {
            video.currentTime = video.duration * clampedProgress;
          }
        }
      });
      requestRunning = false;
    };

    const onScroll = () => {
      if (!requestRunning) {
        requestRunning = true;
        requestAnimationFrame(updateVideoFrames);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleScroll = useCallback(() => {
    const introContainer = containerRefs.current[0];
    const outroContainer = containerRefs.current[8]; // outro is index 8

    let shouldShow = false;

    // Show indicator near the top of the intro video
    if (introContainer) {
      const rect = introContainer.getBoundingClientRect();
      if (rect.top > -150) {
        shouldShow = true;
      }
    }

    // Show indicator at the start of the outro video
    if (outroContainer && !shouldShow) {
      const rect = outroContainer.getBoundingClientRect();
      // Show when the video sticks to the top (with 50px tolerance) 
      // and for the first 150px of scrolling
      if (rect.top <= 50 && rect.top > -150) {
        shouldShow = true;
      }
    }

    setShowScrollIndicator(shouldShow);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="w-full">
      {PANELS_DATA.map((panel, index) => {
        const isVideo = panel.type === "video";
        const isYouTube = panel.type === "youtube";

        if (isVideo) {
          return (
            <div
              key={index}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
              className="relative h-[600vh] bg-[#FEFEFE]"
              id={panel.id}
            >
              <div className="sticky top-0 h-screen w-full flex items-center justify-center py-[5%]">
                <div
                  className="w-full h-full"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain"
                    // Optimization: ensures the browser doesn't try to play it normally
                    controls={false}
                  >
                    <source src={panel.src} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          );
        }

        if (isYouTube) {
          return (
            <div
              key={index}
              id={panel.id}
              className="relative w-full bg-[#FEFEFE] flex items-center justify-center py-20"
              style={{ aspectRatio: "35 / 18" }}
            >
              <div className="w-[80%] lg:w-[60%] max-w-[1200px] aspect-video">
                <iframe
                  className="w-full h-full"
                  src={panel.src}
                  title="Why We Started"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="relative w-full bg-gray-200 overflow-hidden"
            style={{ aspectRatio: "35 / 18" }}
            id={panel.id}
          >
            <img
              src={panel.src}
              alt={`Panel ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        );
      })}
      {showScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <div className="flex flex-col items-center text-[#9EA9BA]">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5" />
              <line x1="12" y1="2" x2="12" y2="18" />
            </svg>
          </div>
        </div>
      )}
    </main>
  );
};

export default PanelGrid;
