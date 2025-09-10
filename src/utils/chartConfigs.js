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
  const colors = getChartColors(dataType);
  
  if (chartType === 'bar') {
    return { ...BAR_CHART_CONFIG, colors };
  }
  
  if (chartType === 'pie') {
    return { ...PIE_CHART_CONFIG, colors };
  }
  
  return { colors };
};