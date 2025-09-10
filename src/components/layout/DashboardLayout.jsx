import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

const DashboardLayout = ({ 
  title, 
  subtitle, 
  filters, 
  summaryCards, 
  charts, 
  dataTable, 
  isLoading = false,
  error = null,
  onRetry 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex items-center justify-center p-4">
          <ErrorMessage error={error} onRetry={onRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header 
          title={title} 
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          
        />
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Filters Section */}
          {filters && (
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {filters}
            </div>
          )}
          
          {/* Summary Cards */}
          {summaryCards}
          
          {/* Charts Section */}
          {charts && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {charts}
            </div>
          )}
          
          {/* Data Table */}
          {dataTable}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;