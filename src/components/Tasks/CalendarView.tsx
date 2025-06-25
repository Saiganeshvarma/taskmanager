import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTask, Task } from '../../contexts/TaskContext';
import TaskCard from './TaskCard';
import { format, isSameDay } from 'date-fns';

const CalendarView: React.FC = () => {
  const { tasks } = useTask();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Find tasks created or due on the selected date
  const selectedDateStr = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const tasksForDate = tasks.filter(
    (task: Task) =>
      (task.createdAt && format(new Date(task.createdAt), 'yyyy-MM-dd') === selectedDateStr) ||
      (task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === selectedDateStr)
  );

  // Get all dates with tasks for calendar highlighting
  const taskDates = tasks.reduce<string[]>((acc, task) => {
    if (task.createdAt) acc.push(format(new Date(task.createdAt), 'yyyy-MM-dd'));
    if (task.dueDate) acc.push(format(new Date(task.dueDate), 'yyyy-MM-dd'));
    return acc;
  }, []);

  // Custom tile content for calendar
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateStr = format(date, 'yyyy-MM-dd');
      const hasTask = taskDates.includes(dateStr);
      return hasTask ? (
        <div className="flex justify-center mt-1">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse shadow-lg"></span>
        </div>
      ) : null;
    }
    return null;
  };

  // Custom tile class for selected and today
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isSelected = selectedDate && isSameDay(date, selectedDate);
      const isToday = isSameDay(date, new Date());
      if (isSelected) return 'react-calendar__tile--selected-awesome';
      if (isToday) return 'react-calendar__tile--today-awesome';
    }
    return '';
  };

  // Get current month/year for floating header
  const monthYear = selectedDate ? format(selectedDate, 'MMMM yyyy') : format(new Date(), 'MMMM yyyy');

  return (
    <div className="relative p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" className="opacity-10 dark:opacity-20">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#a78bfa" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative max-w-5xl mx-auto z-10">
        {/* Floating month/year header */}
        <div className="sticky top-0 z-20 flex justify-center mb-8">
          <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-full px-8 py-3 shadow-2xl border border-purple-200 dark:border-purple-700 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-lg animate-fade-in">
            {monthYear}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-auto flex flex-col items-center">
            <div className="glass-card shadow-2xl border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-4 transition-transform duration-300 hover:scale-105">
              <Calendar
                onChange={(date) => setSelectedDate(date as Date)}
                value={selectedDate}
                tileContent={tileContent}
                tileClassName={tileClassName}
                prev2Label={null}
                next2Label={null}
              />
            </div>
            <div className="flex items-center gap-2 mt-4 text-base font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-gray-800/70 px-4 py-2 rounded-full shadow border border-purple-200 dark:border-purple-700 animate-fade-in">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"></span>
              <span>Day with tasks</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="glass-card bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-blue-200 dark:border-gray-700 p-6 mb-4 animate-fade-in">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow">
                {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : 'No date selected'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {tasksForDate.length > 0
                  ? `You have ${tasksForDate.length} task${tasksForDate.length > 1 ? 's' : ''} for this day.`
                  : 'No tasks for this day.'}
              </p>
              {tasksForDate.length > 0 && (
                <div className="space-y-4">
                  {tasksForDate.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Custom styles for calendar tiles and glassmorphism */}
      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(18px) saturate(160%);
          border-radius: 1.5rem;
        }
        .dark .glass-card {
          background: rgba(31, 41, 55, 0.7);
        }
        .react-calendar__tile--selected-awesome {
          background: linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%) !important;
          color: #fff !important;
          border-radius: 1rem !important;
          box-shadow: 0 0 16px 4px #a78bfa99, 0 4px 16px 0 rgba(99,102,241,0.15);
          position: relative;
        }
        .react-calendar__tile--selected-awesome::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          box-shadow: 0 0 24px 8px #60a5fa55;
          pointer-events: none;
        }
        .react-calendar__tile--today-awesome {
          background: linear-gradient(90deg, #f472b6 0%, #a78bfa 100%) !important;
          color: #fff !important;
          border-radius: 1rem !important;
        }
        .react-calendar {
          border-radius: 1.5rem !important;
          border: none !important;
          box-shadow: 0 8px 32px 0 rgba(99,102,241,0.12);
        }
        .react-calendar__tile {
          font-weight: 500;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus {
          background: linear-gradient(90deg, #c7d2fe 0%, #f0abfc 100%) !important;
          color: #3730a3 !important;
          box-shadow: 0 2px 8px 0 #a78bfa33;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default CalendarView; 