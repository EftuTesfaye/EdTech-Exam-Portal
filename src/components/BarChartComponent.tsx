import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BarChartComponent({ data }: any) {
  return (
    <div>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={data} margin={{ right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={"name"} fill="#8884d8" />
          <Bar dataKey={"count"} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
