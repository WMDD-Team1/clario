import { ReminderResponse } from '@api/types/dashboardApi';
import { formatDate } from '@utils/formatDate';
import { CircleDot } from 'lucide-react';
import React from 'react';

const Reminder: React.FC<{ data: ReminderResponse }> = ({ data }) => {
  const {
    projectId,
    milestoneId,
    deliverableId,
    deliverableName,
    milestoneName,
    clientName,
    dueDate,
  } = data;

  
  return (
    <div
      key={deliverableId}
      className="p-5 rounded-2xl bg-[#12263A] text-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Top Row — Icon, Title, Client */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <CircleDot className="w-4 h-4 text-white/90" />
          <span className="font-semibold text-white">{deliverableName}</span>
        </div>
        <span className="text-sm text-white/70 font-medium">{clientName}</span>
      </div>

      <p className="text-sm text-white/80 mt-1">{milestoneName}</p>

      {/* Date */}
      <div className="flex justify-end mt-2">
        <span className="text-sm font-semibold text-white">{formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default Reminder;
