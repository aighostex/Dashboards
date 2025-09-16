// import { NavLink, useLocation } from 'react-router-dom';
// import { navigationItems } from '../../utils/constants';
// import kdgov from '../../assets/kdgov.svg'

// const Sidebar = ({ isOpen, onClose }) => {
//   const location = useLocation();
  
//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-20 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-[#0ca16b] via-[#128370] to-[#1c5479]  transform transition-transform duration-300 ease-in-out
//         lg:static lg:translate-x-0 lg:z-auto
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Header */}
//         <div className="flex fixed w-64 items-center justify-between h-[94px]  px-4 bg-white border-b z-40">
//           <h1 className="text-gray-800 font-cabin flex items-center gap-2 font-semibold text-xl"><img src={kdgov} alt="kdgovLogo" className='w-8 h-8' />Kaduna State Govt</h1>
//           <button 
//             onClick={onClose}
//             className="text-gray-800 hover:text-red-900 lg:hidden"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Scrollable content */}
//         <div className="flex flex-col h-full pt-24">
//           <nav className="flex-1 overflow-y-auto no-scrollbar">
//             <div className="px-4 py-4 space-y-2">
//               {navigationItems.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={`
//                       flex items-center px-4 py-3 rounded-lg transition-colors duration-200
//                       hover:bg-gray-800 hover:text-white
//                       ${isActive ? 'bg-sidebar text-white' : 'text-gray-700'}
//                     `}
//                     onClick={onClose}
//                   >
//                     <span className="mr-3">{<item.icon />}</span>
//                     <span className="font-medium">{item.name}</span>
//                     {isActive && (
//                       <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </nav>
          
//           {/* Footer */}
//           <div className="p-4 border-t border-dot">
//             <div className="flex items-center">
//               <div className="ml-3">
//                 <p className="text-sm font-medium text-gray-900">KDBS</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


// import { useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { navigationItems } from '../../utils/constants';
// import kdgov from '../../assets/kdgov.svg';
// import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';

// const Sidebar = ({ isOpen, onClose }) => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-20 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}
      
//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
//         bg-gradient-to-b from-[#0ca16b] via-[#128370] to-[#1c5479]
//         lg:static lg:translate-x-0 lg:z-auto
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//         ${collapsed ? 'w-15' : 'w-64'}
//       `}>
//         {/* Header */}
//         <div className={`flex fixed items-center justify-between h-[94px] px-4 bg-white border-b border-white z-40 transition-all duration-300
//           ${collapsed ? 'w-20' : 'w-64'}
//         `}>
//           {!collapsed && (
//             <h1 className="text-gray-800 font-cabin flex items-center gap-2 font-semibold text-xl">
//               <img src={kdgov} alt="kdgovLogo" className='w-8 h-8' />
//               Kaduna State Govt
//             </h1>
//           )}
//           {collapsed && (
//             <img src={kdgov} alt="kdgovLogo" className='w-8 h-8 mx-auto left-0' />
//           )}
          
//           <button 
//             onClick={onClose}
//             className="text-gray-800 hover:text-red-900 lg:hidden"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
        
//         {/* Scrollable content */}
//         <div className="flex flex-col h-full pt-24">
//           <nav className="flex-1 overflow-y-auto no-scrollbar">
//             <div className="px-2 py-4 space-y-2">
//               {navigationItems.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={`
//                       flex items-center px-3 py-3 rounded-lg transition-colors duration-200
//                       hover:bg-gray-800 hover:text-white
//                       ${isActive ? 'bg-sidebar text-white' : 'text-gray-100'}
//                     `}
//                     onClick={onClose}
//                   >
//                     <span className="mr-3 text-lg">{<item.icon />}</span>
//                     {!collapsed && (
//                       <span className="font-medium">{item.name}</span>
//                     )}
//                     {isActive && !collapsed && (
//                       <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </nav>
          
//           {/* Footer */}
//           <div className="p-4 border-t border-dot flex justify-between items-center">
//             {!collapsed && <p className="text-sm font-medium text-gray-200">KDBS</p>}
//             {/* Collapse button */}
//             <button 
//               onClick={() => setCollapsed(!collapsed)}
//               className="text-gray-200 hover:text-white transition-colors"
//             >
//               {collapsed ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               ) : (
//                 // <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 //   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 // </svg>
//                 <GoSidebarCollapse />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


import { useState, } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigationItems } from '../../utils/constants';
import kdgov from '../../assets/kdgov.svg';
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';




const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
//     const stored = localStorage.getItem('sidebarCollapsed');
//     return stored === 'true';
//   });

//   useEffect(() => {
//     localStorage.setItem('sidebarCollapsed', collapsed);
//   }, [collapsed]);

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
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-all duration-500 ease-in-out
          bg-gradient-to-b from-[#0ca16b] via-[#128370] to-[#1c5479]
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${collapsed ? 'w-15' : 'w-64'}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between h-[94px] px-4 bg-white border-b z-40 transition-all duration-300
            ${collapsed ? 'w-auto justify-center' : 'w-64'}
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
              className={`w-8 h-8 transition-opacity duration-200 
                ${collapsed ? 'group-hover:opacity-0' : 'opacity-100'}
              `}
            />

            {/* Expand Icon (shows on hover when collapsed) */}
            {collapsed && (
              <GoSidebarCollapse className="w-6 h-6 absolute text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            )}

            {/* Title (only when expanded) */}
            {!collapsed && (
              <h1 className="ml-2 text-gray-800 font-cabin font-semibold text-xl whitespace-nowrap flex gap-4">
                Kaduna State Govt <GoSidebarExpand className='mt-1'/>
              </h1>
            )}
          </button>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="text-gray-800 hover:text-red-900 lg:hidden"
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
                      ${isActive ? 'bg-sidebar text-white' : 'text-gray-100'}
                    `}
                    onClick={onClose}
                  >
                    <span className="mr-3 text-lg">{<item.icon />}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                    {isActive && !collapsed && (
                      <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-dot">
            {!collapsed && (
              <p className="text-sm font-medium text-gray-200">KDBS</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


// import { useState,  } from 'react';
// import { NavLink, useLocation, useParams } from 'react-router-dom';
// import { navigationItems } from '../../utils/constants';
// import kdgov from '../../assets/kdgov.svg';
// import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go';

// const Sidebar = ({ isOpen, onClose, dashboards, currentDashboard, onDashboardChange }) => {
//   const location = useLocation();
//   const { level } = useParams();
  
//   const [collapsed, setCollapsed] = useState(false);

//   // Check if we're on an education level page (preprimary, primary, secondary)
//   const isEducationLevelPage = level && ['preprimary', 'primary', 'secondary'].includes(level);

//   const getDashboardIcon = (dashboardId) => {
//     const icons = {
//       total: '👥',
//       public: '🏫',
//       private: '🏢',
//       comparison: '⚖️'
//     };
//     return icons[dashboardId] || '📊';
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 z-20 lg:hidden"
//           onClick={onClose}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-30 transform transition-all duration-500 ease-in-out
//           bg-gradient-to-b from-[#0ca16b] via-[#128370] to-[#1c5479]
//           lg:static lg:translate-x-0 lg:z-auto
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//           ${collapsed ? 'w-15' : 'w-64'}
//         `}
//       >
//         {/* Header */}
//         <div
//           className={`flex items-center justify-between h-[94px] px-4 bg-white border-b z-40 transition-all duration-300
//             ${collapsed ? 'w-auto justify-center' : 'w-64'}
//           `}
//         >
//           {/* Logo / Collapse-Expand Toggle */}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="relative flex items-center justify-center group hover:cursor-pointer"
//           >
//             {/* KD Logo (shows by default) */}
//             <img
//               src={kdgov}
//               alt="kdgovLogo"
//               className={`w-8 h-8 transition-opacity duration-200 
//                 ${collapsed ? 'group-hover:opacity-0' : 'opacity-100'}
//               `}
//             />

//             {/* Expand Icon (shows on hover when collapsed) */}
//             {collapsed && (
//               <GoSidebarCollapse className="w-6 h-6 absolute text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//             )}

//             {/* Title (only when expanded) */}
//             {!collapsed && (
//               <h1 className="ml-2 text-gray-800 font-cabin font-semibold text-xl whitespace-nowrap flex gap-4">
//                 Kaduna State Govt <GoSidebarExpand className='mt-1'/>
//               </h1>
//             )}
//           </button>

//           {/* Close button for mobile */}
//           <button
//             onClick={onClose}
//             className="text-gray-800 hover:text-red-900 lg:hidden"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Scrollable content */}
//         <div className="flex flex-col h-full pt-4">
//           <nav className="flex-1 overflow-y-auto no-scrollbar">
//             <div className="px-2 py-4 space-y-2">
//               {/* Show dashboard navigation if we're on an education level page */}
//               {isEducationLevelPage && dashboards ? (
//                 <>
//                   <div className={`px-3 py-2 text-xs font-semibold text-gray-300 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
//                     {collapsed ? '📊' : `${level.toUpperCase()} DASHBOARDS`}
//                   </div>
//                   {dashboards.map((dashboard) => (
//                     <button
//                       key={dashboard.id}
//                       onClick={() => onDashboardChange(dashboard.id)}
//                       className={`
//                         w-full flex items-center px-3 py-3 rounded-lg transition-colors duration-200
//                         hover:bg-gray-800 hover:text-white
//                         ${currentDashboard === dashboard.id ? 'bg-sidebar text-white' : 'text-gray-100'}
//                       `}
//                     >
//                       <span className="mr-3 text-lg">{getDashboardIcon(dashboard.id)}</span>
//                       {!collapsed && (
//                         <span className="font-medium">{dashboard.name}</span>
//                       )}
//                       {currentDashboard === dashboard.id && !collapsed && (
//                         <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
//                       )}
//                     </button>
//                   ))}
//                   <div className="border-t border-gray-600 my-2"></div>
//                 </>
//               ) : null}

//               {/* Main navigation items */}
//               {navigationItems.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={`
//                       flex items-center px-3 py-3 rounded-lg transition-colors duration-200
//                       hover:bg-gray-800 hover:text-white
//                       ${isActive ? 'bg-sidebar text-white' : 'text-gray-100'}
//                     `}
//                     onClick={onClose}
//                   >
//                     <span className="mr-3 text-lg">{<item.icon />}</span>
//                     {!collapsed && (
//                       <span className="font-medium">{item.name}</span>
//                     )}
//                     {isActive && !collapsed && (
//                       <span className="ml-auto w-2 h-2 bg-dot rounded-full"></span>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Footer */}
//           <div className="p-4 border-t border-dot">
//             {!collapsed && (
//               <p className="text-sm font-medium text-gray-200">KDBS</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;