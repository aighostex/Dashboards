const DataTable = ({ data, view }) => {
  const getViewTitle = () => {
    switch(view) {
      case "prePrimary": return "Pre-Primary";
      case "primary": return "Primary";
      default: return "Enrollment";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Detailed {getViewTitle()} Data</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LGA</th>
            <th colSpan="4" className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pre-Primary</th>
            <th colSpan="4" className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Primary</th>
          </tr>
          <tr>
            <th className="px-4 py-3 bg-gray-50"></th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Boys</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Girls</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Boys</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Girls</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map(item => (
            <tr key={item.lga} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lga}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.schools.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.boys.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.girls.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right font-medium">{item.prePrimary.total.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.primary.schools.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.primary.boys.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.primary.girls.toLocaleString()}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right font-medium">{item.primary.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;