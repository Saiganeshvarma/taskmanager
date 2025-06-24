import React, { useState } from 'react';
import { Plus, Calendar, Smile, BookOpen, ArrowRight, Trash2 } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';
import { format } from 'date-fns';

const DailyUpdates: React.FC = () => {
  const { dailyUpdates, addDailyUpdate, getTodayUpdate, deleteDailyUpdate } = useTask();
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateData, setUpdateData] = useState({
    content: '',
    mood: 'good' as 'great' | 'good' | 'okay' | 'challenging',
    learnings: '',
    tomorrow: ''
  });

  const todayUpdate = getTodayUpdate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDailyUpdate({
      ...updateData,
      date: new Date().toISOString().split('T')[0]
    });
    setUpdateData({
      content: '',
      mood: 'good',
      learnings: '',
      tomorrow: ''
    });
    setShowUpdateForm(false);
  };

  const moodEmojis = {
    great: '😊',
    good: '🙂',
    okay: '😐',
    challenging: '😟'
  };

  const moodColors = {
    great: 'text-green-600 bg-green-50',
    good: 'text-blue-600 bg-blue-50',
    okay: 'text-yellow-600 bg-yellow-50',
    challenging: 'text-red-600 bg-red-50'
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Updates</h1>
          <p className="text-gray-600">Reflect on your progress and plan for tomorrow</p>
        </div>
        {!todayUpdate && (
          <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Today's Update
          </button>
        )}
      </div>

      {todayUpdate ? (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200 relative group">
          <button
            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors absolute top-4 right-4 opacity-0 group-hover:opacity-100"
            onClick={() => deleteDailyUpdate(todayUpdate.id)}
            title="Delete Today's Update"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-full ${moodColors[todayUpdate.mood]}`}>
              <span className="text-xl">{moodEmojis[todayUpdate.mood]}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Today's Update</h3>
              <p className="text-sm text-gray-600">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Progress & Achievements</h4>
              <p className="text-gray-700">{todayUpdate.content}</p>
            </div>
            
            {todayUpdate.learnings && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  What I Learned
                </h4>
                <p className="text-gray-700">{todayUpdate.learnings}</p>
              </div>
            )}
            
            {todayUpdate.tomorrow && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Tomorrow's Focus
                </h4>
                <p className="text-gray-700">{todayUpdate.tomorrow}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 text-center mb-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No update for today</h3>
          <p className="text-gray-600 mb-4">Take a moment to reflect on your progress and learnings.</p>
          <button
            onClick={() => setShowUpdateForm(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Write Today's Update
          </button>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Previous Updates</h2>
        {dailyUpdates
          .filter(update => update.date !== new Date().toISOString().split('T')[0])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map(update => (
            <div key={update.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 relative group">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-full ${moodColors[update.mood]}`}>
                  <span className="text-xl">{moodEmojis[update.mood]}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{format(new Date(update.date), 'EEEE, MMMM do, yyyy')}</p>
                  <p className="text-sm text-gray-600 capitalize">{update.mood} day</p>
                </div>
                <button
                  className="ml-auto p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                  onClick={() => deleteDailyUpdate(update.id)}
                  title="Delete Update"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">{update.content}</p>
                {update.learnings && (
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p className="text-sm font-medium text-gray-900">Learning:</p>
                    <p className="text-sm text-gray-600">{update.learnings}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        
        {dailyUpdates.length <= 1 && (
          <div className="text-center py-8 text-gray-500">
            <p>No previous updates yet. Keep updating daily to track your progress!</p>
          </div>
        )}
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Daily Update</h2>
              <p className="text-gray-600">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How was your day?</label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(moodEmojis).map(([mood, emoji]) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setUpdateData(prev => ({ ...prev, mood: mood as any }))}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        updateData.mood === mood
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{emoji}</div>
                      <div className="text-sm font-medium capitalize">{mood}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did you accomplish today?
                </label>
                <textarea
                  value={updateData.content}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  placeholder="Share your progress, achievements, and challenges..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What did you learn today?
                </label>
                <textarea
                  value={updateData.learnings}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, learnings: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="New insights, skills, or knowledge gained..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your focus for tomorrow?
                </label>
                <textarea
                  value={updateData.tomorrow}
                  onChange={(e) => setUpdateData(prev => ({ ...prev, tomorrow: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                  placeholder="Plans, goals, and priorities for tomorrow..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Save Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyUpdates;