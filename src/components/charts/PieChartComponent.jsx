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
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => value.toLocaleString()} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default PieChartComponent;