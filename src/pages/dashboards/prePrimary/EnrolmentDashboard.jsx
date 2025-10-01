import React, { useState, useMemo } from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import FilterSelect from '../../../components/filters/FilterSelect';
import ViewToggle from '../../../components/filters/ViewToggle';
import SearchFilter from '../../../components/filters/SearchFilter';
import DashboardGrid from '../../../components/cards/DashboardGrid';
import SummaryCard from '../../../components/cards/SummaryCard';
import ChartContainer from '../../../components/charts/ChartContainer';
import BarChartComponent from '../../../components/charts/BarChartComponent';
import PieChartComponent from '../../../components/charts/PieChartComponent';
import DataTable from '../../../components/data/DataTable';
import useApiData from '../../../hooks/useApiData';
import useFilteredData from '../../../hooks/useFilteredData';
import { educationApi } from '../../../services/educationApi';
import { 
  processChartData,
  calculateSummaryStats,
  formatNumber 
} from '../../../utils/dataFormatters';

const EnrolmentDashboard = () => {
  const [view, setView] = useState('overview');
  
  // Fetch data from API
  const { data: apiData, isLoading, error, } = useApiData(
    () => educationApi.getAll()
  );
  
  // Extract data and totals
  const { data: rawData, totals } = useMemo(() => {
    if (!apiData) return { data: [], totals: null };
    return {
      data: apiData.data || [],
      totals: apiData.totals || null
    };
  }, [apiData]);
  
  // Filter configuration
  const filterConfig = {
    searchKey: 'lga', // Search by LGA name
    filterOptions: []
  };
  
  // Use filtering hook
  const { filteredData, filters, updateFilter, searchTerm, setSearchTerm } = 
    useFilteredData(rawData, filterConfig);
  
  // Calculate summary statistics
  const summaryStats = useMemo(() => 
    calculateSummaryStats(filteredData, totals),
    [filteredData, totals]
  );
  
  // Prepare chart data
  const chartData = useMemo(() => 
    processChartData(filteredData, view),
    [filteredData, view]
  );
  
  // Prepare gender data for pie chart
  const genderData = useMemo(() => {
     if (view === "prePrimary") {
        return [
          { name: 'Boys', value: filteredData.reduce((sum, item) => sum + item.prePrimary.boys, 0) },
          { name: 'Girls', value: filteredData.reduce((sum, item) => sum + item.prePrimary.girls, 0) }
        ];
      } else if (view === "primary") {
        return [
          { name: 'Boys', value: filteredData.reduce((sum, item) => sum + item.primary.boys, 0) },
          { name: 'Girls', value: filteredData.reduce((sum, item) => sum + item.primary.girls, 0) }
        ];
      } else {
        return [
          { name: 'Pre-Primary', value: filteredData.reduce((sum, item) => sum + item.prePrimary.total, 0) },
          { name: 'Primary', value: filteredData.reduce((sum, item) => sum + item.primary.total, 0) }
        ];
      }
  },[filteredData, view]);
  
  // View options
  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'prePrimary', label: 'Pre-Primary' },
    { value: 'primary', label: 'Primary' }
  ];
  
  // LGA options for filter
  const lgaOptions = useMemo(() => {
    if (!rawData) return [];
    const lgas = [...new Set(rawData.map(item => item.lga))];
    return [
      { value: 'ALL', label: 'All LGAs' },
      ...lgas.map(lga => ({ value: lga, label: lga }))
    ];
  }, [rawData]);
  
  // Get chart titles based on view
  const getBarChartTitle = () => {
    switch(view) {
      case 'overview': return 'Total Enrollment by LGA';
      case 'prePrimary': return 'Pre-Primary Enrollment';
      case 'primary': return 'Primary Enrollment';
      default: return 'Enrollment Data';
    }
  };

  const getPieChartTitle = () => {
    switch(view) {
      case 'overview': return 'Total Enrollment Distribution';
      case 'prePrimary': return 'Pre-Primary Gender Distribution';
      case 'primary': return 'Primary Gender Distribution';
      default: return 'Gender Distribution';
    }
  };
  
  // Table columns configuration
  const tableColumns = useMemo(() => {
    const baseColumns = [{ key: 'lga', label: 'LGA' }];
    
    if (view === 'overview' || view === 'prePrimary') {
      baseColumns.push(
        { key: 'prePrimary.schools', label: 'Pre-Primary Schools', format: 'number' },
        { key: 'prePrimary.boys', label: 'Pre-Primary Boys', format: 'number' },
        { key: 'prePrimary.girls', label: 'Pre-Primary Girls', format: 'number' },
        { key: 'prePrimary.total', label: 'Pre-Primary Total', format: 'number' }
      );
    }
    
    if (view === 'overview' || view === 'primary') {
      baseColumns.push(
        { key: 'primary.schools', label: 'Primary Schools', format: 'number' },
        { key: 'primary.boys', label: 'Primary Boys', format: 'number' },
        { key: 'primary.girls', label: 'Primary Girls', format: 'number' },
        { key: 'primary.total', label: 'Primary Total', format: 'number' }
      );
    }
    
    return baseColumns;
  }, [view]);

  return (
    <DashboardLayout
      title="PRE-PRIMARY SCHOOL ENROLMENT"
      subtitle="Kaduna State Public Pre-Primary and Primary Education"
      isLoading={isLoading}
      error={error}
      filters={
        <>
          <SearchFilter
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by LGA name..."
          />
          <FilterSelect
            label="Filter by LGA:"
            value={filters.lga || 'ALL'}
            onChange={(value) => updateFilter('lga', value)}
            options={lgaOptions}
          />
          <ViewToggle
            views={viewOptions}
            currentView={view}
            onChange={setView}
          />
        </>
      }
      summaryCards={
        <DashboardGrid className='grid-cols-[200px_1fr_300px]'>
          <SummaryCard
            className='border-l-4 border-b-4 border-gray-500'
            title="Number of Schools"
            value={formatNumber(summaryStats.primarySchools)}
          />
          <SummaryCard
            className='border-l-4 border-b-4 border-gray-500'
            title="Pre-Primary Students"
            value={formatNumber(summaryStats.prePrimaryStudents)}
          />
          <SummaryCard
            className='border-l-4 border-b-4 border-gray-500'
            title="Primary Students"
            value={formatNumber(summaryStats.primaryStudents)}
            subtitle={`${summaryStats.genderRatio}% girls`}
          />
        </DashboardGrid>
      }
      charts={
        <>
          <ChartContainer title={getBarChartTitle()} className="lg:col-span-2">
            <BarChartComponent data={chartData} view={view} />
          </ChartContainer>
          <ChartContainer title={getPieChartTitle()}>
            <PieChartComponent data={genderData} />
          </ChartContainer>
        </>
      }
      dataTable={
        <DataTable 
          data={filteredData} 
          columns={tableColumns}
          title={`Detailed ${view === 'overview' ? 'Enrollment' : view} Data`}
        />
      }
    />
  );
};

export default EnrolmentDashboard;