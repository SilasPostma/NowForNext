"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { SECTION_IDS, SectionId } from "@/config/sections";

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

type ImagePanel = { type: "image"; src: string; mobileSrc?: string; id: SectionId; };
type VideoPanel = { type: "video"; src: string; id: SectionId; };
type SequencePanel = { type: "sequence"; sequenceKey: "intro" | "outro"; id: SectionId; mobileImages?: string[]; };
type PanelData = ImagePanel | VideoPanel | SequencePanel;

const PANELS_DATA: PanelData[] = [
  { type: "sequence", sequenceKey: "intro", id: SECTION_IDS[0] },
  { type: "image", src: `${prefix}/a-block.webp`, mobileSrc: `${prefix}/a-block-mobile.webp`, id: SECTION_IDS[1] },
  { type: "image", src: `${prefix}/b-block.webp`, mobileSrc: `${prefix}/b-block-mobile.webp`, id: SECTION_IDS[2] },
  { type: "image", src: `${prefix}/c-block.webp`, mobileSrc: `${prefix}/c-block-mobile.webp`, id: SECTION_IDS[3] },
  { type: "image", src: `${prefix}/d-block.webp`, mobileSrc: `${prefix}/d-block-mobile.webp`, id: SECTION_IDS[4] },
  { type: "image", src: `${prefix}/e-block.webp`, mobileSrc: `${prefix}/e-block-mobile.webp`, id: SECTION_IDS[5] },
  { type: "image", src: `${prefix}/f-block.webp`, mobileSrc: `${prefix}/f-block-mobile.webp`, id: SECTION_IDS[6] },
  {
    type: "video",
    src: "https://player.vimeo.com/video/655102517?title=0&byline=0&portrait=0",
    id: SECTION_IDS[7],
  },
  { 
    type: "sequence", 
    sequenceKey: "outro", 
    id: SECTION_IDS[8],
    mobileImages: [`${prefix}/animation_1_mobile.webp`, `${prefix}/animation_2_mobile.webp`]
  },
];

const PanelGrid = ({ activeId }: { activeId: string }) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const frameRefs = useRef<number[]>([]);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement[] }>({ intro: [], outro: [] });
  const layoutCacheRef = useRef<{top: number, height: number}[]>([]);
  const scrollYRef = useRef(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // 1. Preload Images on Mount
  useEffect(() => {
    Object.entries(SEQUENCES).forEach(([key, config]) => {
      const frames: HTMLImageElement[] = [];
      for (let i = 1; i <= config.totalFrames; i++) {
        const img = new Image();
        img.src = `${config.directory}/${key}_frame_${i.toString().padStart(4, "0")}.webp`;
        frames[i] = img;
      }
      imagesRef.current[key] = frames;
    });
  }, []);

  // 1.5 Cache layout positions to prevent layout thrashing
  useEffect(() => {
    const updateLayoutCache = () => {
      layoutCacheRef.current = containerRefs.current.map((el) => {
        if (!el) return { top: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
      });
    };

    // Minor delay to ensure images/fonts have settled layout
    const timer = setTimeout(updateLayoutCache, 50);
    window.addEventListener("resize", updateLayoutCache);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLayoutCache);
    };
  }, []);

  // 2. The Animation & Scroll Loop
  useEffect(() => {
    let animationFrameId: number;

    const renderCanvas = () => {
      PANELS_DATA.forEach((panel, index) => {
        if (panel.type !== "sequence") return;

        // Skip rendering sequence on mobile if it has mobileImages alternative
        if (window.innerWidth < 768 && panel.mobileImages && panel.mobileImages.length > 0) return;

        const canvas = canvasRefs.current[index];
        const context = canvas?.getContext("2d");
        const sequence = imagesRef.current[panel.sequenceKey as "intro" | "outro"];
        const config = SEQUENCES[panel.sequenceKey as "intro" | "outro"];
        const layoutCache = layoutCacheRef.current[index];

        if (layoutCache && canvas && context && sequence.length > 0) {
          const rectTop = layoutCache.top - scrollYRef.current;
          
          // Calculate progress (0 to 1)
          const scrollableHeight = layoutCache.height - window.innerHeight;
          const progress = Math.max(0, Math.min(1, -rectTop / scrollableHeight));
          
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

  // 3. Scroll Indicator Logic & Tracking
  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;

    const introLayout = layoutCacheRef.current[0];
    const outroLayout = layoutCacheRef.current[8];
    let shouldShow = false;

    if (introLayout) {
      const top = introLayout.top - scrollYRef.current;
      if (top > -150) shouldShow = true;
    }
    if (outroLayout && !shouldShow) {
      const top = outroLayout.top - scrollYRef.current;
      if (top <= 50 && top > -150) shouldShow = true;
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
          const mobileImgs = panel.mobileImages;
          const hasMobileImages = Array.isArray(mobileImgs) && mobileImgs.length > 0;

          return (
            <div 
              key={index} 
              id={panel.id}
              ref={(el) => { containerRefs.current[index] = el; }}
              className="w-full"
            >
              <div className={`relative h-[400vh] bg-[#FEFEFE] ${hasMobileImages ? "hidden md:block" : ""}`}>
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                  <canvas
                    ref={(el) => { canvasRefs.current[index] = el; }}
                    width={1920}
                    height={1080}
                    className="w-[90%] lg:w-[80%] h-full object-contain"
                  />
                </div>
              </div>

              {hasMobileImages && mobileImgs && (
                <div className="md:hidden flex flex-col w-full bg-[#FEFEFE]">
                  {mobileImgs.map((src, imgIndex) => (
                    <img key={imgIndex} src={src} alt={`Mobile Animation ${imgIndex + 1}`} className="w-full h-auto block" />
                  ))}
                </div>
              )}
            </div>
          );
        }

        if (panel.type === "video") {
          return (
            <div key={index} id={panel.id} className="relative w-full bg-[#FEFEFE] flex items-center justify-center py-20 aspect-[35/18]">
              <div className="w-[80%] lg:w-[60%] max-w-[1200px] aspect-video">
                <iframe
                  className="w-full h-full"
                  src={panel.src}
                  title="Vimeo video"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          );
        }

        const isMobileVariant = panel.type === "image" && "mobileSrc" in panel;
        const mobileClasses = isMobileVariant ? "md:aspect-[35/18]" : "aspect-[35/18]";

        return (
          <div key={index} id={panel.id} className={`relative w-full bg-gray-200 overflow-hidden ${mobileClasses}`}>
            {isMobileVariant && panel.mobileSrc ? (
              <picture>
                <source media="(min-width: 768px)" srcSet={panel.src} />
                <img src={panel.mobileSrc} alt="Panel" className="block w-full h-auto object-cover md:absolute md:inset-0 md:h-full" />
              </picture>
            ) : (
              <img src={panel.src} alt="Panel" className="absolute inset-0 w-full h-full object-cover" />
            )}
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