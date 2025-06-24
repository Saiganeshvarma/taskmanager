import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  PenTool, 
  BarChart3, 
  Trophy, 
  Settings,
  Calendar,
  Tag,
  CalendarOff
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'updates', label: 'Daily Updates', icon: PenTool },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tags', label: 'Tags', icon: Tag },
  ];

  return (
    <div className="w-64 bg-white/80 backdrop-blur-lg border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Today's Focus</h3>
          <p className="text-xs text-gray-600 mb-3">Stay productive and achieve your goals!</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">67% of daily goals completed</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;