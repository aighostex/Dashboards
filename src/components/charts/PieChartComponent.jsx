
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import { COLORS } from '../../data/enrollmentData';

const PieChartComponent = ({ data }) => (
  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          // Donut effect
          innerRadius={75}   // hollow center
          outerRadius={100}  // wider slices
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={true}   // enable animation
          animationBegin={0}
          animationDuration={2000}   // smooth 1.2s animation
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]} 
              stroke="white"       // optional border between slices
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip formatter={(value) => value.toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartComponent;
