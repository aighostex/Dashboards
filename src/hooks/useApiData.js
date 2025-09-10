import { useState, useEffect } from 'react';

const useApiData = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, isLoading, error, refetch: fetchData };
};

export default useApiData;