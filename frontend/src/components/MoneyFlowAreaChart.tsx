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
          const formatted = res.data.map((item: any) => ({
            month: formatDate(item.month, { shortMonth: true }) ?? item.month,
            income: Number((item.income ?? 0).toFixed(2)),
            expense: Number((item.expense ?? 0).toFixed(2)),
          }));

          setData(formatted);
        } else {
          setData([]); // no dummy fallback
        }
      } catch (err) {
        console.error("Failed to fetch money flow:", err);
        setData([]); // no dummy fallback
      }
    };

    loadMoneyFlow();
  }, []);

  return (
    <div className="h-[320px] w-full p-5 rounded-[20px] bg-[var(--general-alpha)] hover:shadow-md shadow-sm">
      <p className="text-lg mb-4 text-[var(--primary-text)]">Money Flow</p>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#17B26A"
            fill="#C7D2FE"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#F04438"
            fill="#FCA5A5"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoneyFlowAreaChart;
