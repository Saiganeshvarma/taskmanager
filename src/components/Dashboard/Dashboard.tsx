import React from 'react';
import { CheckSquare, Clock, Target, TrendingUp } from 'lucide-react';
import StatsCard from './StatsCard';
import { useTask } from '../../contexts/TaskContext';
import TaskCard from '../Tasks/TaskCard';

const Dashboard: React.FC = () => {
  const { tasks, getWeeklyStats } = useTask();
  const stats = getWeeklyStats();
  
  const recentTasks = tasks
    .filter(task => task.status !== 'done')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const upcomingTasks = tasks
    .filter(task => task.dueDate && task.status !== 'done')
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your productivity overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.totalTasks}
          change={12}
          icon={CheckSquare}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Completed"
          value={stats.completedTasks}
          change={8}
          icon={Target}
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatsCard
          title="This Week"
          value={stats.thisWeekCompleted}
          change={15}
          icon={TrendingUp}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          change={5}
          icon={Clock}
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <TaskCard key={task.id} task={task} isCompact />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent tasks</p>
            )}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <TaskCard key={task.id} task={task} isCompact />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">Peak Performance</h4>
            <p className="text-sm text-gray-600 mt-1">You're most productive in the morning</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">Goal Achievement</h4>
            <p className="text-sm text-gray-600 mt-1">On track to exceed monthly goals</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-gray-900">Time Management</h4>
            <p className="text-sm text-gray-600 mt-1">Average task completion: 2.5 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;