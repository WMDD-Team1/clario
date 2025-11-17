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


  return (
    <div
      key={deliverableId}
      className="flex flex-col justify-between gap-4 p-5 rounded-2xl bg-[var(--background-alternate)] text-[var(--general-alpha)] shadow-md hover:shadow-lg transition-all duration-300 mb-5 md:mb-0 cursor-pointer"
      onClick={() => navigate(`/projects/${deliverableId}`)}
    >
      {/* Top Row — Icon, Title, Client */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 padding-2">
          <FaDotCircle className="!text-[var(--brand-alpha)]" />
          <span className="text-lg font-semibold !text-[var(--brand-alpha)]">{deliverableName}</span>
        </div>
        <span className="text-base text-[var(--secondary-text)] font-medium">{clientName}</span>
      </div>



      {/* Date */}
      <div className='flex flex-row justify-between align-bottom'>
        <span className="text-lg font-small text-[var(--secondary-text)]">{milestoneName}</span>
        <span className="text-lg font-semibold text-[var(--primary-text)]">{formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default Reminder;
