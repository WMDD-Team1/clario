import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function BalanceChart({ data }: { data: any[] }) {
  const COLORS = ["#4B5563", "#D1D5DB"];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center">
      <h3 className="font-semibold mb-3 self-start">This Month Balance</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={80}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
