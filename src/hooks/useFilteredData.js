import { useMemo, useState } from 'react';

const useFilteredData = (data, filterConfig) => {
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    let result = [...data];
    
    // Apply search filter
    if (searchTerm && filterConfig.searchKey) {
      const searchKey = filterConfig.searchKey;
      result = result.filter(item => {
        const value = item[searchKey];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'ALL') {
        result = result.filter(item => {
          const itemValue = item[key];
          return itemValue && itemValue.toString() === value;
        });
      }
    });
    
    return result;
  }, [data, filters, searchTerm, filterConfig]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    filteredData,
    filters,
    updateFilter,
    searchTerm,
    setSearchTerm
  };
};

export default useFilteredData;