// const SummaryCard = ({title, value, subtitle, className ='' }) => (
//   <div className={`bg-white border border-gray-100 rounded-xl shadow-sm p-4 ${className}`}>
//     <h3 className="text-xs uppercase text-gray-500 font-semibold">{title}</h3>
//     <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//     {subtitle && <span className="text-xs text-gray-500 mt-1">{subtitle}</span>}
//   </div>
// );

// export default SummaryCard;




const SummaryCard = ({ title, value, subtitle, color = '#0ca16b', className = '' }) => (
    <div className={`bg-white/80 backdrop-blur-md rounded-lg p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md ${className}`}>
      <div className="text-3xl font-bold mb-2" style={{ color }}>{value.toLocaleString()}</div>
      <div className="text-gray-800 font-semibold">{title}</div>
      {subtitle && <div className="text-gray-600 text-sm mt-1">{subtitle}</div>}
    </div>
);

export default SummaryCard;