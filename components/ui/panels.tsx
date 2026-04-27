"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { SECTION_IDS, SectionId } from "@/config/sections";



// CONFIGURATION: Match these numbers to your FFmpeg output
const SEQUENCES = {
  intro: {
    id: "landing-page",
    totalFrames: 125,
    directory: `/sequences/intro`,
  },
  outro: {
    id: "what-we-offer",
    totalFrames: 129,
    directory: `/sequences/outro`,
  },
};

type ImagePanel = {
  type: "image";
  src: string;
  mobileSrc?: string;
  id: SectionId;
};
type VideoPanel = { type: "video"; src: string; id: SectionId };
type SequencePanel = {
  type: "sequence";
  sequenceKey: "intro" | "outro";
  id: SectionId;
};
type ContactPanel = { type: "contact"; id: SectionId };
type WhoWeArePanel = { type: "who-we-are"; id: SectionId };
type ClientsPanel = { type: "clients"; id: SectionId };
type PanelData =
  | ImagePanel
  | VideoPanel
  | SequencePanel
  | ContactPanel
  | WhoWeArePanel
  | ClientsPanel;

const PANELS_DATA: PanelData[] = [
  { type: "sequence", sequenceKey: "intro", id: SECTION_IDS[0] },
  {
    type: "image",
    src: `/desktop/a-block.webp`,
    mobileSrc: `/mobile/a-block-mobile.webp`,
    id: SECTION_IDS[1],
  },
  {
    type: "image",
    src: `$/desktop/b-block.webp`,
    mobileSrc: `$/mobile/b-block-mobile.webp`,
    id: SECTION_IDS[2],
  },
  {
    type: "image",
    src: `$/desktop/c-block.webp`,
    mobileSrc: `$/mobile/c-block-mobile.webp`,
    id: SECTION_IDS[3],
  },
  {
    type: "image",
    src: `$/desktop/d-block.webp`,
    mobileSrc: `$/mobile/d-block-mobile.webp`,
    id: SECTION_IDS[4],
  },
  {
    type: "image",
    src: `$/desktop/e-block.webp`,
    mobileSrc: `$/mobile/e-block-mobile.webp`,
    id: SECTION_IDS[5],
  },
  {
    type: "image",
    src: `$/desktop/f-block.webp`,
    mobileSrc: `$/mobile/f-block-mobile.webp`,
    id: SECTION_IDS[6],
  },
  {
    type: "video",
    src: "https://player.vimeo.com/video/1186999497?title=0&byline=0&portrait=0",
    id: SECTION_IDS[7],
  },
  { type: "who-we-are", id: SECTION_IDS[8] },
  { type: "sequence", sequenceKey: "outro", id: SECTION_IDS[9] },
  { type: "clients", id: SECTION_IDS[10] },
  { type: "contact", id: SECTION_IDS[11] },
];

