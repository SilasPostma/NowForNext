"use client";
import { useState } from "react";
import { SECTION_IDS, SectionId } from "@/config/sections";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

interface HeaderProps {
  activeId: string;
}

const Header: React.FC<HeaderProps> = ({ activeId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const letters: { letter: string; href: string; id: SectionId }[] = [
    { letter: "A", href: `#${SECTION_IDS[1]}`, id: SECTION_IDS[1] },
    { letter: "B", href: `#${SECTION_IDS[2]}`, id: SECTION_IDS[2] },
    { letter: "C", href: `#${SECTION_IDS[3]}`, id: SECTION_IDS[3] },
    { letter: "D", href: `#${SECTION_IDS[4]}`, id: SECTION_IDS[4] },
    { letter: "E", href: `#${SECTION_IDS[5]}`, id: SECTION_IDS[5] },
    { letter: "F", href: `#${SECTION_IDS[6]}`, id: SECTION_IDS[6] },
  ];

  const navLinks: { text: string; href: string; id?: SectionId }[] = [
    { text: "WHY WE STARTED", href: `#${SECTION_IDS[7]}`, id: SECTION_IDS[7] },
    { text: "WHO WE ARE",     href: `#${SECTION_IDS[8]}`, id: SECTION_IDS[8] },
    { text: "WHAT WE OFFER",  href: `#${SECTION_IDS[9]}`, id: SECTION_IDS[9] },
    { text: "CLIENTS",        href: `#${SECTION_IDS[10]}`, id: SECTION_IDS[10] },
    { text: "CONTACT",        href: `#${SECTION_IDS[11]}`, id: SECTION_IDS[11] },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEFEFE] px-4 xl:px-6 pb-3 pt-4 font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif] select-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        {/* Logo */}
        <a
          className="flex-shrink-0 relative w-[180px] h-[65px]"
          href="#landing-page"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src={`${prefix}/nfn_logo.webp`}
            alt="NowForNext"
            className={`absolute inset-0 w-full h-auto transition-opacity duration-300 ease-in-out pt-1 ${
              activeId === "landing-page" ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={`${prefix}/nfn_logo_reverse.webp`}
            alt="NowForNext"
            className={`absolute inset-0 w-full h-auto transition-opacity duration-300 ease-in-out pt-1 ${
              activeId === "landing-page" ? "opacity-100" : "opacity-0"
            }`}
          />
        </a>

        {/* Letter circles — desktop */}
        {/* Gap tightened at lg to leave room for 4 nav links; opens up at xl */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-8">
          {letters.map((item) => (
            <a
              key={item.letter}
              href={item.href}
              className={`w-8 h-8 xl:w-11 xl:h-11 rounded-full flex items-center justify-center font-bold text-base xl:text-xl transition-colors duration-200 cursor-pointer
              ${
                activeId === item.id
                  ? "bg-[#1B286B] text-white"
                  : "bg-[#BCC6D1] text-white hover:bg-[#1B286B]"
              }`}
            >
              {item.letter}
            </a>
          ))}
        </div>

        {/* Text nav links — desktop */}
        {/* Text size steps down at lg and back up at xl; gap follows same pattern */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-5 xl:gap-8">
          {navLinks.map((item) => (
            <a
              key={item.text}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`font-bold text-[0.65rem] xl:text-base tracking-widest transition-colors duration-200 whitespace-nowrap
              ${
                activeId === item.id
                  ? "text-[#2D3E61]"
                  : "text-[#9EA9BA] hover:text-[#2D3E61]"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>

        {/* Hamburger — mobile / tablet */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FEFEFE] transition hover:text-[#2D3E61] text-[#8A9AB0] lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12" />
              <path d="M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#FEFEFE] px-4 pb-6 pt-4 shadow-xl border-b border-gray-200">
          <div className="grid grid-cols-3 gap-3">
            {letters.map((item) => (
              <a
                key={item.letter}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex h-14 w-14 items-center justify-center rounded-full font-bold text-lg transition-colors duration-200
                ${
                  activeId === item.id
                    ? "bg-[#1B286B] text-white"
                    : "bg-[#BCC6D1] text-white hover:bg-[#1B286B]"
                }`}
              >
                {item.letter}
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-start gap-3">
            {navLinks.map((item) => (
              <a
                key={item.text}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`pl-1 py-3 font-bold tracking-widest text-sm transition-colors duration-200
                  ${
                    activeId === item.id
                      ? "text-[#1B286B]"
                      : "text-[#9EA9BA] hover:text-[#1B286B]"
                  }`}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-[5%] bottom-0 h-[4px] bg-gray-200" />
    </header>
  );
};

export default Header;