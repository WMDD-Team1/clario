import React, { useEffect, useState } from 'react';
import Reminder from '@components/Reminder';
import { ReminderResponse } from '@api/types/dashboardApi';
import { fetchReminders } from '@api/services/dashboardService';

export const RemindersList: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const DUMMY_DATA: ReminderResponse[] = [
    {
      projectId: '68f905a85b172898eadea040',
      milestoneId: '68f905e15b172898eadea049',
      deliverableId: '68f905e15b172898eadea111',
      deliverableName: 'Final UI Mockups',
      milestoneName: 'Design Phase',
      clientName: 'Me The Best',
      dueDate: '2025-11-05T00:00:00.000Z',
    },
    {
      projectId: '68f905a85b172898eadea041',
      milestoneId: '68f905e15b172898eadea050',
      deliverableId: '68f905e15b172898eadea112',
      deliverableName: 'API Integration',
      milestoneName: 'Development',
      clientName: 'Freelancer Hub',
      dueDate: '2025-11-10T00:00:00.000Z',
    },
    {
      projectId: '68f905a85b172898eadea042',
      milestoneId: '68f905e15b172898eadea051',
      deliverableId: '68f905e15b172898eadea113',
      deliverableName: 'Tax Summary Report',
      milestoneName: 'Finance Review',
      clientName: 'Studio North',
      dueDate: '2025-11-15T00:00:00.000Z',
    },
  ];
  useEffect(() => {
    const loadReminders = async () => {
      try {
        setLoading(true);
        const res = await fetchReminders({ page: 1, limit: 10, days: 60 });
        const isEmpty = !res?.data?.length || res?.meta?.total === 0;
        setReminders(isEmpty ? DUMMY_DATA : res.data);
      } catch (err) {
        console.error('Failed to fetch reminders:', err);
        setError('Failed to load reminders');
      } finally {
        setLoading(false);
      }
    };

    loadReminders();
  }, []);
  return (

    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 sm:gap-4 xl:grid-cols-1 pb-4">
      {reminders?.map((reminder, idx) => (
        <Reminder data={reminder} key={idx} />
      ))}
    </div>
  );
};
