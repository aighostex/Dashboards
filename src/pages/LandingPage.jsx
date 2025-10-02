import { useState, useEffect, //useMemo 
} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Navbar from '../components/layout/Navbar';
import SummaryCard from '../components/cards/SummaryCard';
import PieChartComponent from '../components/charts/PieChartComponent';

// import { educationApi } from '../services/educationApi'
// import useApiData from '../hooks/useApiData';
// import useFilteredData from '../hooks/useFilteredData';
// import { 
//   calculateSummaryStats,
//  } from '../utils/dataFormatters';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // const { data: apiData, isLoading, error} = useApiData(
  //   ()=>educationApi.getAll()
  // );

  //  const { data: rawData, totals } = useMemo(() => {
  //     if (!apiData) return { data: [], totals: null };
  //     return {
  //       data: apiData.data || [],
  //       totals: apiData.totals || null
  //     };
  //   }, [apiData]);

  //    const { filteredData } = 
  //     useFilteredData(rawData);

  
  //  const summaryStats = useMemo(() => 
  //     calculateSummaryStats(filteredData, totals),
  //     [filteredData, totals]
  //   );

  // Total Data 
  const summaryData = {
    totalPublicSchools: 4150,
    totalPrivateSchools: 1900,
    totalEnrollment: 2193468,
    totalTeachers: 38270,
    urbanSchools: 353,
    ruralSchools: 3797,
    prePrimaryPrimary: 1858,
    primaryOnly: 2292,
    juniorSecondary: 428,
    seniorSecondary: 368
  };

  // Chart data for public vs private schools
  const schoolTypeData = [
    { name: 'Public Schools', value: 4150 },
    { name: 'Private Schools', value: 1900 }
  ];

  // School level distribution
  const schoolLevelData = [
    { name: 'Pre-Primary & Primary', schools: 1858 },
    { name: 'Primary Only', schools: 2292 },
    { name: 'Junior Secondary', schools: 428 },
    { name: 'Senior Secondary', schools: 368 }
  ];

  // Enrollment by level
  const enrollmentData = [
    { level: 'Pre-Primary & Primary', male: 886355, female: 864544, total: 1750899 },
    { level: 'Junior Secondary', male: 114713, female: 115397, total: 230110 },
    { level: 'Senior Secondary', male: 106354, female: 106105, total: 212459 }
  ];

  // Teacher distribution
  const teacherData = [
    { level: 'Pre-Primary & Primary', male: 10336, female: 14563, total: 24899 },
    { level: 'Junior Secondary', male: 3334, female: 2538, total: 5872 },
    { level: 'Senior Secondary', male: 4577, female: 2922, total: 7499 }
  ];

  // Your brand colors for charts
  const BRAND_COLORS = ['#0ca16b', '#128370', '#1c5479', '#0d8b5a'];

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-30 lg:pt-56 pb-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className={`text-3xl lg:text-7xl font-bold text-transparent bg-gradient-to-r from-dot via-primary to-secondary bg-clip-text mb-14 transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Kaduna State Annual School Census 2024/2025
          </h1>
          <p className={`text-sm lg:text-xl text-gray-700 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            Comprehensive overview of education statistics across public and private institutions in Kaduna State
          </p>
          
          {/* Quick Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <SummaryCard 
              title="Total Schools" 
              value={summaryData.totalPublicSchools + summaryData.totalPrivateSchools} 
              subtitle="Public & Private"
            />
            <SummaryCard 
              title="Total Enrollment" 
              value={summaryData.totalEnrollment} 
              subtitle="Students across all levels"
              color="#128370"
            />
            <SummaryCard 
              title="Total Teachers" 
              value={summaryData.totalTeachers} 
              subtitle="Teaching staff"
              color="#1c5479"
            />
            <SummaryCard 
              title="Rural Schools" 
              value={summaryData.ruralSchools} 
              subtitle="Majority of institutions"
              color="#0d8b5a"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white/50 backdrop-blur-md py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          {/* Navigation Tabs */}
          <div className={`flex space-x-4 mb-8 overflow-scroll border-b border-gray-300 pb-4 transition-all duration-700 delay-500 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {['overview', 'schools', 'enrollment', 'teachers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium cursor-pointer transition-all ${
                  activeTab === tab
                    ? 'bg-dot text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content with Staggered Animation */}
          <div className={`transition-all duration-700 delay-700 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">School Distribution</h3>
                  <PieChartComponent data={schoolTypeData} />
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">School Levels</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={schoolLevelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#6b7280" 
                        fontSize={12} 
                        angle={-45} 
                        textAnchor="end" 
                        height={80} 
                      />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="schools" fill={BRAND_COLORS[0]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Schools Tab */}
            {activeTab === 'schools' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">School Types</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                        <span>Regular Schools</span>
                        <span className="font-semibold text-dot">3,894</span>
                      </div>
                      <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                        <span>Islamiyya Schools</span>
                        <span className="font-semibold text-primary">28</span>
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <span>Nomadic Schools</span>
                        <span className="font-semibold text-secondary">228</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Location Distribution</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                        <span>Urban Schools</span>
                        <span className="font-semibold text-dot">{summaryData.urbanSchools.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-800 border-b border-gray-200 pb-2">
                        <span>Rural Schools</span>
                        <span className="font-semibold text-primary">{summaryData.ruralSchools.toLocaleString()}</span>
                      </div>
                      <div className="text-gray-600 text-sm pt-2">
                        {((summaryData.ruralSchools / summaryData.totalPublicSchools) * 100).toFixed(1)}% of schools are in rural areas
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">School Level Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={schoolLevelData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="schools" fill={BRAND_COLORS[0]} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Enrollment Tab */}
            {activeTab === 'enrollment' && (
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student Enrollment by Level</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="level" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill={BRAND_COLORS[0]} name="Male Students" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="female" fill={BRAND_COLORS[2]} name="Female Students" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Teachers Tab */}
            {activeTab === 'teachers' && (
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Teacher Distribution by Level</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={teacherData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="level" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="male" fill={BRAND_COLORS[0]} name="Male Teachers" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="female" fill={BRAND_COLORS[2]} name="Female Teachers" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Insights Section */}
      <section className="py-16 px-4 bg-gray-50/50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-gray-900 text-center mb-12 transition-all duration-1000 delay-800 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Key Insights
          </h2>
          <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-900 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center bg-white/80 p-6 rounded-lg border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-dot mb-2">91.5%</div>
              <div className="text-gray-700">Schools located in rural areas</div>
            </div>
            <div className="text-center bg-white/80 p-6 rounded-lg border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-primary mb-2">1:57</div>
              <div className="text-gray-700">Student to Teacher ratio</div>
            </div>
            <div className="text-center bg-white/80 p-6 rounded-lg border border-gray-200 shadow-sm transition-transform duration-500 hover:scale-105">
              <div className="text-4xl font-bold text-secondary mb-2">49.4%</div>
              <div className="text-gray-700">Female students enrollment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-white border-t border-gray-200 py-8">
        <div className={`max-w-6xl mx-auto px-4 text-center text-gray-600 transition-all duration-1000 delay-1000 transform ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-lg font-semibold text-gray-900 mb-2">Kaduna State Bureau of Statistics</p>
          <p>Annual School Census 2024/2025</p>
          <p className="text-sm mt-2">Data sourced from comprehensive school census across 23 Local Government Areas</p>
        </div>
      </footer> */}
    </div>
  );
};

export default LandingPage;