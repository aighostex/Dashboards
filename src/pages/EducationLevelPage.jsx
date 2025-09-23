import React from 'react';
import { useParams } from 'react-router-dom';
import { dashboardConfigs } from '../utils/constants';


const EducationLevelPage = () => {
  const { level, dashboard } = useParams();

  // Dashboard configurations for each education level
  const currentConfig = dashboardConfigs[level] || dashboardConfigs.preprimary;
  const currentDashboard = currentConfig.dashboards.find(d => d.id === (dashboard || 'total')) || currentConfig.dashboards[0];

  // Render the current dashboard component
  const DashboardComponent = currentDashboard.component;
  
  return <DashboardComponent key={dashboard || 'total'} />;
};

export default EducationLevelPage;