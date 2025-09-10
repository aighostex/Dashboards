const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className={`flex justify-center items-center p-8 h-[100vh] ${className}`}>
      <div
        className={`animate-spin rounded-full border-b-2 border-blue-500 ${sizeClasses[size]}`}
      ></div>
      <span className="ml-2 text-gray-600">Loading data...</span>
    </div>
  );
};

export default LoadingSpinner;