import React from "react";

const InfoRow = ({
  label,
  value,
  vertical = false,
  hideBorder = false,
  children
}: {
  label: string;
  value?: string;
  vertical?: boolean;
  hideBorder?: boolean;
  children?:React.ReactNode
}) => (
  <div
    className={`${vertical ? 'flex flex-col items-start gap-[1rem]' : 'flex justify-between items-center'} ${hideBorder ? '' : 'border-b-2'} py-3 border-[var(--primitive-colors-gray-light-mode-200)]`}
  >
    <p className="text-[var(--primitive-colors-gray-light-mode-400)]">{label}</p>
    <p>{value}</p>
    {children}
  </div>
);

export default InfoRow;
