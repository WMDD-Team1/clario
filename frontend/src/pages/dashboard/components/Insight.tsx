import { fetchInsights } from '@api/services/dashboardService';
import { InsightItem } from '@api/types/dashboardApi';
import InsightCard from '@components/dashboard/InsightCard';
import { useEffect, useState } from 'react';

const Insight = () => {
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [loading, setLoading] = useState(true);

  const dummyData: InsightItem[] = [
    {
      title: 'Earning Trend',
      month: 'This Month',
      text: "Your income grew 18% compared to last month mostly from Project A. You're trending toward a more stable cashflow.",
    },
    {
      title: 'Client Dependency',
      month: 'This Month',
      text: '75% of your total income came from a single client this month — consider diversifying your portfolio.',
    },
    {
      title: 'Income Projection',
      month: 'Next Month',
      text: 'You have $2,800 in confirmed recurring income for the next 30 days.',
    },
    {
      title: 'Payment Timeliness',
      month: 'Next Month',
      text: 'Client B usually pays 8 days late — consider updating your contract terms.',
    },
  ];

  useEffect(() => {
    const loadInsights = async () => {
      setLoading(true);
      const res = await fetchInsights();
      setInsights(res.data && res.data.length > 0 ? res.data : dummyData);
      setLoading(false);
    };
    loadInsights();
  }, []);

  if (loading) return <p>Loading insights...</p>;

  return (
    <div className="flex flex-col gap-4 w-full h-full max-w-full">
      <p className="hidden md:block text-2xl font-medium text-[var(--primary-text)] border-[var(--sub-text)]">Insights of Your Work</p>

      {insights?.map((insight, idx) => (
        <InsightCard key={idx} title={insight.title} text={insight.text} month={insight.month} />
      ))}
      {/*  <Card key={idx} style="card1" insight={insight}>
           
        </Card> */}
    </div>
  );
};

export default Insight;