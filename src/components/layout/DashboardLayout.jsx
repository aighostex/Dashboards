// import { useState } from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import LoadingSpinner from '../ui/LoadingSpinner';
// import ErrorMessage from '../ui/ErrorMessage';
// import DarkVeil from './DarkVeil';

// const DashboardLayout = ({ 
//   title, 
//   subtitle, 
//   filters, 
//   summaryCards, 
//   charts, 
//   dataTable, 
//   isLoading = false,
//   error = null,
//   onRetry 
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   if (isLoading) {
//     return (
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar isOpen={false} onClose={() => {}} />
//         <div className="flex-1 flex items-center justify-center">
//           <LoadingSpinner />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex h-screen ">
//         <Sidebar isOpen={false} onClose={() => {}} />
//         <div className="flex-1 flex items-center justify-center p-4">
//           <ErrorMessage error={error} onRetry={onRetry} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen relative ">
//        {/* <div className="absolute inset-0 z-0">
//       <DarkVeil />
//     </div> */}
    

//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
//       {/* Main content */}
//       <div className="relative z-10 flex-1 flex flex-col overflow-hidden ">
//         {/* Header */}
//         <Header 
//           title={title} 
//           subtitle={subtitle}
//           onMenuClick={() => setSidebarOpen(true)}
          
//         />
        
//         {/* Main content area */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           {/* Filters Section */}
//           {filters && (
//             <div className="flex flex-col lg:flex-row gap-4 mb-6">
//               {filters}
//             </div>
//           )}
          
//           {/* Summary Cards */}
//           {summaryCards}
          
//           {/* Charts Section */}
//           {charts && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//               {charts}
//             </div>
//           )}
          
//           {/* Data Table */}
//           {dataTable}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = ({ 
  children, 
  title, 
  subtitle, 
  isLoading, 
  error, 
  filters,
  summaryCards,
  charts,
  dataTable,
  educationLevel,
  dashboards,
  currentDashboard,
  onDashboardChange,
  setSidebarOpen,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {educationLevel && dashboards && (
        <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            dashboards={dashboards}
            currentDashboard={currentDashboard}
            onDashboardChange={onDashboardChange}
          />
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
         <Header 
           title={title} 
           subtitle={subtitle}
           onMenuClick={() => setSidebarOpen(true)}
         />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              Error: {error.message}
            </div>
          )}
          
          {/* Content */}
          {!isLoading && !error && (
            <>
              {/* Filters */}
              {filters && (
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                  <div className="flex flex-wrap gap-4 items-center">
                    {filters}
                  </div>
                </div>
              )}
              
              {/* Summary cards */}
              {summaryCards && (
                <div className="mb-6">
                  {summaryCards}
                </div>
              )}
              
              {/* Charts */}
              {charts && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {charts}
                </div>
              )}
              
              {/* Data table */}
              {dataTable}
              
              {/* Children (for routed components) */}
              {children}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;