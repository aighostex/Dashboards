import { FaChildren, FaHospital } from "react-icons/fa6";
import EnrolmentDashboard from '../pages/dashboards/prePrimary/EnrolmentDashboard'
import PrePrimaryComparisonDashboard from '../pages/dashboards/prePrimary/PrePrimaryComparisonDashboard';
import PrivatePrePrimaryDashboard from '../pages/dashboards/prePrimary/PrivatePrePrimaryDashboard';
import PrePrimaryDashboard from '../pages/dashboards/prePrimary/PrePrimaryDashboard';

export const navigationItems = [
    {
      name: 'Pre-Primary Enrolment',
      path: '/preprimary/total',
      icon: FaChildren
    },
    {
      name: 'Public Pre-Primary',
      path: '/preprimary/public',
      icon: FaHospital
    },
    {
      name: 'Private Pre-Primary',
      path: '/preprimary/private',
      icon: FaHospital
    },
    {
      name: 'Pre-Primary Comparison',
      path: '/preprimary/comparison',
      icon: FaHospital
    },
  ];


export const navLinks = [
    { 
      name: 'About', 
      href: '#',
      
    },
    { 
      name: 'Platforms', 
      href: '#',
      dropdown: [
        { id:'preprimary', name: 'Pre-Primary'},
        { id:'primary', name: 'Primary Education'},
        { id:'secondary', name: 'Secondary Education'},
        
      ]
    },
    { 
      name: 'Services', 
      href: '#',
      
    },
  ];



export const dashboardConfigs = {
    preprimary: {
      dashboards: [
        { 
          id: 'total', 
          component: EnrolmentDashboard,
        },
        { 
          id: 'public', 
          component: PrePrimaryDashboard,
        },
        { 
          id: 'private', 
          component: PrivatePrePrimaryDashboard,
        },
        { 
          id: 'comparison', 
          component: PrePrimaryComparisonDashboard,
        }
      ]
    }
  };