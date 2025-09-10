export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString();
};

// Calculate percentage
export const calculatePercentage = (part, whole) => {
  if (whole === 0) return 0;
  return ((part / whole) * 100).toFixed(1);
};

// Process data for charts
export const processChartData = (data, view) => {
  if (!data) return [];
  
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
};

// Process data for gender pie chart
export const processGenderData = (data, view) => {
  if (!data) return [];
  
  if (view === 'prePrimary') {
    const boys = data.reduce((sum, item) => sum + (item.prePrimary?.boys || 0), 0);
    const girls = data.reduce((sum, item) => sum + (item.prePrimary?.girls || 0), 0);
    
    return [
      { name: 'Boys', value: boys },
      { name: 'Girls', value: girls }
    ];
  } else {
    const boys = data.reduce((sum, item) => sum + (item.primary?.boys || 0), 0);
    const girls = data.reduce((sum, item) => sum + (item.primary?.girls || 0), 0);
    
    return [
      { name: 'Boys', value: boys },
      { name: 'Girls', value: girls }
    ];
  }
};

// Calculate summary statistics
export const calculateSummaryStats = (data, totals) => {
  if (!data || data.length === 0 || !totals) {
    return {
      prePrimarySchools: 0,
      primarySchools: 0,
      prePrimaryStudents: 0,
      primaryStudents: 0,
      genderRatio: 0
    };
  }
  
  const prePrimarySchools = data.reduce((sum, item) => sum + (item.prePrimary?.schools || 0), 0);
  const primarySchools = data.reduce((sum, item) => sum + (item.primary?.schools || 0), 0);
  const prePrimaryStudents = data.reduce((sum, item) => sum + (item.prePrimary?.total || 0), 0);
  const primaryStudents = data.reduce((sum, item) => sum + (item.primary?.total || 0), 0);
  
  return {
    prePrimarySchools,
    primarySchools,
    prePrimaryStudents,
    primaryStudents,
    genderRatio: totals.primary && totals.primary.total > 0 
      ? ((totals.primary.girls / totals.primary.total) * 100).toFixed(1)
      : 0
  };
};

// Format values based on type
export const formatValueByType = (value, formatType) => {
  if (value === undefined || value === null) return '-';
  
  switch (formatType) {
    case 'number':
      return typeof value === 'number' ? formatNumber(value) : value;
    case 'percent':
      return `${value}%`;
    case 'currency':
      return `₦${formatNumber(value)}`;
    default:
      return value;
  }
};

// Pre-Primary specific data formatters
// export const processPrePrimaryChartData = (data, view) => {
//   if (!data || data.length === 0) return [];
  
//   return data.map(item => {
//     if (view === 'overview') {
//       return {
//         lga: item.lga,
//         total: item.prePrimary?.total?.total || 0,
//         boys: item.prePrimary?.total?.boys || 0,
//         girls: item.prePrimary?.total?.girls || 0
//       };
//     } else {
//       const levelKey = view === 'kindergarten' ? 'kindergarten_eccd' : view;
//       return {
//         lga: item.lga,
//         total: item.prePrimary?.[levelKey]?.total || 0,
//         boys: item.prePrimary?.[levelKey]?.boys || 0,
//         girls: item.prePrimary?.[levelKey]?.girls || 0
//       };
//     }
//   }).sort((a, b) => b.total - a.total);
// };

export const processPrePrimaryChartData = (data, view) => {
  if (!data || data.length === 0) return [];
  
  return data.map(item => {
    if (view === 'overview') {
      return {
        lga: item.lga,
        // For overview, include all levels as separate properties
        prePrimary: item.prePrimary?.total?.total || 0,
        kindergarten: item.prePrimary?.kindergarten_eccd?.total || 0,
        nursery: item.prePrimary?.nursery?.total || 0,
        nursery3: item.prePrimary?.nursery_3?.total || 0,
        // Also include the individual values for gender charts
        boys: item.prePrimary?.total?.boys || 0,
        girls: item.prePrimary?.total?.girls || 0
      };
    } else {
      const levelKey = view === 'kindergarten' ? 'kindergarten_eccd' : view;
      return {
        lga: item.lga,
        // For specific views, use the main dataKey expected by the chart
        prePrimary: item.prePrimary?.[levelKey]?.total || 0,
        // Also include gender data
        boys: item.prePrimary?.[levelKey]?.boys || 0,
        girls: item.prePrimary?.[levelKey]?.girls || 0
      };
    }
  }).sort((a, b) => b.prePrimary - a.prePrimary);
};

