const ChartContainer = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
    <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">{title}</h2>
    {children}
  </div>
);

export default ChartContainer;