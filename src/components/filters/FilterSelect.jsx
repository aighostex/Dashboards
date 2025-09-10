const FilterSelect = ({ label, value, onChange, options }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex-1">
      <label htmlFor="filter-select" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id="filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;