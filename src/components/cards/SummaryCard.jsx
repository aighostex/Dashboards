
const SummaryCard = ({ title, value, subtitle, color = '#0ca16b', className = '' }) => (
    <div className={`bg-white/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}>
      <div className="text-xl md:text-3xl font-bold mb-2" style={{ color }}>{value.toLocaleString()}</div>
      <div className="text-gray-800 font-semibold">{title}</div>
      {subtitle && <div className="text-gray-600 text-sm mt-1">{subtitle}</div>}
    </div>
);

export default SummaryCard;