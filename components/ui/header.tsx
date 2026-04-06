"use client";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

const Header = () => {
  const letters = [
    { letter: "A", href: "#are-you-ready", id: "are-you-ready" },
    {
      letter: "B",
      href: "#charge-organisational-batteries",
      id: "charge-organisational-batteries",
    },
    {
      letter: "C",
      href: "#challenge-limiting-beliefs",
      id: "challenge-limiting-beliefs",
    },
    {
      letter: "D",
      href: "#reset-strategic-direction",
      id: "reset-strategic-direction",
    },
    { letter: "E", href: "#build-two-engines", id: "build-two-engines" },
    { letter: "F", href: "#ecosystems-thinking", id: "ecosystems-thinking" },
  ];

  const navLinks = [
    { text: "WHY WE STARTED", href: "#why-we-started", id: "why-we-started" },
    { text: "WHO WE ARE", href: "#who-we-are", id: "who-we-are" },
    { text: "CONTACT", href: "contact" },
  ];

  const allIds: string[] = [
    "landing-page",
    ...letters.map((l) => l.id),
    ...navLinks.map((n) => n.id).filter((id): id is string => id !== undefined), // This is the magic filter
  ];
  const activeId = useScrollSpy(allIds);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEFEFE] border-b-[4px] border-gray-200 px-12 pb-3 pt-4 font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo Section - Aligned Left */}
        <a className="flex-shrink-0" href="#landing-page">
          <img
            src={`${prefix}/nfn_logo.webp`}
            alt="NowForNext"
            className="w-[160px] h-auto"
          />
        </a>

        {/* Letter Icons Section - Centered with specific spacing */}
        <div className="flex items-center gap-10">
          {letters.map((item) => (
            <a
              key={item.letter}
              href={item.href}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-200 cursor-pointer
              ${
                activeId === item.id
                  ? "bg-[#1B286B] text-white" // Active Style (Matching hover)
                  : "bg-[#BCC6D1] text-white hover:bg-[#1B286B]"
              }`}
            >
              {item.letter}
            </a>
          ))}
        </div>

        {/* Nav Links Section - Aligned Right with consistent gaps */}
        <nav className="flex items-center gap-12">
          {navLinks.map((item) => (
            <a
              key={item.text}
              href={item.href}
              className={`font-bold text-m tracking-widest transition-colors duration-200 whitespace-nowrap
              ${
                activeId === item.id
                  ? "text-[#2D3E61]" // Active Style
                  : "text-[#8A9AB0] hover:text-[#2D3E61]"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
