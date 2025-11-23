import React from 'react';

const InfoRow = ({
  label,
  value,
  vertical = false,
  hideBorder = false,
  children,
}: {
  label: string;
  value?: string;
  vertical?: boolean;
  hideBorder?: boolean;
  children?: React.ReactNode;
}) => (
  <div
    className={`${vertical ? 'flex flex-col items-start gap-[1rem]' : 'flex justify-between items-center'} ${hideBorder ? '' : 'border-b-2'} py-3 border-[var(--background-alternate)]`}
  >
    <p className="text-[var(--sub-text)]">{label}</p>
    <p className="text-[var(--secondary-text)]">{value}</p>
    {children}
  </div>
);

export default InfoRow;
