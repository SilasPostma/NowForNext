"use client";
import { useState } from "react";

const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

interface HeaderProps {
  activeId: string;
}

const Header: React.FC<HeaderProps> = ({ activeId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const email = "test@gmail.com";
  const subject = "Inquiry from NowForNext website";
  const bodyText = `Hello,

I am interested in your services and would like to learn more.

Best regards,

[Your Name]
[Organization]
[Phone Number]
[Email Address]`;

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  const handleMailClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Could not copy email address:", err);
    }
  };

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
    { text: "CONTACT", href: mailtoLink },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEFEFE] px-4 xl:px-6 pb-3 pt-4 font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif] select-none">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <a
          className="flex-shrink-0 relative w-[180px] h-[65px]"
          href="#landing-page"
          onClick={() => setMenuOpen((prev) => !prev)}
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

        <div className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-10">
          {letters.map((item) => (
            <a
              key={item.letter}
              href={item.href}
              className={`w-9 h-9 xl:w-12 xl:h-12 rounded-full flex items-center justify-center font-bold text-lg xl:text-xl transition-colors duration-200 cursor-pointer
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

        <nav className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-10">
          {navLinks.map((item) => (
            <a
              key={item.text}
              href={item.href}
              onClick={item.text === "CONTACT" ? handleMailClick : undefined}
              target={item.text === "CONTACT" ? "_blank" : undefined}
              rel={item.text === "CONTACT" ? "noopener noreferrer" : undefined}
              className={`font-bold text-m xl:text-lg tracking-widest transition-colors duration-200 whitespace-nowrap
              ${
                activeId === item.id
                  ? "text-[#2D3E61]"
                  : "text-[#9EA9BA] hover:text-[#2D3E61]"
              }`}
            >
              {item.text === "CONTACT" && copied ? "EMAIL COPIED" : item.text}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FEFEFE]  transition hover:text-[#2D3E61] text-[#8A9AB0] lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M6 18L18 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#FEFEFE] px-4 pb-6 pt-4 items-start max-w-xs">
          <div className="grid grid-cols-3 gap-3 m:gap-4">
            {letters.map((item) => (
              <a
                key={item.letter}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex h-14 w-14 xl:h-16 xl:w-16 items-center justify-center rounded-full font-bold text-lg xl:text-xl transition-colors duration-200
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
                onClick={
                  item.text === "CONTACT"
                    ? () => handleMailClick()
                    : () => setMenuOpen(false)
                }
                target={item.text === "CONTACT" ? "_blank" : undefined}
                rel={
                  item.text === "CONTACT" ? "noopener noreferrer" : undefined
                }
                className={`pl-1 py-3 text-center font-bold tracking-widest text-sm xl:text-base transition-colors duration-200 
                  ${
                    activeId === item.id
                      ? "text-[#1B286B]"
                      : "text-[#9EA9BA] hover:text-[#1B286B]"
                  }
                  `}
              >
                {item.text === "CONTACT" && copied ? "EMAIL COPIED" : item.text}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-[5%] bottom-0 h-[4px] bg-gray-200 " />
    </header>
  );
};

export default Header;
