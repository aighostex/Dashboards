import React from 'react';
import { formatValueByType } from '../../utils/dataFormatters';

const DataTable = ({ data, columns, title, dataType = 'education' }) => {
  // If columns are provided, use them to render the table
  const shouldUseColumns = columns && columns.length > 0;

  const getTableHeaders = () => {
    if (shouldUseColumns) {
      return (
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.label}
            </th>
          ))}
        </tr>
      );
    }

    if (dataType === 'comparison') {
      return (
        <>
          <tr>
            <th rowSpan="2" className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              LGA
            </th>
            <th colSpan="4" className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Public Schools
            </th>
            <th colSpan="4" className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Private Schools
            </th>
            <th rowSpan="2" className="px-4 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Private Share
            </th>
          </tr>
          <tr>
            {/* Public School Headers */}
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pupils</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Girls</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Girls</th>
            
            {/* Private School Headers */}
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pupils</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Girls</th>
            <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Girls</th>
          </tr>
        </>
      );
    }

    // Default education/pre-primary table headers
    return (
      <>
        <tr>
          <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LGA</th>
          <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Schools</th>
          <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Boys</th>
          <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Girls</th>
          <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% Girls</th>
        </tr>
      </>
    );
  };

  const renderCellWithColumns = (item, column) => {
    if (column.format === 'function' && typeof column.format === 'function') {
      return column.format(item[column.key], item);
    }
    
    if (column.key.includes('.')) {
      // Handle nested properties like 'public.pupils'
      const keys = column.key.split('.');
      let value = item;
      for (const key of keys) {
        value = value?.[key];
        if (value === undefined) break;
      }
      return formatValueByType(value, column.format);
    }
    
    return formatValueByType(item[column.key], column.format);
  };

  const renderRowWithColumns = (item) => {
    return (
      <tr key={item.lga || item.id} className="hover:bg-gray-50">
        {columns.map((column, colIndex) => (
          <td
            key={colIndex}
            className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-left"
          >
            {renderCellWithColumns(item, column)}
          </td>
        ))}
      </tr>
    );
  };

  const renderComparisonRow = (item) => {
    const privateShare = ((item.private.pupils / (item.public.pupils + item.private.pupils)) * 100).toFixed(1);
    
    return (
      <tr key={item.lga} className="hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lga}</td>
        
        {/* Public School Data */}
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.public.schools.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.public.pupils.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.public.girls.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.public.percent_girls}%</td>
        
        {/* Private School Data */}
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.private.schools.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.private.pupils.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.private.girls.toLocaleString()}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.private.percent_girls}%</td>
        
        {/* Private Share */}
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right font-medium">
          {privateShare}%
        </td>
      </tr>
    );
  };

  const renderEducationRow = (item) => {
    const levelData = item.prePrimary || item.primary || item;
    const percentGirls = levelData.total > 0 
      ? ((levelData.girls / levelData.total) * 100).toFixed(1) 
      : '0.0';
    
    return (
      <tr key={item.lga} className="hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lga}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{levelData.schools?.toLocaleString() || '-'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{levelData.boys?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{levelData.girls?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right font-medium">{levelData.total?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{percentGirls}%</td>
      </tr>
    );
  };

  const renderPrePrimaryRow = (item) => {
    const percentGirls = item.prePrimary.total.total > 0 
      ? ((item.prePrimary.total.girls / item.prePrimary.total.total) * 100).toFixed(1) 
      : '0.0';
    
    return (
      <tr key={item.lga} className="hover:bg-gray-50">
        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.lga}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.total.schools?.toLocaleString() || '-'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.total.boys?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{item.prePrimary.total.girls?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right font-medium">{item.prePrimary.total.total?.toLocaleString() || '0'}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">{percentGirls}%</td>
      </tr>
    );
  };

  const renderRow = (item) => {
    if (shouldUseColumns) {
      return renderRowWithColumns(item);
    }

    switch (dataType) {
      case 'comparison':
        return renderComparisonRow(item);
      case 'prePrimary':
        return renderPrePrimaryRow(item);
      default:
        return renderEducationRow(item);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-500 text-center py-8">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      
      </div>
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {getTableHeaders()}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;