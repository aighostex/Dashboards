import { useMemo } from 'react';
import { processData } from '../utils/dataProcessors';
import { rawData } from '../data/enrollmentData';

export const useEnrollmentData = () => {
  const enrollmentData = useMemo(() => processData(rawData), []);
  const totalData = useMemo(() => enrollmentData.find(item => item.lga === "TOTAL"), [enrollmentData]);
  
  return { enrollmentData, totalData };
};
