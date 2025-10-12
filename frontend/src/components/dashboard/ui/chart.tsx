import React from 'react';

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

export function ChartContainer({ config, className = "", children }: ChartContainerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface ChartTooltipProps {
  content?: React.ComponentType<any>;
  children?: React.ReactNode;
}

export function ChartTooltip({ content: Content, children }: ChartTooltipProps) {
  return (
    <div>
      {children}
      {Content && <Content />}
    </div>
  );
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-lg">
        <p className="font-mono text-sm">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono text-sm" style={{ color: entry.color }}>
            {`${entry.dataKey}: $${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}
