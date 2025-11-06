const InfoRow = ({
  label,
  value,
  vertical = false,
  hideBorder = false,
}: {
  label: string;
  value?: string;
  vertical?: boolean;
  hideBorder?: boolean;
}) => (
  <div
    className={`${vertical ? 'flex flex-col items-start gap-[1rem]' : 'flex justify-between items-center'} ${hideBorder ? '' : 'border-b-2'} py-3 border-gray-200`}
  >
    <p className="text-gray-400">{label}</p>
    <p>{value || '-'}</p>
  </div>
);

export default InfoRow;
