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
      className="p-5 rounded-2xl bg-[#DBE7FB] text-white shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Top Row — Icon, Title, Client */}
      <div className="flex justify-between items-start pb-5">
        <div className="flex items-center gap-2">
          <CircleDot className="w-4 h-4 color-[#0665EC]" />
          <span className="font-semibold text-[#0665EC]">{deliverableName}</span>
        </div>
        <span className="text-sm text-[#182230] font-medium">{clientName}</span>
      </div>

      <div className='flex flex-row justify-between align-bottom'>
        <span className="text-[18px] font-small text-[#182230]">{milestoneName}</span>
        <span className="text-[18px] font-semibold text-[#0C111D]">{formatDate(dueDate)}</span>
      </div>

      {/* Date */}
      {/* <div className="flex flex-row mt-4 justify-between">
        <div className="">
          <p className=" flex justify-bottom text-[18px] font-small text-[#182230] mt-1">{milestoneName}</p>
        </div>
        <div className=""><span className="text-[18px] font-semibold text-[#0C111D]">{formatDate(dueDate)}</span></div>
      </div> */}
    </div>
  );
};

export default Reminder;
