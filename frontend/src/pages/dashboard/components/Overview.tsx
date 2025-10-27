import InsightCard from '@components/InsightCard';
import React from 'react';

const Overview = () => {
  return (
    <>
      <div className="w-full flex flex-wrap justify-between gap-4 pb-2 overflow-hidden">
        {[
          { label: 'Income', value: '$12,000' },
          { label: 'Expense', value: '$8,000' },
          { label: 'Taxes', value: '10' },
          { label: 'Recurring Income', value: '5' },
          { label: 'Peding', value: '30' },
        ].map(({ label, value }, idx) => (
          <InsightCard
            key={idx}
            title={label}
            value={value}
            className="flex-1 min-w-[180px] max-w-[220px] flex flex-col justify-center items-center 
                      py-4 rounded-2xl shadow-sm border border-gray-100 bg-white transition-all duration-200"
          />
        ))}
      </div>
    </>
  );
};

export default Overview;
