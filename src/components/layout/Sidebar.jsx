import { NavLink, useLocation } from 'react-router-dom';
import { navigationItems } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b ">
          <h1 className="text-gray-800 font-cabin font-semibold text-xl">Kaduna Dashboards</h1>
          <button 
            onClick={onClose}
            className="text-gray-800 hover:text-white lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                    hover:bg-gray-800 hover:text-white
                    ${isActive ? 'bg-sidebar text-white' : 'text-gray-700'}
                  `}
                  onClick={onClose}
                >
                  <span className="mr-3">{<item.icon spin='true' />}</span>
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-500">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Kaduna State</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;