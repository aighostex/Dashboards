import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import kdLogo from '../../assets/kdgov.svg';
import { Link } from 'react-router-dom';
import { navLinks } from '../../utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  return (
    // <nav className={`fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10 ${className}`}>
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between h-16">
    //       {/* Logo */}
    //       <div className=" flex items-center space-x-2 text-white flex-shrink-0">
    //         <img src={kdLogo} alt="KdGovernment" href='/' className='w-9 h-9 hover:cursor-pointer'/> 
    //         <span>Kaduna State</span>
    //       </div>

    //       {/* Desktop Navigation Links (centered) */}
  //       <div className="hidden md:flex md:items-center md:justify-center md:flex-1 max-w-95 rounded-4xl bg-white/30">
  //         <div className="flex items-center space-x-4">
  //           {navLinks.map((link) => (
  //             <div key={link.name} className="relative group">
  //               {link.dropdown ? (
  //                 /* Dropdown navigation item */
  //                 <div className="relative">
  //                   <button
  //                     type="button"
  //                     className="flex items-center text-white cursor-pointer hover:text-sidebar px-3 py-2 rounded-md text-sm font-medium transition-colors"
  //                   >
  //                     {link.name}
  //                     <ChevronDown 
  //                       size={16} 
  //                       className="ml-1 transition-transform group-hover:rotate-180" 
  //                     />
  //                   </button>
  //                   {/* Dropdown menu: show on hover */}
  //                   <div className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
  //                     {link.dropdown.map((item) => (
  //                       <Link
  //                         key={item.name}
  //                         to={`/${item.id}/total`}
  //                         className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/50 hover:text-sidebar transition-colors"
  //                         onClick={closeAllDropdowns}
  //                       >
  //                         {item.name}
  //                       </Link>
  //                     ))}
  //                   </div>
  //                 </div>
  //               ) : (
  //                 /* Regular link */
  //                 <a
  //                   href={link.href}
  //                   className="text-white hover:text-sidebar px-3 py-2 rounded-md text-sm font-medium transition-colors"
  //                   onClick={closeAllDropdowns}
  //                 >
  //                   {link.name}
  //                 </a>
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       </div>

    //       {/* CTA Button (right) */}
    //       <div className="hidden md:block">
    //         <button 
    //           className="bg-gradient-to-r from-[#0ca16b] via-[#128370] to-[#1c5479] hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg backdrop-blur-sm transition-all"
    //           onClick={closeAllDropdowns}
    //         >
    //           Report
    //         </button>
    //       </div>

    //       {/* Mobile menu button */}
    //       <div className="md:hidden">
    //         <button
    //           onClick={toggleMenu}
    //           className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-white/10 focus:outline-none"
    //         >
    //           {isOpen ? <X size={24} /> : <Menu size={24} />}
    //         </button>
    //       </div>
    //     </div>

    //     {/* Mobile Menu */}
    //     {isOpen && (
    //       <div className="md:hidden bg-white/5 backdrop-blur-xl rounded-lg mt-2 py-2">
    //         <div className="px-2 pt-2 pb-3 space-y-1">
    //           {navLinks.map((link) => (
    //             <div key={link.name}>
    //               {link.dropdown ? (
    //                 /* Mobile dropdown navigation item */
    //                 <div>
    //                   <button
    //                     onClick={() => toggleDropdown(link.name)}
    //                     className="flex items-center justify-between w-full text-dot px-3 py-2 rounded-md text-base font-medium hover:bg-white/70 cursor-pointer"
    //                   >
    //                     {link.name}
    //                     <ChevronDown 
    //                       size={16} 
    //                       className={`transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} 
    //                     />
    //                   </button>
                      
    //                   {/* Mobile dropdown items */}
    //                   {openDropdown === link.name && (
    //                     <div className="pl-4 mt-1 space-y-1">
    //                       {link.dropdown.map((item) => (
    //                         <Link
    //                           key={item.name}
    //                           to={`/${item.id}/total`}
    //                           className="block px-3 py-2 cursor-pointer rounded-md text-sm text-dot hover:bg-white/50"
    //                           onClick={() => {
    //                             setIsOpen(false);
    //                             closeAllDropdowns();
    //                           }}
    //                         >
    //                           {item.name}
    //                         </Link>
    //                       ))}
    //                     </div>
    //                   )}
    //                 </div>
    //               ) : (
    //                 /* Regular mobile link */
    //                 <a
    //                   href={link.href}
    //                   className="text-dot block px-3 py-2 rounded-md text-base font-medium hover:bg-white/70"
    //                   onClick={() => {
    //                     setIsOpen(false);
    //                     closeAllDropdowns();
    //                   }}
    //                 >
    //                   {link.name}
    //                 </a>
    //               )}
    //             </div>
    //           ))}
    //           <div className="pt-4 pb-2 border-t border-white/10">
    //             <button 
    //               className="w-full bg-gradient-to-r from-[#0ca16b] via-[#128370] to-[#1c5479] hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg backdrop-blur-sm"
    //               onClick={() => setIsOpen(false)}
    //             >
    //               Report
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </nav>
  <nav className='fixed top-0 md:top-6 left-4 right-4 md:left-1/2 md:transform md:-translate-x-1/2 md:w-auto md:max-w-5xl z-50 flex-none p-2 h-14 md:my-2 md:rounded-full  border-0 md:border-0.5 backdrop-blur-lg md:right-auto  md:shadow-sm md:bg-white/30'>
  <div className="px-4 sm:px-8 lg:px-8">
    <div className="flex items-start justify-between h-16">
      {/* Logo */}
        <a href="/" className="flex items-center justify-center space-x-2 text-sidebar flex-shrink-0"><img src={kdLogo} alt="KdGovernment" className='w-9 h-9 left-0 hover:cursor-pointer' /> 
        <span>Kaduna State</span>
        </a>
     

      {/* Desktop Navigation Links (centered) */}
      <div className="hidden md:flex md:items-center md:justify-center md:flex-1 mx-4">
        <div className="flex items-center top-0 space-x-4 bg-white/30 rounded-full px-6 py-1">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                /* Dropdown navigation item */
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex items-center text-nav hover:bg-black/5 cursor-pointer hover:text-sidebar px-3 py-2 rounded-4xl text-sm font-medium transition-colors"
                  >
                    {link.name}
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {/* Dropdown menu */}
                  {openDropdown === link.name && (
                    <div className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-1 z-50">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={`/${item.id}/total`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/50 hover:text-sidebar transition-colors"
                          onClick={closeAllDropdowns}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Regular link */
                <a
                  href={link.href}
                  className="text-nav hover:text-sidebar rounded-4xl hover:bg-black/5 px-3 py-2 text-sm font-medium transition-colors"
                  onClick={closeAllDropdowns}
                >
                  <span>{link.name}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button (right) */}
      <div className="hidden md:block">
        <button 
          className="bg-gradient-to-r from-[#0ca16b] via-[#128370] to-[#1c5479] hover:bg-white/30 text-white font-medium py-2 px-4 rounded-4xl backdrop-blur-sm transition-all"
          onClick={closeAllDropdowns}
        >
        Report
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-white/10 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white/5 backdrop-blur-xl rounded-lg mt-2 py-2">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                /* Mobile dropdown navigation item */
                <div>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className="flex items-center justify-between w-full text-dot px-3 py-2 rounded-md text-base font-medium hover:bg-white/70 cursor-pointer"
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
                          className="block px-3 py-2 cursor-pointer rounded-md text-sm text-dot hover:bg-white/50"
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
                  className="text-dot block px-3 py-2 rounded-md text-base font-medium hover:bg-white/70"
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
              className="w-full bg-gradient-to-r from-[#0ca16b] via-[#128370] to-[#1c5479] hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg backdrop-blur-sm"
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