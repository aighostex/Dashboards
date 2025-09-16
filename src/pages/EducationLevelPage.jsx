import React from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Sidebar from '../components/layout/Sidebar';

// Import all dashboards
import EnrolmentDashboard from './dashboards/prePrimary/EnrolmentDashboard';
import PrePrimaryComparisonDashboard from './dashboards/prePrimary/PrePrimaryComparisonDashboard';
import PrivatePrePrimaryDashboard from './dashboards/prePrimary/PrivatePrePrimaryDashboard';
import PrePrimaryDashboard from './dashboards/prePrimary/PrePrimaryDashboard';


// import TotalPrimary from './dashboards/primary/TotalPrimary';
// import PublicPrimary from './dashboards/primary/PublicPrimary';
// import PrivatePrimary from './dashboards/primary/PrivatePrimary';
// import PrimaryComparison from './dashboards/primary/PrimaryComparison';

// import TotalSecondary from './dashboards/secondary/TotalSecondary';
// import PublicSecondary from './dashboards/secondary/PublicSecondary';
// import PrivateSecondary from './dashboards/secondary/PrivateSecondary';
// import SecondaryComparison from './dashboards/secondary/SecondaryComparison';

const EducationLevelPage = () => {
  const { level, dashboard } = useParams();
  const navigate = useNavigate();

  // Dashboard configurations for each education level
  const dashboardConfigs = {
    preprimary: {
      title: 'PRE-PRIMARY SCHOOL ENROLMENT',
      dashboards: [
        { id: 'total', name: 'Kaduna State Public Pre-Primary and Primary Education', component: EnrolmentDashboard },
        { id: 'public', name: 'Public Schools', component: PrePrimaryDashboard },
        { id: 'private', name: 'Private Schools', component: PrivatePrePrimaryDashboard },
        { id: 'comparison', name: 'Public vs Private', component: PrePrimaryComparisonDashboard }
      ]
    },
    // primary: {
    //   title: 'Primary Education',
    //   dashboards: [
    //     { id: 'total', name: 'Total Enrollment', component: TotalPrimary },
    //     { id: 'public', name: 'Public Schools', component: PublicPrimary },
    //     { id: 'private', name: 'Private Schools', component: PrivatePrimary },
    //     { id: 'comparison', name: 'Public vs Private', component: PrimaryComparison }
    //   ]
    // },
    // secondary: {
    //   title: 'Secondary Education',
    //   dashboards: [
    //     { id: 'total', name: 'Total Enrollment', component: TotalSecondary },
    //     { id: 'public', name: 'Public Schools', component: PublicSecondary },
    //     { id: 'private', name: 'Private Schools', component: PrivateSecondary },
    //     { id: 'comparison', name: 'Public vs Private', component: SecondaryComparison }
    //   ]
    // }
  };

  const currentConfig = dashboardConfigs[level] || dashboardConfigs.preprimary;
  const currentDashboard = currentConfig.dashboards.find(d => d.id === dashboard) || currentConfig.dashboards[0];

  // Handle dashboard change
  const handleDashboardChange = (newDashboard) => {
    navigate(`/${level}/${newDashboard}`);
  };

  return (
    <DashboardLayout
     title={currentConfig.title}
     subtitle={currentDashboard.name}
      educationLevel={level}
      onDashboardChange={handleDashboardChange}
      currentDashboard={currentDashboard.id}
      dashboards={currentConfig.dashboards}
    >
      <Routes>
        {currentConfig.dashboards.map(dashboard => (
          <Route
            key={dashboard.id}
            path={dashboard.id}
            element={React.createElement(dashboard.component)}
          />
        ))}
        {/* Default route */}
        <Route path="/" element={React.createElement(currentConfig.dashboards[0].component)} />
      </Routes>
    </DashboardLayout>
  );
};

export default EducationLevelPage;