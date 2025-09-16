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
  formatNumber,
  processComparisonChartData,
  calculateComparisonSummaryStats,
  processComparisonGenderData,
  processComparisonSectorData
} from '../../../utils/dataFormatters';

const PrePrimaryComparisonDashboard = () => {
  const [view, setView] = useState('overview');
  
  // Fetch comparison data from API
  const { data: apiData, isLoading, error } = useApiData(
    () => educationApi.getSectorComparison()
  );
  
  // Extract data and totals
  const { data: rawData, totals, summary } = useMemo(() => {
    if (!apiData) return { data: [], totals: null, summary: null };
    return {
      data: apiData.data || [],
      totals: apiData.totals || null,
      summary: apiData.summary || null
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
    calculateComparisonSummaryStats(filteredData, totals),
    [filteredData, totals]
  );
  
  // Prepare chart data
  const chartData = useMemo(() => 
    processComparisonChartData(filteredData, view),
    [filteredData, view]
  );
  
  // Prepare gender data for pie chart
  const genderData = useMemo(() => 
    processComparisonGenderData(filteredData, view, totals),
    [filteredData, view, totals]
  );
  
  // Prepare sector distribution data for overview pie chart
  const sectorDistributionData = useMemo(() => 
    processComparisonSectorData(totals),
    [totals]
  );
  
  // View options
  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'public', label: 'Public Only' },
    { value: 'private', label: 'Private Only' },
    { value: 'comparison', label: 'Side by Side' }
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
      case 'overview': return 'Total Pre-Primary Enrollment by LGA';
      case 'public': return 'Public Pre-Primary Enrollment by LGA';
      case 'private': return 'Private Pre-Primary Enrollment by LGA';
      case 'comparison': return 'Public vs Private Enrollment Comparison';
      default: return 'Pre-Primary Enrollment Data';
    }
  };

  const getPieChartTitle = () => {
    switch(view) {
      case 'overview': return 'Sector Distribution';
      case 'public': return 'Public Schools Gender Distribution';
      case 'private': return 'Private Schools Gender Distribution';
      case 'comparison': return 'Overall Gender Distribution';
      default: return 'Distribution';
    }
  };
  
  // Table columns configuration
  const tableColumns = useMemo(() => {
    const baseColumns = [{ key: 'lga', label: 'LGA' }];
    
    baseColumns.push(
      { key: 'public.schools', label: 'Public Schools', format: 'number' },
      { key: 'public.pupils', label: 'Public Pupils', format: 'number' },
      { key: 'public.girls', label: 'Public Girls', format: 'number' },
      { key: 'public.percent_girls', label: 'Public % Girls', format: 'percentage' },
      { key: 'private.schools', label: 'Private Schools', format: 'number' },
      { key: 'private.pupils', label: 'Private Pupils', format: 'number' },
      { key: 'private.girls', label: 'Private Girls', format: 'number' },
      { key: 'private.percent_girls', label: 'Private % Girls', format: 'percentage' },
      
    );
    
    return baseColumns;
  }, []);

  // Determine which pie chart data to show
  const pieChartData = view === 'overview' ? sectorDistributionData : genderData;

  return (
    <DashboardLayout
      title="PUBLIC AND PRIVATE PRE-PRIMARY ENROLMENT BY LGA"
      subtitle="Kaduna State Pre-Primary Education: Public vs Private Sector Analysis"
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
        <DashboardGrid>
          <SummaryCard
          className='border-l-4 border-sidebar hover:'
            title="Total Enrollment"
            value={formatNumber(summaryStats.totalStudents)}
            subtitle={`${formatNumber(summaryStats.totalSchools)} schools`}
            trend={`${summary?.private_contribution_percentage || 33}% private`}
          />
          <SummaryCard
            title="Public Schools"
            value={formatNumber(summaryStats.publicStudents)}
            subtitle={`${formatNumber(summaryStats.publicSchools)} schools`}
            trend={`${summaryStats.publicGenderRatio}% girls`}
          />
          <SummaryCard
            title="Private Schools"
            value={formatNumber(summaryStats.privateStudents)}
            subtitle={`${formatNumber(summaryStats.privateSchools)} schools`}
            trend={`${summaryStats.privateGenderRatio}% girls`}
          />
          <SummaryCard
            title="Gender Balance"
            value={`${summaryStats.overallGenderRatio}%`}
            subtitle="Girls enrollment"
            trend={`${formatNumber(summaryStats.totalGirls)} girls`}
          />
        </DashboardGrid>
      }
      charts={
        <>
          <ChartContainer title={getBarChartTitle()} className="lg:col-span-2">
            <BarChartComponent 
              data={chartData} 
              view={view}
              xAxisKey="lga"
              valueKey={view === 'comparison' ? ['public', 'private'] : 'total'}
              dataType="comparison"
            />
          </ChartContainer>
          <ChartContainer title={getPieChartTitle()}>
            <PieChartComponent 
              data={pieChartData} 
              showPercentage={true}
            />
          </ChartContainer>
        </>
      }
      dataTable={
       <DataTable 
        data={filteredData} 
        title="Public vs Private Pre-Primary Enrollment"
        columns={tableColumns}
        dataType="comparison"
        exportable={true}
        />
      }
    />
  );
};

export default PrePrimaryComparisonDashboard;