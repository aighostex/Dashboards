export const CHART_COLORS = {
  primary: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'],
};

export const BAR_CHART_CONFIG = {
  margin: { top: 20, right: 30, left: 20, bottom: 70 },
  xAxis: { 
    dataKey: 'lga', 
    angle: -45, 
    textAnchor: 'end', 
    height: 80 
  },
  yAxis: {},
  tooltip: { formatter: (value) => value.toLocaleString() }
};

export const PIE_CHART_CONFIG = {
  cx: '50%',
  cy: '50%',
  labelLine: false,
  label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`,
  outerRadius: 80,
  tooltip: { formatter: (value) => value.toLocaleString() }
};

export const getChartColors = (dataType = 'education') => {
  return CHART_COLORS[dataType] || CHART_COLORS.primary;
};


export const getChartConfig = (chartType, dataType = 'education') => {
  const baseConfig = {
    margin: { top: 20, right: 30, left: 20, bottom: 60 },
    xAxis: { 
      dataKey: 'lga', 
      angle: -45, 
      textAnchor: 'end',
      height: 80,
      interval: 0,
      tick: { fontSize: 10 }
    },
    yAxis: { 
      allowDecimals: false,
      tick: { fontSize: 10 }
    },
    tooltip: {
      formatter: (value, name) => {
        const formattedValue = new Intl.NumberFormat().format(value);
        return [`${formattedValue}`, name];
      }
    }
  };

  // Different color schemes for different data types
  const colorSchemes = {
    education: ['#8884d8', '#82ca9d', '#ffc658'],
    prePrimary: ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'],
    comparison: ['#8884d8', '#82ca9d', '#0088FE', '#00C49F', '#FFBB28', '#FF8042']
  };

  return {
    ...baseConfig,
    colors: colorSchemes[dataType] || colorSchemes.education
  };
};