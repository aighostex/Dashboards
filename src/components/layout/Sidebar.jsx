import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';
import kdgov from '../../assets/kdgov.svg';

import { dashboardConfigs } from '../../utils/dashboardConfigs';



const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);


  const sectionKey = location.pathname.split("/")[1];

  const navigationItems =
    dashboardConfigs[sectionKey]?.dashboards.map((dashboard) => ({
      name: dashboard.name,
      path: `/${sectionKey}/${dashboard.id}`,
      icon: dashboard.icon,
})) || [];


  // Check for landing page
  useEffect(() => {
    setIsLandingPage(location.pathname === '/');
  }, [location.pathname]);

  // Sidebar closes on mobile
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // No sidebar for Landingpage
  if (isLandingPage) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden bg-black/40"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
          bg-gray-100 shadow-sm
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between h-[93px] px-4 bg-white border-b border-gray-200 z-40 transition-all duration-300
            ${collapsed ? 'w-16 justify-center' : 'w-64'}
          `}
        >
          {/* Logo / Collapse-Expand Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="relative flex items-center justify-center group hover:cursor-pointer"
          >
            {/* KD Logo (shows by default) */}
            <img
              src={kdgov}
              alt="kdgovLogo"
              className={`w-8 h-8 transition-opacity duration-200 hidden lg:block
                ${collapsed ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'}
              `}
            />

            {/* Expand Icon (shows on hover when collapsed) */}
            {collapsed && (
              <GoSidebarCollapse className="w-6 h-6 absolute text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}

            {/* Title (only when expanded) */}
            {!collapsed && (
              <h1 className="ml-2 text-gray-800 font-semibold text-xl whitespace-nowrap flex gap-4">
                Kaduna State Govt <GoSidebarExpand className="mt-1 hidden lg:block" />
              </h1>
            )}
          </button>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-red-900 cursor-pointer lg:hidden"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-col h-full pt-4">
          <nav className="flex-1 overflow-y-auto no-scrollbar">
            <div className="px-2 py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center px-3 py-3 rounded-lg transition-colors duration-200
                      hover:bg-gray-800 hover:text-white
                      ${isActive ? 'bg-gray-700 text-white' : 'text-text'}
                    `}
                    onClick={onClose}
                  >
                    <span className="mr-3 text-lg">{<item.icon />}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                    {isActive && !collapsed && (
                      <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;