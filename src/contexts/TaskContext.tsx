import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'personal' | 'learning' | 'health';
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  tags: string[];
}

export interface DailyUpdate {
  id: string;
  date: string;
  taskId?: string;
  content: string;
  mood: 'great' | 'good' | 'okay' | 'challenging';
  learnings: string;
  tomorrow: string;
}

interface TaskContextType {
  tasks: Task[];
  dailyUpdates: DailyUpdate[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addDailyUpdate: (update: Omit<DailyUpdate, 'id'>) => void;
  getTodayUpdate: () => DailyUpdate | undefined;
  getTasksByStatus: (status: Task['status']) => Task[];
  getWeeklyStats: () => any;
  deleteDailyUpdate: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyUpdates, setDailyUpdates] = useState<DailyUpdate[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!initialized) {
      const storedTasks = localStorage.getItem('tasks');
      const storedUpdates = localStorage.getItem('dailyUpdates');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
        console.log('Loaded tasks from localStorage');
      }
      if (storedUpdates) {
        setDailyUpdates(JSON.parse(storedUpdates));
        console.log('Loaded daily updates from localStorage');
      }
      setInitialized(true);
    }
  }, [initialized]);

  // Save to localStorage whenever tasks or dailyUpdates change (after init)
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Saved tasks to localStorage');
    }
  }, [tasks, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('dailyUpdates', JSON.stringify(dailyUpdates));
      console.log('Saved daily updates to localStorage');
    }
  }, [dailyUpdates, initialized]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            ...updates,
            ...(updates.status === 'done' && !task.completedAt ? { completedAt: new Date().toISOString() } : {})
          }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addDailyUpdate = (updateData: Omit<DailyUpdate, 'id'>) => {
    const newUpdate: DailyUpdate = {
      ...updateData,
      id: Date.now().toString()
    };
    setDailyUpdates(prev => [...prev, newUpdate]);
  };

  const getTodayUpdate = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyUpdates.find(update => update.date === today);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getWeeklyStats = () => {
    const completedTasks = tasks.filter(task => task.status === 'done');
    const thisWeekCompleted = completedTasks.filter(task => {
      const taskDate = new Date(task.completedAt || task.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return taskDate >= weekAgo;
    });

    return {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      thisWeekCompleted: thisWeekCompleted.length,
      completionRate: tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0
    };
  };

  const deleteDailyUpdate = (id: string) => {
    setDailyUpdates(prev => prev.filter(update => update.id !== id));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      dailyUpdates,
      addTask,
      updateTask,
      deleteTask,
      addDailyUpdate,
      getTodayUpdate,
      getTasksByStatus,
      getWeeklyStats,
      deleteDailyUpdate
    }}>
      {children}
    </TaskContext.Provider>
  );
};