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
  processPrePrimaryChartData,
  calculatePrePrimarySummaryStats,
  processPrePrimaryGenderData,
  processPrePrimaryLevelData
} from '../../../utils/dataFormatters';

const PrePrimaryDashboard = () => {
  const [view, setView] = useState('overview');
  
  // Fetch pre-primary data from API
  const { data: apiData, isLoading, error } = useApiData(
    () => educationApi.getAll('prePrimary')
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
    calculatePrePrimarySummaryStats(filteredData),
    [filteredData]
  );
  
  // Prepare chart data
  const chartData = useMemo(() => 
    processPrePrimaryChartData(filteredData, view),
    [filteredData, view]
  );
  
  // Prepare gender data for pie chart
  const genderData = useMemo(() => 
    processPrePrimaryGenderData(filteredData, view, totals),
    [filteredData, view, totals]
  );
  
  // Prepare level distribution data for overview pie chart
  const levelDistributionData = useMemo(() => 
    processPrePrimaryLevelData(totals),
    [totals]
  );
  
  // View options
  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'kindergarten', label: 'Kindergarten' },
    { value: 'nursery', label: 'Nursery' },
    { value: 'nursery_3', label: 'Nursery 3' }
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
      case 'kindergarten': return 'Kindergarten Enrollment by LGA';
      case 'nursery': return 'Nursery Enrollment by LGA';
      case 'nursery_3': return 'Nursery 3 Enrollment by LGA';
      default: return 'Pre-Primary Enrollment Data';
    }
  };

  const getPieChartTitle = () => {
    switch(view) {
      case 'overview': return 'Level Distribution';
      case 'kindergarten': return 'Kindergarten Gender Distribution';
      case 'nursery': return 'Nursery Gender Distribution';
      case 'nursery_3': return 'Nursery 3 Gender Distribution';
      default: return 'Distribution';
    }
  };
  
  // // Table columns configuration
  const tableColumns = useMemo(() => {
    const baseColumns = [{ key: 'lga', label: 'LGA' }];
    
    if (view === 'overview') {
      baseColumns.push(
        { key: 'prePrimary.kindergarten_eccd.boys', label: 'KG Boys', format: 'number' },
        { key: 'prePrimary.kindergarten_eccd.girls', label: 'KG Girls', format: 'number' },
        { key: 'prePrimary.kindergarten_eccd.total', label: 'KG Total', format: 'number' },
        { key: 'prePrimary.nursery.boys', label: 'Nursery Boys', format: 'number' },
        { key: 'prePrimary.nursery.girls', label: 'Nursery Girls', format: 'number' },
        { key: 'prePrimary.nursery.total', label: 'Nursery Total', format: 'number' },
        { key: 'prePrimary.nursery_3.boys', label: 'Nursery 3 Boys', format: 'number' },
        { key: 'prePrimary.nursery_3.girls', label: 'Nursery 3 Girls', format: 'number' },
        { key: 'prePrimary.nursery_3.total', label: 'Nursery 3 Total', format: 'number' },
        { key: 'prePrimary.total.boys', label: 'Total Boys', format: 'number' },
        { key: 'prePrimary.total.girls', label: 'Total Girls', format: 'number' },
        { key: 'prePrimary.total.total', label: 'Grand Total', format: 'number' }
      );
    } else {
      const levelKey = view === 'kindergarten' ? 'kindergarten_eccd' : view;
      baseColumns.push(
        { key: `prePrimary.${levelKey}.boys`, label: 'Boys', format: 'number' },
        { key: `prePrimary.${levelKey}.girls`, label: 'Girls', format: 'number' },
        { key: `prePrimary.${levelKey}.total`, label: 'Total', format: 'number' }
      );
    }
    
    return baseColumns;
  }, [view]);

  // Determine which pie chart data to show
  const pieChartData = view === 'overview' ? levelDistributionData : genderData;

  return (
    <DashboardLayout
      title="PUBLIC PRE-PRIMARY ENROLMENT"
      subtitle="Kaduna State Public Pre-Primary Education by Level and LGA"
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
            title="Total Enrollment"
            value={formatNumber(summaryStats.totalStudents)}
            subtitle={`${summaryStats.genderRatio}% girls`}
          />
          <SummaryCard
            title="Kindergarten/ECCD"
            value={formatNumber(summaryStats.kindergartenTotal)}
            subtitle={`${summaryStats.kindergartenGenderRatio}% girls`}
          />
          <SummaryCard
            title="Nursery"
            value={formatNumber(summaryStats.nurseryTotal)}
            subtitle={`${summaryStats.nurseryGenderRatio}% girls`}
          />
          <SummaryCard
            title="Nursery 3"
            value={formatNumber(summaryStats.nursery3Total)}
            subtitle={`${summaryStats.nursery3GenderRatio}% girls`}
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
              valueKey="total"
              dataType="prePrimary"
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
          columns={tableColumns}
          title={`Detailed ${view === 'overview' ? 'Pre-Primary' : view} Enrollment Data`}
          exportable={true}
        />
//       <DataTable 
//   data={filteredData} 
//   title="Pre-Primary Enrollment Data"
//   dataType="prePrimary"
// />
       }
    />
  );
};

export default PrePrimaryDashboard;