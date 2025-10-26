import React from "react";
import { CircleDot } from "lucide-react";

interface Reminder {
  title: string;
  client: string;
  dueDate: string;
  description?: string;
}

export const RemindersList: React.FC<{ reminders: Reminder[] }> = ({ reminders }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-gray-700">Reminders</h3>

      {reminders.map((reminder, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-[#12263A] text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          {/* Top Row — Icon, Title, Client */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <CircleDot className="w-4 h-4 text-white/90" />
              <span className="font-semibold text-white">
                {reminder.title}
              </span>
            </div>
            <span className="text-sm text-white/70 font-medium">
              {reminder.client}
            </span>
          </div>

          {/* Description (conditionally shown) */}
          {reminder.description && (
            <p className="text-sm text-white/80 mt-1">{reminder.description}</p>
          )}

          {/* Date */}
          <div className="flex justify-end mt-2">
            <span className="text-sm font-semibold text-white">
              {reminder.dueDate}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
