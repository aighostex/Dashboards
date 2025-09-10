import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { getChartConfig } from '../../utils/chartConfigs';

const BarChartComponent = ({ data, view, dataType = 'education' }) => {
  const { margin, xAxis, yAxis, tooltip, colors } = getChartConfig('bar', dataType);

  // For pre-primary data, we need different handling
  const isPrePrimary = dataType === 'prePrimary';

  return (
    <div className="h-90 text-[0.7rem]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis {...xAxis} />
          <YAxis {...yAxis} />
          <Tooltip {...tooltip} />
          <Legend />
          
          {isPrePrimary ? (
            // Pre-primary specific rendering
            view === "overview" ? (
              // Overview view for pre-primary: show all levels
              <>
                <Bar dataKey="kindergarten" name="Kindergarten" fill={colors[0]} />
                <Bar dataKey="nursery" name="Nursery" fill={colors[1]} />
                <Bar dataKey="nursery3" name="Nursery 3" fill={colors[2]} />
              </>
            ) : (
              // Specific level view for pre-primary: show gender breakdown
              <>
                <Bar dataKey="boys" name="Boys" fill={colors[0]} />
                <Bar dataKey="girls" name="Girls" fill={colors[1]} />
              </>
            )
          ) : (
            // Original education data rendering
            view === "overview" ? (
              <>
                <Bar dataKey="prePrimary" name="Pre-Primary" fill={colors[0]} />
                <Bar dataKey="primary" name="Primary" fill={colors[1]} />
              </>
            ) : (
              <>
                <Bar dataKey="boys" name="Boys" fill={colors[0]} />
                <Bar dataKey="girls" name="Girls" fill={colors[1]} />
              </>
            )
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;