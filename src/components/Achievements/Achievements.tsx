import React from 'react';
import { Trophy, Target, Calendar, Zap, Star, Award } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';

const Achievements: React.FC = () => {
  const { tasks, dailyUpdates } = useTask();
  
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const updateStreak = dailyUpdates.length;

  const achievements = [
    {
      id: 'first-task',
      title: 'Getting Started',
      description: 'Complete your first task',
      icon: Target,
      unlocked: completedTasks >= 1,
      progress: Math.min(completedTasks, 1),
      max: 1,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'task-master',
      title: 'Task Master',
      description: 'Complete 10 tasks',
      icon: Trophy,
      unlocked: completedTasks >= 10,
      progress: Math.min(completedTasks, 10),
      max: 10,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'productivity-beast',
      title: 'Productivity Beast',
      description: 'Complete 50 tasks',
      icon: Zap,
      unlocked: completedTasks >= 50,
      progress: Math.min(completedTasks, 50),
      max: 50,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'daily-warrior',
      title: 'Daily Warrior',
      description: 'Write 7 daily updates',
      icon: Calendar,
      unlocked: updateStreak >= 7,
      progress: Math.min(updateStreak, 7),
      max: 7,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'consistency-king',
      title: 'Consistency King',
      description: 'Write 30 daily updates',
      icon: Star,
      unlocked: updateStreak >= 30,
      progress: Math.min(updateStreak, 30),
      max: 30,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionist',
      description: 'Achieve 100% task completion rate',
      icon: Award,
      unlocked: totalTasks > 0 && completedTasks === totalTasks,
      progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      max: 100,
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your progress and celebrate your accomplishments</p>
      </div>

      {/* Achievement Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</h3>
            <p className="text-gray-600">Achievements Unlocked</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{completedTasks}</h3>
            <p className="text-gray-600">Tasks Completed</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{updateStreak}</h3>
            <p className="text-gray-600">Daily Updates</p>
          </div>
        </div>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Unlocked Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unlockedAchievements.map(achievement => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${achievement.color}`}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {achievement.progress}/{achievement.max}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Trophy className="h-3 w-3 mr-1" />
                      Unlocked!
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Locked Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lockedAchievements.map(achievement => {
              const Icon = achievement.icon;
              const progressPercentage = (achievement.progress / achievement.max) * 100;
              
              return (
                <div
                  key={achievement.id}
                  className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 opacity-75 hover:opacity-90 transition-opacity duration-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gray-300">
                      <Icon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">{achievement.title}</h3>
                      <p className="text-sm text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gray-400"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {achievement.progress}/{achievement.max}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {Math.round(progressPercentage)}% Complete
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Motivational Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Keep Going!</h3>
          <p className="text-gray-600 mb-4">
            You're making great progress. Every task completed and every update written brings you closer to your goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</p>
              <p className="text-sm text-gray-600">Achievements Unlocked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{achievements.length - unlockedAchievements.length}</p>
              <p className="text-sm text-gray-600">More to Unlock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;