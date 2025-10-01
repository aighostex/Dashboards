import { dashboardConfigs } from "./dashboardConfigs";


const sectionKey = location.pathname.split("/")[1];

export const navigationItems =
    dashboardConfigs[sectionKey]?.dashboards.map((dashboard) => ({
      name: dashboard.name,
      path: `/${sectionKey}/${dashboard.id}`,
      icon: dashboard.icon,
})) || [];





export const navLinks = [
    { 
      name: 'Home', 
      href: '/',
      
    },
    { 
      name: 'About', 
      href: '/about',
      
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
      href: '/services',
      
    },
  ];



