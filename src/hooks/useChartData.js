import { useMemo } from 'react';

const useChartData = (data, view, dataType = 'education') => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    if (dataType === 'education') {
      if (view === 'overview') {
        return data.map(item => ({
          lga: item.lga,
          prePrimary: item.prePrimary?.total || 0,
          primary: item.primary?.total || 0
        }));
      } else if (view === 'prePrimary') {
        return data.map(item => ({
          lga: item.lga,
          boys: item.prePrimary?.boys || 0,
          girls: item.prePrimary?.girls || 0,
          total: item.prePrimary?.total || 0
        }));
      } else {
        return data.map(item => ({
          lga: item.lga,
          boys: item.primary?.boys || 0,
          girls: item.primary?.girls || 0,
          total: item.primary?.total || 0
        }));
      }
    }
    
    // For other data types (health, economic, etc.)
    return data.map(item => ({
      name: item.name || item.lga || item.facilityName || 'Item',
      value: item.value || item.total || item.patients || item.gdp || 0,
      ...item
    }));
  }, [data, view, dataType]);

  return chartData;
};

export default useChartData;