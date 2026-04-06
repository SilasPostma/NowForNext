const prefix = process.env.NODE_ENV === "production" ? "/NowForNext" : "";

const Header = () => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const navLinks = ["WHY WE STARTED", "WHO WE ARE", "CONTACT"];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FEFEFE] border-b-[4px] border-gray-200 px-12 pb-3 pt-4 font-['Helvetica_Neue',_Helvetica,_Arial,_sans-serif]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        {/* Logo Section - Aligned Left */}
        <div className="flex-shrink-0">
          <img
            src={`${prefix}/nfn_logo.webp`}
            alt="NowForNext"
            className="w-[160px] h-auto"
          />
        </div>

        {/* Letter Icons Section - Centered with specific spacing */}
        <div className="flex items-center gap-10">
          {letters.map((letter) => (
            <div
              key={letter}
              className="w-10 h-10 rounded-full bg-[#BCC6D1] flex items-center justify-center text-white font-bold text-lg hover:bg-[#1B286B] transition-colors duration-200 cursor-pointer"
            >
              {letter}
            </div>
          ))}
        </div>

        {/* Nav Links Section - Aligned Right with consistent gaps */}
        <nav className="flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} //adjust
              className="text-[#8A9AB0] font-bold text-m tracking-widest hover:text-[#2D3E61] transition-colors duration-200 whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
