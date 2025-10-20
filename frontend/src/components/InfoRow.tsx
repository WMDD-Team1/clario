const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between items-center border-b-2 p-4 border-gray-200">
    <p>{label}</p>
    <p>{value || '-'}</p>
  </div>
);

export default InfoRow;