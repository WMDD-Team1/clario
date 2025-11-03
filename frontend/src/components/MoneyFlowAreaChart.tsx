import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchMoneyFlow } from "@api/services/dashboardService";
import { formatDate } from "@utils/formatDate";
import { MoneyFlowItem } from "@api/types/dashboardApi";

const DUMMY_DATA: MoneyFlowItem[] = [
  { month: "May", income: 5000, expense: 3500 },
  { month: "Jun", income: 4200, expense: 3000 },
  { month: "Jul", income: 6800, expense: 4700 },
  { month: "Aug", income: 6100, expense: 4200 },
  { month: "Sep", income: 7300, expense: 5000 },
  { month: "Oct", income: 7900, expense: 6100 },
];

const MoneyFlowAreaChart: React.FC = () => {
  const [data, setData] = useState<MoneyFlowItem[]>(DUMMY_DATA);

  useEffect(() => {
    const loadMoneyFlow = async () => {
      try {
        const res = await fetchMoneyFlow();
        console.log("Money Flow API response:", res);

        if (res?.data?.length) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formatted = res.data.map((item: any) => ({
            month: formatDate(item.month, { shortMonth: true }) ?? item.month,
            income: item.income ?? 0,
            expense: item.expense ?? 0,
          }));
          setData(formatted);
        } else {
          setData(DUMMY_DATA);
        }
      } catch (err) {
        console.error("Failed to fetch money flow:", err);
        setData(DUMMY_DATA);
      }
    };

    loadMoneyFlow();
  }, []);

  return (
    <div className="h-[320px] w-full p-5 rounded-[20px] bg-white hover:shadow-md shadow-sm">
      <p className="text-lg font-semibold mb-4">Money Flow</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#4F46E5"
            fill="#C7D2FE"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#EF4444"
            fill="#FCA5A5"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowAreaChart;
