const SummaryCard = ({title, value, subtitle, className ='' }) => (
  <div className={`bg-white rounded-xl shadow-sm p-4 ${className}`}>
    <h3 className="text-xs uppercase text-gray-500 font-semibold">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    {subtitle && <span className="text-xs text-gray-500 mt-1">{subtitle}</span>}
  </div>
);

export default SummaryCard;