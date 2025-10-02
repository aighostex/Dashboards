import { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import kdLogo from '../../assets/kdgov.svg';
import { Link } from 'react-router-dom';
import { navLinks } from '../../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const openDropdownImmediate = (dropdownName) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(dropdownName);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimeoutRef.current = null;
    }, 150); // small delay to tolerate pointer gaps
  };

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closeAllDropdowns = () => {
    clearCloseTimeout();
    setOpenDropdown(null);
  };

  return (
    <nav className="fixed top-0 md:top-2 inset-x-0 md:left-1/2 md:-translate-x-1/2 w-full md:max-w-3xl z-50 flex-none p-2 h-14 md:my-2 md:rounded-full border-0 md:border md:border-white/20 backdrop-blur-lg md:shadow-sm md:bg-white/30">
      <div className="px-4 sm:px-8 lg:px-4 ">
        <div className="flex items-start justify-between md:justify-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center justify-center space-x-2 text-sidebar flex-shrink-0">
            <img src={kdLogo} alt="KdGovernment" className='w-9 h-9 left-0 hover:cursor-pointer' />
            <span>Kaduna State</span>
          </a>

          {/* Desktop Navigation Links (centered) */}
          <div className="hidden md:flex md:items-center md:justify-center md:flex-1 mx-4">
            <div className="flex items-center top-0 space-x-4 bg-white/30 rounded-full px-6 py-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    /* Desktop dropdown: container handles enter/leave so menu stays open while hovering inside it */
                    <div
                      className="relative"
                      onMouseEnter={() => openDropdownImmediate(link.name)}
                      onMouseLeave={scheduleCloseDropdown}
                    >
                      <button
                        className="flex items-center text-nav hover:bg-black/5 cursor-pointer hover:text-sidebar px-3 py-2 rounded-4xl text-sm font-medium transition-colors"
                        // keep click behavior (toggle) if user clicks instead of hover
                        onClick={() => toggleDropdown(link.name)}
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={`ml-1 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Dropdown menu (clears close timeout while hovered so user can click) */}
                      {openDropdown === link.name && (
                        <div
                          className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-1 z-50"
                          onMouseEnter={clearCloseTimeout}
                          onMouseLeave={scheduleCloseDropdown}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={`/${item.id}/total`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/50 hover:text-sidebar transition-colors"
                              onClick={() => {
                                closeAllDropdowns();
                                // don't force-close the whole navbar; mobile menu will close itself when used
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Regular link */
                    <Link
                      to={link.href}
                      className="text-nav hover:text-sidebar rounded-4xl hover:bg-black/5 px-3 py-2 text-sm font-medium transition-colors"
                      onClick={closeAllDropdowns}
                    >
                      <span>{link.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button (right) */}
          <div className="hidden md:block">
            <button
              className="bg-gradient-to-r from-dot via-primary to-secondary hover:bg-white/30 text-white font-medium py-2 px-4 rounded-4xl backdrop-blur-sm transition-all"
              onClick={closeAllDropdowns}
            >
              Report
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center cursor-pointer justify-center p-2 rounded-md text-black hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/70 backdrop-blur-xl rounded-lg mt-2 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    /* Mobile dropdown navigation item (click-to-toggle remains) */
                    <div>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className="flex items-center justify-between w-full text-white px-3 py-2 rounded-md text-base font-medium hover:bg-white/70 cursor-pointer"
                      >
                        {link.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Mobile dropdown items */}
                      {openDropdown === link.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={`/${item.id}/total`}
                              className="block px-3 py-2 cursor-pointer rounded-md text-sm text-white hover:bg-white/50"
                              onClick={() => {
                                setIsOpen(false);
                                closeAllDropdowns();
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Regular mobile link */
                    <a
                      href={link.href}
                      className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/70"
                      onClick={() => {
                        setIsOpen(false);
                        closeAllDropdowns();
                      }}
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-2 border-t border-white/10">
                <button
                  className="w-full bg-gradient-to-r from-dot via-primary to-secondary hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
