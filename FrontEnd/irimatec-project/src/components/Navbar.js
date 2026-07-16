import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
      isActive ? "text-green-600" : "text-black hover:text-green-600"
    }`;

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white sticky top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/home" onClick={handleLinkClick}>
            <img
              src="./logoN.png"
              alt="Logo"
              className="w-1/2 md:w-1/3"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 font-medium">
            <NavLink to="/home" className={linkClass}>Accueil</NavLink>
            <NavLink to="/services" className={linkClass}>Nos services</NavLink>
            <NavLink to="/projets" className={linkClass}>Nos projets</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Ouvrir le menu</span>
              {/* Open Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <NavLink to="/home" className={linkClass} onClick={handleLinkClick}>Accueil</NavLink>
          <NavLink to="/services" className={linkClass} onClick={handleLinkClick}>Nos services</NavLink>
          <NavLink to="/projets" className={linkClass} onClick={handleLinkClick}>Nos projets</NavLink>
          <NavLink to="/contact" className={linkClass} onClick={handleLinkClick}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
