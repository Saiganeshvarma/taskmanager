import React, { useState } from 'react';
import { Calendar, Tag, Clock, MoreHorizontal, Trash2, Edit2, CheckCircle } from 'lucide-react';
import { Task } from '../../contexts/TaskContext';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  isCompact?: boolean;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: string, status: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isCompact = false, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200'
  };

  const categoryColors = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    learning: 'bg-green-100 text-green-800',
    health: 'bg-orange-100 text-orange-800'
  };

  const statusColors = {
    'todo': 'border-l-gray-400',
    'in-progress': 'border-l-blue-500',
    'done': 'border-l-green-500'
  };

  const statusIcons = {
    'todo': null,
    'in-progress': <Clock className="h-4 w-4 text-blue-500" />,
    'done': <CheckCircle className="h-4 w-4 text-green-500" />
  };

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-sm border-l-4 transition-all duration-200
        ${statusColors[task.status]}
        ${isHovered ? 'shadow-lg scale-[1.02]' : ''}
        p-5 font-sans relative group/card
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {statusIcons[task.status]}
                <h3 className="font-bold text-gray-900 text-lg truncate">{task.title}</h3>
              </div>
              {!isCompact && (
                <p className="text-gray-600 text-sm mt-1 line-clamp-2 group-hover/card:line-clamp-none transition-all duration-200">
                  {task.description}
                </p>
              )}
            </div>
            <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]} shadow-sm`}>
              {task.priority}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]} shadow-sm`}>
              {task.category}
            </span>
            {task.dueDate && (
              <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
                <Calendar className="h-3.5 w-3.5" />
                <span className="text-xs">{format(new Date(task.dueDate), 'MMM dd')}</span>
              </div>
            )}
            <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">{format(new Date(task.createdAt), 'MMM dd')}</span>
            </div>
          </div>

          {!isCompact && task.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Tag className="h-3.5 w-3.5 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {task.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {!isCompact && (
          <div className="flex items-center gap-1">
            {onStatusChange && (
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            )}
            <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
              {onEdit && (
                <button
                  className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  onClick={() => onEdit(task)}
                  title="Edit Task"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              )}
              {onDelete && (
                <button
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => onDelete(task.id)}
                  title="Delete Task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <button 
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                title="More Options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;