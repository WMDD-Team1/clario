import React, { useEffect, useState } from 'react';
import Reminder from '@components/Reminder';
import { ReminderResponse } from '@api/types/dashboardApi';
import { fetchReminders } from '@api/services/dashboardService';

export const RemindersList: React.FC = () => {
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        setLoading(true);
        const res = await fetchReminders({ page: 1, limit: 10, days: 60 });
        setReminders(res.data);
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
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-700">Reminders</h3>
      {reminders?.map((reminder, idx) => (
        <Reminder data={reminder} key={idx} />
      ))}
    </div>
  );
};
