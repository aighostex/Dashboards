const DashboardHeader = ({ title, subtitle }) => (
  <header className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
    {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
  </header>
);

export default DashboardHeader;