export const calculatePrePrimarySummaryStats = (data) => {
  if (!data || data.length === 0) {
    return {
      totalStudents: 0,
      kindergartenTotal: 0,
      nurseryTotal: 0,
      nursery3Total: 0,
      genderRatio: 0,
      kindergartenGenderRatio: 0,
      nurseryGenderRatio: 0,
      nursery3GenderRatio: 0
    };
  }

  const totalStudents = data.reduce((sum, item) => sum + (item.prePrimary?.total?.total || 0), 0);
  const kindergartenTotal = data.reduce((sum, item) => sum + (item.prePrimary?.kindergarten_eccd?.total || 0), 0);
  const nurseryTotal = data.reduce((sum, item) => sum + (item.prePrimary?.nursery?.total || 0), 0);
  const nursery3Total = data.reduce((sum, item) => sum + (item.prePrimary?.nursery_3?.total || 0), 0);
  
  const totalGirls = data.reduce((sum, item) => sum + (item.prePrimary?.total?.girls || 0), 0);
  const kindergartenGirls = data.reduce((sum, item) => sum + (item.prePrimary?.kindergarten_eccd?.girls || 0), 0);
  const nurseryGirls = data.reduce((sum, item) => sum + (item.prePrimary?.nursery?.girls || 0), 0);
  const nursery3Girls = data.reduce((sum, item) => sum + (item.prePrimary?.nursery_3?.girls || 0), 0);

  return {
    totalStudents,
    kindergartenTotal,
    nurseryTotal,
    nursery3Total,
    genderRatio: totalStudents > 0 ? Math.round((totalGirls / totalStudents) * 100) : 0,
    kindergartenGenderRatio: kindergartenTotal > 0 ? Math.round((kindergartenGirls / kindergartenTotal) * 100) : 0,
    nurseryGenderRatio: nurseryTotal > 0 ? Math.round((nurseryGirls / nurseryTotal) * 100) : 0,
    nursery3GenderRatio: nursery3Total > 0 ? Math.round((nursery3Girls / nursery3Total) * 100) : 0
  };
};

// Process pre-primary gender data for pie chart
// export const processPrePrimaryGenderData = (data, view, totals) => {
//   if (!data || data.length === 0) return [];
  
//   if (view === 'overview') {
//     return [
//       { name: 'Boys', value: totals?.total?.boys || 0 },
//       { name: 'Girls', value: totals?.total?.girls || 0 }
//     ];
//   } else {
//     const levelKey = view === 'kindergarten' ? 'kindergarten_eccd' : view;
//     return [
//       { name: 'Boys', value: totals?.[levelKey]?.boys || 0 },
//       { name: 'Girls', value: totals?.[levelKey]?.girls || 0 }
//     ];
//   }
// };
export const processPrePrimaryGenderData = (data, view, totals) => {
  if (!data || data.length === 0) return [];
  
  if (view === 'overview') {
    // For overview, use the filtered data to show level distribution
    const kindergarten = data.reduce((sum, item) => sum + (item.prePrimary?.kindergarten_eccd?.total || 0), 0);
    const nursery = data.reduce((sum, item) => sum + (item.prePrimary?.nursery?.total || 0), 0);
    const nursery3 = data.reduce((sum, item) => sum + (item.prePrimary?.nursery_3?.total || 0), 0);
    
    return [
      { name: 'Kindergarten/ECCD', value: kindergarten },
      { name: 'Nursery', value: nursery },
      { name: 'Nursery 3', value: nursery3 }
    ];
  } else {
    // For specific views, show gender distribution using totals
    const levelKey = view === 'kindergarten' ? 'kindergarten_eccd' : view;
    return [
      { name: 'Boys', value: totals?.[levelKey]?.boys || 0 },
      { name: 'Girls', value: totals?.[levelKey]?.girls || 0 }
    ];
  }
};


export const processPrePrimaryLevelData = (totals) => {
  if (!totals) return [];
  
  return [
    { name: 'Kindergarten/ECCD', value: totals.kindergarten_eccd?.total || 0 },
    { name: 'Nursery', value: totals.nursery?.total || 0 },
    { name: 'Nursery 3', value: totals.nursery_3?.total || 0 }
  ];
};