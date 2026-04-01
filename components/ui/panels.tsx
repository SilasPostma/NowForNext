import React from "react";

const PanelGrid = () => {
  const panels = [
    { type: "video", src: "/intro_video.mp4" },
    { type: "image", src: "/a-block.png" },
    { type: "image", src: "/b-block.png" },
    { type: "image", src: "/c-block.png" },
    { type: "image", src: "/d-block.png" },
    { type: "image", src: "/e-block.png" },
    { type: "image", src: "/f-block.png" },
    { type: "video", src: "/outro_video.mp4" },
  ];

  return (
    <main className="w-full">
      <div className="grid grid-cols-1">
        {panels.map((panel, index) => {
          const isVideo = panel.type === "video";

          return (
            <div
              key={index}
              className={`relative w-full flex flex-col justify-center items-center overflow-hidden ${
                isVideo ? "bg-red-600 py-[20px]" : "bg-gray-200"
              }`}
              // Dynamically set aspect ratio: 16/9 for video, 35/18 for images
              style={{ aspectRatio: isVideo ? "16 / 9" : "35 / 18" }}
            >
              {isVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  // Changed object-cover to object-contain to prevent cropping
                  className="w-full h-full object-contain"
                >
                  <source src={panel.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={panel.src}
                  alt={`Panel ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PanelGrid;
