import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = ({ title, subtitle, onMenuClick, className=''}) => {
  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-4 text-gray-500 hover:text-gray-600 cursor-pointer lg:hidden"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="sm:text-3xl text-base font-cabin font-bold text-transparent bg-gradient-to-r from-dot via-primary to-secondary bg-clip-text">{title}</h1>
            {subtitle && <p className="sm:text-sm text-[10px] text-gray-600 mt-1">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
          <button 
            className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
            aria-label="Settings"
          >
            <Link to='/'><CiHome className="w-6 h-6" /></Link>
            
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;