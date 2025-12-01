import { ReminderResponse } from '@api/types/dashboardApi';
import { formatDate } from '@utils/formatDate';
import { FaDotCircle } from "react-icons/fa";
import React from 'react';
import { useNavigate } from "react-router-dom";

const Reminder: React.FC<{ data: ReminderResponse }> = ({ data }) => {
  const navigate = useNavigate(); 

  const {
    projectId,
    milestoneId,
    deliverableId,
    deliverableName,
    milestoneName,
    clientName,
    dueDate,
  } = data;

  const truncateTitle = (title: string) => {
    const words = title.trim().split(/\s+/); 
    return words.length > 3 ? `${words[0]} ${words[1]} ...` : title;
  };

  return (
    <div
      onClick={() => navigate(`/projects/${projectId}`)}
      className="cursor-pointer flex flex-col justify-between gap-4 p-5 rounded-2xl bg-[var(--background-alternate)] text-[var(--general-alpha)] border border-[var(--sublight-2)] transition-all duration-300 mb-5 md:mb-0"
    >
      {/* Top Row — Icon, Title, Client */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 padding-2">
          <FaDotCircle className="!text-[var(--primitive-colors-brand-primary-500-base)]" />
          <span className="text-[1rem] font-semibold !text-[var(--primitive-colors-brand-primary-500-base)]">{truncateTitle(deliverableName)}</span>
        </div>
        <span className="text-[1rem] text-[var(--secondary-text)] font-medium">{clientName}</span>
      </div>

      {/* Date */}
      <div className='flex flex-row justify-between align-bottom'>
        <span className="text-[1.125rem] font-regular text-[var(--secondary-text)]">{milestoneName}</span>
        <span className="text-[1.125rem] font-semibold text-[var(--primary-text)]">{formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default Reminder;