import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';



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
  onRetry,
  view 
}) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          dashboards={dashboards}
          currentDashboard={currentDashboard}
          onDashboardChange={onDashboardChange}
          educationLevel={educationLevel}
        />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          dashboards={dashboards}
          currentDashboard={currentDashboard}
          onDashboardChange={onDashboardChange}
          educationLevel={educationLevel}
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <ErrorMessage error={error} onRetry={onRetry} />
        </div>
      </div>
    );
  }
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        dashboards={dashboards}
        currentDashboard={currentDashboard}
        onDashboardChange={onDashboardChange}
        educationLevel={educationLevel}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with title and subtitle */}
        <Header 
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setIsSidebarOpen(true)}
          educationLevel={educationLevel}
          currentView={view}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {/* Content */}
          {!isLoading && !error && (
            <>
              {/* Filters - Only show if filters are provided */}
              {filters && (
                  <div className="flex flex-wrap gap-4 items-center mb-6">
                    {filters }
                </div>
              )}
              
              {/* Summary cards - Only show if summaryCards are provided */}
              {summaryCards && (
                <div className="mb-6">
                  {summaryCards}
                </div>
              )}
              
              {/* Charts - Only show if charts are provided */}
              {charts && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {charts}
                </div>
              )}
              
              {/* Data table - Only show if dataTable is provided */}
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