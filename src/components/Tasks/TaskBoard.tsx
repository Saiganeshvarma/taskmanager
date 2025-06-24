import React, { useState } from 'react';
import { Plus, GripVertical, Search } from 'lucide-react';
import { useTask, Task } from '../../contexts/TaskContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const TaskBoard: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'from-pink-500/20 to-red-500/20' },
    { id: 'in-progress', title: 'In Progress', color: 'from-blue-500/20 to-cyan-500/20' },
    { id: 'done', title: 'Done', color: 'from-green-500/20 to-emerald-500/20' }
  ];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const tasksByStatus: Record<string, Task[]> = {
    'todo': [],
    'in-progress': [],
    'done': []
  };
  filteredTasks.forEach(task => {
    tasksByStatus[task.status].push(task);
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceStatus = source.droppableId as Task['status'];
    const destStatus = destination.droppableId as Task['status'];
    const movedTask = tasksByStatus[sourceStatus][source.index];

    if (sourceStatus !== destStatus) {
      updateTask(movedTask.id, { status: destStatus });
    }
  };

  const handleClearAllTasks = () => {
    tasks.forEach(task => deleteTask(task.id));
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Task Board
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and organize your tasks efficiently
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              Add Task
            </button>
            <button
              onClick={handleClearAllTasks}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              Clear All Tasks
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {columns.map(column => (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-gradient-to-br ${column.color} backdrop-blur-xl rounded-2xl p-6 min-h-[calc(100vh-12rem)] shadow-lg border border-white/30 transition-all duration-200 ${
                      snapshot.isDraggingOver ? 'ring-2 ring-purple-400 scale-[1.02]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 text-xl">{column.title}</h3>
                      <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-600 shadow-sm">
                        {tasksByStatus[column.id].length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      {tasksByStatus[column.id].map((task, idx) => (
                        <Draggable draggableId={String(task.id)} index={idx} key={task.id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`w-full transition-all duration-200 ${
                                snapshot.isDragging ? 'opacity-75 scale-105' : ''
                              }`}
                            >
                              <div className="flex items-center group w-full">
                                <span
                                  {...provided.dragHandleProps}
                                  className="cursor-grab mr-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Drag to move"
                                >
                                  <GripVertical className="h-5 w-5" />
                                </span>
                                <div className="flex-1">
                                  <TaskCard
                                    task={task}
                                    onStatusChange={(id, status) => updateTask(id, { status })}
                                    onDelete={deleteTask}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {tasksByStatus[column.id].length === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-500 text-sm">No tasks in {column.title.toLowerCase()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {showTaskForm && (
          <TaskForm
            onClose={() => setShowTaskForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskBoard;