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

const MoneyFlowAreaChart: React.FC = () => {
  const [data, setData] = useState<MoneyFlowItem[]>([]);

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
          setData([]); 
        }
      } catch (err) {
        console.error("Failed to fetch money flow:", err);
        setData([]); 
      }
    };

    loadMoneyFlow();
  }, []);

  return (
    <div className="h-[320px] w-full p-5 rounded-[20px] bg-[var(--general-alpha)] hover:shadow-md shadow-sm">
      <p className="text-[1.125rem] mb-4 text-[var(--primary-text)]">Money Flow</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart 
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }} 
        >
          <XAxis dataKey="month" />
          <YAxis width={40} /> 
          <Tooltip />
          
          <Area
            type="monotone"
            dataKey="income"
            // Wrapped in var()
            stroke="var(--primitive-colors-success-500)"
            fill="var(--primitive-colors-success-100)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="expense"
            // Wrapped in var()
            stroke="var(--primitive-colors-error-500)"
            fill="var(--primitive-colors-error-100)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowAreaChart;