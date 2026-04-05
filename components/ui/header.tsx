import React from "react";

const Header = () => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const navLinks = ["WHY WE STARTED", "WHO WE ARE", "CONTACT"];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-8 py-4 font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif]">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex flex-col">
          <div className="w-[180px] h-[45px] bg-[#2D3E61] rounded-sm mb-1" />
          <span className="text-[10px] tracking-widest text-[#8A9AB0] font-bold uppercase ml-1">
            true future value
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center gap-6 lg:gap-10">
          {/* Circular Letter Icons */}
          <div className="flex items-center gap-3 border-r border-gray-200 pr-10">
            {letters.map((letter) => (
              <div
                key={letter}
                className="w-8 h-8 rounded-full bg-[#BCC6D1] flex items-center justify-center text-white font-bold text-sm"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Text Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#8A9AB0] font-bold text-[13px] tracking-wide hover:text-[#2D3E61] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
