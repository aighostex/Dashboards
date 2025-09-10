const ViewToggle = ({ views, currentView, onChange,  }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex-1">
    <span className="block text-sm font-medium text-gray-700 mb-1">View:</span>
    <div className="flex space-x-2">
      {views.map(view => (
        <button
          key={view.value}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            currentView === view.value 
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onChange(view.value)}
        >
          {view.label}
        </button>
      ))}
    </div>
  </div>
);

export default ViewToggle;