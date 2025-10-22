const InfoRow = ({ label, value, vertical= false}: { label: string; value?: string, vertical? : boolean}) => (
  <div className={`${vertical ? "flex flex-col items-start gap-[1rem]":"flex justify-between items-center"} border-b-2 py-4 border-gray-200`}>
    <p>{label}</p>
    <p>{value || '-'}</p>
  </div>
);

export default InfoRow;
