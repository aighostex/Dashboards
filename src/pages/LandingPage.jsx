import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';

const LandingPage = () => {
  const educationLevels = [
    {
      id: 'preprimary',
      title: 'Pre-Primary Education',
      description: 'Early childhood education data and statistics',
      color: 'blue',
      icon: '🎓',
      dashboards: [
        { id: 'total', name: 'Total Enrollment', description: 'Overall pre-primary enrollment statistics' },
        { id: 'public', name: 'Public Schools', description: 'Public pre-primary school data' },
        { id: 'private', name: 'Private Schools', description: 'Private pre-primary school data' },
        { id: 'comparison', name: 'Public vs Private', description: 'Comparison between public and private schools' }
      ]
    },
    {
      id: 'primary',
      title: 'Primary Education',
      description: 'Primary school education data and statistics',
      color: 'green',
      icon: '📚',
      dashboards: [
        { id: 'total', name: 'Total Enrollment', description: 'Overall primary enrollment statistics' },
        { id: 'public', name: 'Public Schools', description: 'Public primary school data' },
        { id: 'private', name: 'Private Schools', description: 'Private primary school data' },
        { id: 'comparison', name: 'Public vs Private', description: 'Comparison between public and private schools' }
      ]
    },
    {
      id: 'secondary',
      title: 'Secondary Education',
      description: 'Secondary school education data and statistics',
      color: 'purple',
      icon: '🏫',
      dashboards: [
        { id: 'total', name: 'Total Enrollment', description: 'Overall secondary enrollment statistics' },
        { id: 'public', name: 'Public Schools', description: 'Public secondary school data' },
        { id: 'private', name: 'Private Schools', description: 'Private secondary school data' },
        { id: 'comparison', name: 'Public vs Private', description: 'Comparison between public and private schools' }
      ]
    }
  ];

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200',
      green: 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200',
      purple: 'bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <DashboardLayout
      title="Education Data Dashboard"
      subtitle="Explore education statistics across different levels in Kaduna State"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationLevels.map(level => (
          <div
            key={level.id}
            className={`border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md ${getColorClass(level.color)}`}
          >
            <div className="flex items-start mb-4">
              <span className="text-3xl mr-3">{level.icon}</span>
              <div>
                <h2 className="text-xl font-bold">{level.title}</h2>
                <p className="text-sm opacity-80">{level.description}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Available Dashboards:</h3>
              <ul className="space-y-1 text-sm">
                {level.dashboards.map(dashboard => (
                  <li key={dashboard.id} className="flex items-center">
                    <span className="w-2 h-2 bg-current opacity-50 rounded-full mr-2"></span>
                    {dashboard.name}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              to={`/${level.id}/total`}
              className={`inline-block mt-2 px-4 py-2 rounded-md font-medium ${
                level.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                level.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                'bg-purple-600 hover:bg-purple-700'
              } text-white transition-colors`}
            >
              Explore {level.title}
            </Link>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default LandingPage;