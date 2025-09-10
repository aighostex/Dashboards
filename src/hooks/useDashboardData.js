import { useState, useMemo } from 'react';
import useApiData from './useApiData';
import useFilteredData from './useFilteredData';
import { educationApi } from '../services/educationApi';
import { 
  processChartData, 
  processGenderData, 
  calculateSummaryStats,
//   formatNumber 
} from '../utils/dataFormatters';

const useDashboardData = (dataType = 'education', view = 'overview') => {
  const [currentView, setView] = useState(view);
  
  // Fetch data from our mock API
  const { data: apiData, isLoading, error, refetch } = useApiData(
    () => educationApi.getAll(dataType)
  );
  
  // Extract data and totals from API response
  const { data: rawData, totals } = useMemo(() => {
    if (!apiData) return { data: [], totals: null };
    return {
      data: apiData.data || [],
      totals: apiData.totals || null
    };
  }, [apiData]);
  
  // Filter configuration
  const filterConfig = {
    searchKey: dataType === 'health' ? 'facilityName' : 'lga',
    filterOptions: []
  };
  
  // Use filtering hook
  const { filteredData, filters, updateFilter, searchTerm, setSearchTerm } = 
    useFilteredData(rawData, filterConfig);
  
  // Calculate summary statistics
  const summaryStats = useMemo(() => 
    calculateSummaryStats(filteredData, totals, dataType),
    [filteredData, totals, dataType]
  );
  
  // Prepare chart data
  const chartData = useMemo(() => 
    processChartData(filteredData, currentView, dataType),
    [filteredData, currentView, dataType]
  );
  
  // Prepare data for pie chart
  const pieData = useMemo(() => 
    processGenderData(filteredData, currentView, dataType),
    [filteredData, currentView, dataType]
  );

  return {
    // Data
    rawData,
    filteredData,
    totals,
    summaryStats,
    chartData,
    pieData,
    
    // State
    view: currentView,
    setView,
    filters,
    updateFilter,
    searchTerm,
    setSearchTerm,
    
    // Status
    isLoading,
    error,
    refetch,
    
    // Config
    dataType
  };
};

export default useDashboardData;