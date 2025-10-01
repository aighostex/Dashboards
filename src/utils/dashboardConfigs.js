import { FaChildren, FaSchool } from "react-icons/fa6";
import EnrolmentDashboard from '../pages/dashboards/prePrimary/EnrolmentDashboard'
import PrePrimaryComparisonDashboard from '../pages/dashboards/prePrimary/PrePrimaryComparisonDashboard';
import PrivatePrePrimaryDashboard from '../pages/dashboards/prePrimary/PrivatePrePrimaryDashboard';
import PrePrimaryDashboard from '../pages/dashboards/prePrimary/PrePrimaryDashboard';
import PrimaryEnrolment from "../pages/dashboards/primary/PrimaryEnrolment";
import SecondaryEnrolment from "../pages/dashboards/secondary/SecondaryEnrolment";

export const dashboardConfigs = {
  // Pre-primary
  preprimary: {
    dashboards: [
      { 
        id: 'total', 
        name: 'Pre-Primary Enrolment',
        icon: FaChildren,
        component: EnrolmentDashboard,
      },
      { 
        id: 'public', 
        name: 'Public Pre-Primary',
        icon: FaSchool,
        component: PrePrimaryDashboard,
      },
      { 
        id: 'private', 
        name: 'Private Pre-Primary',
        icon: FaSchool,
        component: PrivatePrePrimaryDashboard,
      },
      { 
        id: 'comparison', 
        name: 'Pre-Primary Comparison',
        icon: FaSchool,
        component: PrePrimaryComparisonDashboard,
      }
    ]
  },

  // Primary
  primary: {
    dashboards: [
      { 
        id: 'total',
        name: 'Primary Enrolment',
        icon: FaChildren,
        component: PrimaryEnrolment,
      },
      
    ]
  },

  // Secondary
  secondary: {
    dashboards: [
      { 
        id: 'total',
        name: 'Secondary Enrolment',
        icon: FaChildren,
        component: SecondaryEnrolment,
      },
      
    ]
  }
};
