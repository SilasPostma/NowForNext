"use client";
import React, { useRef, useEffect } from "react";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

const PANELS_DATA = [
  { type: "video", src: `${prefix}/intro_video_speed.mp4`, id: "intro_video" },
  { type: "image", src: `${prefix}/a-block.webp`, id: "block-a" },
  { type: "image", src: `${prefix}/b-block.webp`, id: "block-b" },
  { type: "image", src: `${prefix}/c-block.webp`, id: "block-c" },
  { type: "image", src: `${prefix}/d-block.webp`, id: "block-d" },
  { type: "image", src: `${prefix}/e-block.webp`, id: "block-e" },
  { type: "image", src: `${prefix}/f-block.webp`, id: "block-f" },
  { type: "video", src: `${prefix}/outro_video_speed.mp4`, id: "outro_video" },
];

const PanelGrid = () => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  return (
    <main className="w-full">
      {PANELS_DATA.map((panel, index) => {
        const isVideo = panel.type === "video";

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
    </main>
  );
};

export default PanelGrid;