// ─── Who We Are Panel ──────────────────────────────────────────────────────────
const WhoWeArePanel = ({ id }: { id: SectionId }) => {
  const sections = [
    {
      heading: "WHO WE ARE",
      body: "Now for Next is a network organisation of boutique consultancy firms, who find each other in their shared values.",
    },
    {
      heading: "WHAT VALUE WE DELIVER",
      body: "Now for Next supports value driven CEOs and their teams to make their organisations 21st century ready.",
    },
    {
      heading: "WHY WE DO WHAT WE DO",
      body: "We accelerate NOW, to create true future value NEXT.",
    },
    {
      heading: "WHAT WE DO",
      body: "Support you to make your long term business transformation agenda happen, with the ability to unlock high quality expertise, when you need it.",
    },
  ];

  return (
    <div
      id={id}
      className="
        relative w-full bg-[#FEFEFE]
        min-h-[70vh]
        flex items-center
        px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36
        py-16 sm:py-20
      "
    >
      <div className="w-full max-w-[860px]">
        {sections.map((s) => (
          <div key={s.heading} className="mb-10 last:mb-0">
            <h2
              className="
                mb-3
                text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] xl:text-[3rem]
                font-extrabold leading-tight tracking-tight
              "
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: "#1B286B",
              }}
            >
              {s.heading}
            </h2>
            <p
              className="
                text-[0.95rem] sm:text-[1rem] md:text-[1.05rem] lg:text-[1.1rem]
                leading-relaxed
              "
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: "#1B286B",
                fontWeight: 400,
              }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Contact Panel Component ───────────────────────────────────────────────────
const ContactPanel = ({ id }: { id: SectionId }) => {
  const subject = "NowForNext";
  const bodyText = "Name:\n\nEmail:\n\nHow could we help:";

  return (
    <div
      id={id}
      className="relative w-full bg-[#FEFEFE] flex flex-col md:flex-row min-h-[85vh] gap-5 p-5"
    >
      {/* Left — image */}
      <div className="w-full md:w-1/2 overflow-hidden md:block hidden mb-5">
        <img
          src={`$/tafel.webp`}
          alt="Contact"
          className="w-full h-full object-cover"
          style={{ minHeight: "320px" }}
        />
      </div>

      {/* Right — contact info */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-16 md:py-0 mb-5"
        style={{ backgroundColor: "#EDEFF2" }}
      >
        <h2
          className="
                  self-start mb-6 sm:mb-8 md:mb-10
                  text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] xl:text-[3rem]
                  font-extrabold leading-tight tracking-tight
                "
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: "#1B286B",
          }}
        >
          CONTACT
        </h2>

        <div className="mb-10">
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              color: "#1B286B",
              lineHeight: 1.8,
            }}
          >
            For more information:
            <br />
            {/* First Email Link */}
            <a
              href={`mailto:info@nowfornext.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                color: "#9EA9BA",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                userSelect: "text",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#1B286B";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>(
                    ".email-arrow",
                  );
                if (arrow) {
                  arrow.style.opacity = "1";
                  arrow.style.transform = "translateX(3px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#9EA9BA";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>(
                    ".email-arrow",
                  );
                if (arrow) {
                  arrow.style.opacity = "0";
                  arrow.style.transform = "translateX(0)";
                }
              }}
            >
              info@nowfornext.org
              <span
                className="email-arrow"
                style={{
                  opacity: 0,
                  transform: "translateX(0)",
                  transition: "opacity 0.2s, transform 0.2s",
                  fontSize: "0.9em",
                  lineHeight: 1,
                }}
              >
                →
              </span>
            </a>
            <br />
            {/* Second Email Link */}
            <a
              href={`mailto:anne.kloosterboer@nowfornext.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                color: "#9EA9BA",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                userSelect: "text",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#1B286B";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>(
                    ".email-arrow",
                  );
                if (arrow) {
                  arrow.style.opacity = "1";
                  arrow.style.transform = "translateX(3px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#9EA9BA";
                const arrow =
                  e.currentTarget.querySelector<HTMLSpanElement>(
                    ".email-arrow",
                  );
                if (arrow) {
                  arrow.style.opacity = "0";
                  arrow.style.transform = "translateX(0)";
                }
              }}
            >
              anne.kloosterboer@nowfornext.org
              <span
                className="email-arrow"
                style={{
                  opacity: 0,
                  transform: "translateX(0)",
                  transition: "opacity 0.2s, transform 0.2s",
                  fontSize: "0.9em",
                  lineHeight: 1,
                }}
              >
                →
              </span>
            </a>
          </p>

          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              color: "#1B286B",
              lineHeight: 1.8,
            }}
          >
            <br />
            Looking forward to connect!
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Clients Panel ────────────────────────────────────────────────────────────
const ClientsPanel = ({ id }: { id: SectionId }) => {
  const logos = [
    { src: `$/logos/kiwa_logo.webp`, alt: "kiwa_logo" },
    { src: `$/logos/vanoord_logo.webp`, alt: "vanoord_logo" },
    { src: `$/logos/pon_logo.webp`, alt: "pon_logo" },
    { src: `$/logos/dsm_logo.webp`, alt: "dsm_logo" },
    { src: `$/logos/stoltnielsen_logo.webp`, alt: "stoltnielsen_logo" },
    { src: `$/logos/tpvision_logo.webp`, alt: "tpvision_logo" },
    { src: `$/logos/swapfiets_logo.webp`, alt: "swapfiets_logo" },
    { src: `$/logos/shv_logo.webp`, alt: "shv_logo" },
    { src: `$/logos/vinci_logo.webp`, alt: "vinci_logo" },
    { src: `$/logos/campina_logo.webp`, alt: "campina_logo" },
    { src: `$/logos/jumbo_logo.webp`, alt: "jumbo_logo" },
    { src: `$/logos/johnson_logo.webp`, alt: "johnson_logo" },
  ];

  return (
    <div id={id} className="relative w-full bg-[#FEFEFE]">
      <div className="flex flex-col md:flex-row min-h-[30vh] md:min-h-[85vh] gap-5 p-5">
        {/* Left — heading + intro text */}
        <div
          className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 lg:px-24 py-16 md:py-0 mb-5"
          style={{ backgroundColor: "#EDEFF2" }}
        >
          <h2
            className="
                  self-start mb-6 sm:mb-8 md:mb-10
                  text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] xl:text-[3rem]
                  font-extrabold leading-tight tracking-tight
                "
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1B286B",
            }}
          >
            OUR CLIENTS
          </h2>
          <p
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              color: "#1B286B",
              lineHeight: 1.8,
            }}
          >
            We are proud to work with a diverse range of organisations that
            share our commitment to meaningful, lasting business transformation.
          </p>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 overflow-hidden md:block hidden mb-5">
          <img
            src={`$/rups.webp`}
            alt="Our clients"
            className="w-full h-full object-cover"
            style={{ minHeight: "320px" }}
          />
        </div>
      </div>

      {/* Bottom: logo grid */}
      <div
        className="
          px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36
          py-12 sm:py-16
        "
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-10 gap-y-10 sm:gap-x-14 sm:gap-y-12 md:gap-x-16 md:gap-y-14">
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="flex items-center justify-center p-2"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] h-auto object-contain"
                style={{ filter: "grayscale(100%)", opacity: 0.85 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Main PanelGrid ────────────────────────────────────────────────────────────
const PanelGrid = ({ activeId }: { activeId: string }) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const frameRefs = useRef<number[]>([]);
  const imagesRef = useRef<{ [key: string]: HTMLImageElement[] }>({
    intro: [],
    outro: [],
  });
  const layoutCacheRef = useRef<{ top: number; height: number }[]>([]);
  const scrollYRef = useRef(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // 1. Preload images
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

  // 1.5 Cache layout positions
  useEffect(() => {
    const updateLayoutCache = () => {
      layoutCacheRef.current = containerRefs.current.map((el) => {
        if (!el) return { top: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
      });
    };

    // Utilize ResizeObserver to correctly update layout when images load on mobile
    const observer = new ResizeObserver(updateLayoutCache);
    observer.observe(document.body);

    const timer = setTimeout(updateLayoutCache, 50);
    window.addEventListener("resize", updateLayoutCache);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLayoutCache);
      observer.disconnect();
    };
  }, []);

  // 2. Animation & scroll loop
  useEffect(() => {
    let animationFrameId: number;

    const renderCanvas = () => {
      PANELS_DATA.forEach((panel, index) => {
        if (panel.type !== "sequence") return;

        const canvas = canvasRefs.current[index];
        const context = canvas?.getContext("2d");
        const sequence =
          imagesRef.current[panel.sequenceKey as "intro" | "outro"];
        const config = SEQUENCES[panel.sequenceKey as "intro" | "outro"];
        const layoutCache = layoutCacheRef.current[index];

        if (layoutCache && canvas && context && sequence.length > 0) {
          const rectTop = layoutCache.top - scrollYRef.current;
          const scrollableHeight = layoutCache.height - window.innerHeight;
          const progress = Math.max(
            0,
            Math.min(1, -rectTop / scrollableHeight),
          );
          const targetFrameIndex = Math.max(
            1,
            Math.min(
              config.totalFrames,
              Math.ceil(progress * config.totalFrames),
            ),
          );

          if (frameRefs.current[index] === undefined)
            frameRefs.current[index] = 1;
          frameRefs.current[index] +=
            (targetFrameIndex - frameRefs.current[index]) * 0.12;

          const currentFrame = Math.round(frameRefs.current[index]);
          const img = sequence[currentFrame];

          if (img && img.complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio);
            const x = (canvas.width - img.width * ratio) / 2;
            const y = (canvas.height - img.height * ratio) / 2;
            context.drawImage(
              img,
              0,
              0,
              img.width,
              img.height,
              x,
              y,
              img.width * ratio,
              img.height * ratio,
            );
          }
        }
      });
      animationFrameId = requestAnimationFrame(renderCanvas);
    };

    animationFrameId = requestAnimationFrame(renderCanvas);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 3. Scroll indicator — intro at index 0, outro at index 9
  const handleScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;

    const introLayout = layoutCacheRef.current[0];
    const outroLayout = layoutCacheRef.current[9];
    let shouldShow = false;

    if (introLayout) {
      const top = introLayout.top - scrollYRef.current;
      if (top > -150) shouldShow = true;
    }
    if (outroLayout && !shouldShow) {
      const top = outroLayout.top - scrollYRef.current;
      if (top <= 500 && top > -150) shouldShow = true;
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
        // ── Who We Are ──────────────────────────────────────────────────────
        if (panel.type === "who-we-are") {
          return (
            <div
              key={index}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
            >
              <WhoWeArePanel id={panel.id} />
            </div>
          );
        }

        // ── Clients ─────────────────────────────────────────────────────────
        if (panel.type === "clients") {
          return (
            <div
              key={index}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
            >
              <ClientsPanel id={panel.id} />
            </div>
          );
        }

        // ── Contact ─────────────────────────────────────────────────────────
        if (panel.type === "contact") {
          return (
            <div
              key={index}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
            >
              <ContactPanel id={panel.id} />
            </div>
          );
        }

        // ── Sequence ────────────────────────────────────────────────────────
        if (panel.type === "sequence") {
          return (
            <div
              key={index}
              id={panel.id}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
              className="w-full"
            >
              <div className="relative h-[400vh] bg-[#FEFEFE]">
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[index] = el;
                    }}
                    width={1920}
                    height={1080}
                    className={`w-[90%] lg:w-[80%] h-full object-contain ${
                      panel.sequenceKey === "outro"
                        ? "md:scale-[0.8] scale-[1.2]"
                        : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        }

        // ── Video ───────────────────────────────────────────────────────────
        if (panel.type === "video") {
          return (
            <div
              key={index}
              id={panel.id}
              ref={(el) => {
                containerRefs.current[index] = el;
              }}
              className="
                relative w-full bg-[#FEFEFE]
                flex flex-col items-center justify-center
                px-8 sm:px-12 md:px-20 lg:px-28 xl:px-36
                pt-14 sm:pt-16 md:pt-20
                pb-12 sm:pb-14 md:pb-16
                aspect-[35/18]
              "
            >
              <h2
                className="
                  self-start mb-6 sm:mb-8 md:mb-10
                  text-[1.6rem] sm:text-[2rem] md:text-[2.4rem] lg:text-[2.8rem] xl:text-[3rem]
                  font-extrabold leading-tight tracking-tight
                "
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  color: "#1B286B",
                }}
              >
                WHY WE STARTED
              </h2>
              <div className="w-full max-w-[1200px] aspect-video">
                <iframe
                  className="w-full h-full"
                  src={panel.src}
                  title="Vimeo video"
                  allowFullScreen
                />
              </div>
            </div>
          );
        }

        // ── Image ───────────────────────────────────────────────────────────
        const isMobileVariant = panel.type === "image" && "mobileSrc" in panel;
        const mobileClasses = isMobileVariant
          ? "md:aspect-[35/18]"
          : "aspect-[35/18]";

        return (
          <div
            key={index}
            id={panel.id}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className={`relative w-full bg-gray-200 overflow-hidden ${mobileClasses}`}
          >
            {isMobileVariant && panel.mobileSrc ? (
              <picture>
                <source media="(min-width: 500px)" srcSet={panel.src} />
                <img
                  src={panel.mobileSrc}
                  alt="Panel"
                  className="block w-full h-auto object-cover md:absolute md:inset-0 md:h-full"
                />
              </picture>
            ) : (
              <img
                src={panel.src}
                alt="Panel"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        );
      })}

      {showScrollIndicator && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-bounce text-[#9EA9BA] flex flex-col items-center">
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
      )}
    </main>
  );
};

export default PanelGrid;
