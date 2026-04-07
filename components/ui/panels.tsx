"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

// CONFIGURATION: Match these numbers to your FFmpeg output
const SEQUENCES = {
  intro: {
    id: "landing-page",
    totalFrames: 71,
    directory: `${prefix}/sequences/intro`,
  },
  outro: {
    id: "who-we-are",
    totalFrames: 137,
    directory: `${prefix}/sequences/outro`,
  },
};

const PANELS_DATA = [
  { type: "sequence", sequenceKey: "intro", id: "landing-page" },
  { type: "image", src: `${prefix}/a-block.webp`, id: "are-you-ready" },
  { type: "image", src: `${prefix}/b-block.webp`, id: "charge-organisational-batteries" },
  { type: "image", src: `${prefix}/c-block.webp`, id: "challenge-limiting-beliefs" },
  { type: "image", src: `${prefix}/d-block.webp`, id: "reset-strategic-direction" },
  { type: "image", src: `${prefix}/e-block.webp`, id: "build-two-engines" },
  { type: "image", src: `${prefix}/f-block.webp`, id: "ecosystems-thinking" },
  {
    type: "youtube",
    src: "https://www.youtube.com/embed/G1hKzCkywM8",
    id: "why-we-started",
  },
  { type: "sequence", sequenceKey: "outro", id: "who-we-are" },
];

const PanelGrid = ({ activeId }: { activeId: string }) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const frameRefs = useRef<number[]>([]);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement[] }>({ intro: [], outro: [] });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // 1. Preload Images on Mount
  useEffect(() => {
    Object.entries(SEQUENCES).forEach(([key, config]) => {
      const frames: HTMLImageElement[] = [];
      for (let i = 1; i <= config.totalFrames; i++) {
        const img = new Image();
        img.src = `${config.directory}/${key}_frame_${i.toString().padStart(4, "0")}.webp`;
        console.log(img.src);
        frames[i] = img;
      }
      imagesRef.current[key] = frames;
    });
  }, []);

  // 2. The Animation & Scroll Loop
  useEffect(() => {
    let animationFrameId: number;

    const renderCanvas = () => {
      PANELS_DATA.forEach((panel, index) => {
        if (panel.type !== "sequence") return;

        const container = containerRefs.current[index];
        const canvas = canvasRefs.current[index];
        const context = canvas?.getContext("2d");
        const sequence = imagesRef.current[panel.sequenceKey as "intro" | "outro"];
        const config = SEQUENCES[panel.sequenceKey as "intro" | "outro"];

        if (container && canvas && context && sequence.length > 0) {
          const rect = container.getBoundingClientRect();
          
          // Calculate progress (0 to 1)
          const scrollableHeight = rect.height - window.innerHeight;
          const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
          
          // Determine which frame to draw
          const targetFrameIndex = Math.max(1, Math.min(config.totalFrames, Math.ceil(progress * config.totalFrames)));
          
          if (frameRefs.current[index] === undefined) {
             frameRefs.current[index] = 1;
          }

          frameRefs.current[index] += (targetFrameIndex - frameRefs.current[index]) * 0.12;
          
          const currentFrame = Math.round(frameRefs.current[index]);
          const img = sequence[currentFrame];

          if (img && img.complete) {
            // Clear and draw with "Cover" logic
            context.clearRect(0, 0, canvas.width, canvas.height);
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio); // Use Math.min for "Contain"
            const x = (canvas.width - img.width * ratio) / 2;
            const y = (canvas.height - img.height * ratio) / 2;
            
            context.drawImage(img, 0, 0, img.width, img.height, x, y, img.width * ratio, img.height * ratio);
          }
        }
      });
      animationFrameId = requestAnimationFrame(renderCanvas);
    };

    animationFrameId = requestAnimationFrame(renderCanvas);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 3. Scroll Indicator Logic
  const handleScroll = useCallback(() => {
    const introContainer = containerRefs.current[0];
    const outroContainer = containerRefs.current[8];
    let shouldShow = false;

    if (introContainer) {
      const rect = introContainer.getBoundingClientRect();
      if (rect.top > -150) shouldShow = true;
    }
    if (outroContainer && !shouldShow) {
      const rect = outroContainer.getBoundingClientRect();
      if (rect.top <= 50 && rect.top > -150) shouldShow = true;
    }
    setShowScrollIndicator(shouldShow);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <main className="w-full">
      {PANELS_DATA.map((panel, index) => {
        if (panel.type === "sequence") {
          return (
            <div
              key={index}
              ref={(el) => { containerRefs.current[index] = el; }}
              className="relative h-[400vh] bg-[#FEFEFE]"
              id={panel.id}
            >
              <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                  ref={(el) => { canvasRefs.current[index] = el; }}
                  width={1920}
                  height={1080}
                  className="w-[90%] lg:w-[80%] h-full object-contain"
                />
              </div>
            </div>
          );
        }

        if (panel.type === "youtube") {
          return (
            <div key={index} id={panel.id} className="relative w-full bg-[#FEFEFE] flex items-center justify-center py-20 aspect-[35/18]">
              <div className="w-[80%] lg:w-[60%] max-w-[1200px] aspect-video">
                <iframe
                  className="w-full h-full"
                  src={panel.src}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        }

        return (
          <div key={index} id={panel.id} className="relative w-full bg-gray-200 overflow-hidden aspect-[35/18]">
            <img src={panel.src} alt="Panel" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        );
      })}

      {showScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce text-[#9EA9BA] flex flex-col items-center">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 13l5 5 5-5" /><line x1="12" y1="2" x2="12" y2="18" />
          </svg>
        </div>
      )}
    </main>
  );
};

export default PanelGrid;