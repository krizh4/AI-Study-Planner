import { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import useUser from "@/utils/useUser";
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  BookOpen,
  Award,
  Activity,
  CheckCircle2,
  PlayCircle,
  FileText,
  HelpCircle
} from "lucide-react";

function ProgressChart({ data }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="h-48 flex items-end justify-between gap-2 p-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-[#30C4B5] rounded-t-sm transition-all duration-300 hover:bg-[#29AF9F]"
            style={{
              height: `${Math.max((item.value / maxValue) * 120, 4)}px`,
              minHeight: '4px'
            }}
          />
          <span className="text-xs font-inter text-[#6B7280] dark:text-[#9CA3AF] mt-2 text-center">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ActivityItem({ activity }) {
  const getIcon = (type) => {
    switch (type) {
      case 'completed_resource':
        return <CheckCircle2 size={16} className="text-[#10B981]" />;
      case 'started_plan':
        return <BookOpen size={16} className="text-[#30C4B5]" />;
      case 'completed_quiz':
        return <Trophy size={16} className="text-[#F59E0B]" />;
      default:
        return <Activity size={16} className="text-[#6B7280]" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'completed_resource':
        return 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20';
      case 'started_plan':
        return 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20';
      case 'completed_quiz':
        return 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20';
      default:
        return 'bg-gray-50 dark:bg-gray-900 dark:bg-opacity-20';
    }
  };

  return (
    <div className={`flex items-center p-4 rounded-lg ${getBgColor(activity.type)}`}>
      <div className="w-8 h-8 rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center mr-3">
        {getIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB]">
          {activity.description}
        </p>
        <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
          {activity.timestamp}
        </p>
      </div>
    </div>
  );
}

export default function ProgressTrackerPage() {
  const { data: user, loading: userLoading } = useUser();
  const [stats, setStats] = useState({
    totalStudyPlans: 0,
    completedResources: 0,
    totalStudyTime: 0,
    currentStreak: 0,
    weeklyProgress: [],
    monthlyStats: {
      resourcesCompleted: 0,
      hoursStudied: 0,
      plansStarted: 0,
      quizzesCompleted: 0
    },
    achievements: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    if (user) {
      fetchProgressData();
    }
  }, [user, timeRange]);

  const fetchProgressData = async () => {
    try {
      // Mock data - in a real app, this would come from your API
      const mockData = {
        totalStudyPlans: 12,
        completedResources: 89,
        totalStudyTime: 156,
        currentStreak: 7,
        weeklyProgress: [
          { label: 'Mon', value: 2 },
          { label: 'Tue', value: 4 },
          { label: 'Wed', value: 1 },
          { label: 'Thu', value: 6 },
          { label: 'Fri', value: 3 },
          { label: 'Sat', value: 5 },
          { label: 'Sun', value: 2 },
        ],
        monthlyStats: {
          resourcesCompleted: 34,
          hoursStudied: 42,
          plansStarted: 3,
          quizzesCompleted: 15
        },
        achievements: [
          { id: 1, title: 'First Steps', description: 'Completed your first study plan', earned: true, icon: 'trophy' },
          { id: 2, title: 'Dedicated Learner', description: 'Studied for 7 days in a row', earned: true, icon: 'calendar' },
          { id: 3, title: 'Quiz Master', description: 'Completed 10 quizzes', earned: true, icon: 'target' },
          { id: 4, title: 'Knowledge Seeker', description: 'Complete 100 resources', earned: false, icon: 'book', progress: 89 },
        ],
        recentActivity: [
          {
            type: 'completed_resource',
            description: 'Completed "React Components" video',
            timestamp: '2 hours ago'
          },
          {
            type: 'completed_quiz',
            description: 'Scored 95% on JavaScript Basics quiz',
            timestamp: '5 hours ago'
          },
          {
            type: 'started_plan',
            description: 'Started "Advanced Python" study plan',
            timestamp: 'Yesterday'
          },
          {
            type: 'completed_resource',
            description: 'Read "Machine Learning Fundamentals" article',
            timestamp: 'Yesterday'
          },
        ]
      };

      setStats(mockData);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212]">
        <LeftSidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-3 border-[#30C4B5] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212]">
        <LeftSidebar />
        <div className="flex-1 md:ml-64">
          <Header />
          <main className="p-6">
            <div className="text-center">
              <p className="text-[#6B7280] dark:text-[#9CA3AF]">
                Please <a href="/account/signin" className="text-[#30C4B5] hover:underline">sign in</a> to view your progress.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      <LeftSidebar />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="p-4 md:p-6 space-y-6">
          {/* Page Header */}
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-2">
                  Progress Tracker
                </h1>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Track your learning journey and achievements
                </p>
              </div>
              
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200 mt-4 md:mt-0"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-[#30C4B5]" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                {stats.totalStudyPlans}
              </h3>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Study Plans Created</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Trophy size={24} className="text-[#10B981]" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                {stats.completedResources}
              </h3>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Resources Completed</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Clock size={24} className="text-[#8B5CF6]" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                {stats.totalStudyTime}h
              </h3>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Total Study Time</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Calendar size={24} className="text-[#EF4444]" />
                </div>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <h3 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                {stats.currentStreak}
              </h3>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Day Streak</p>
            </div>
          </div>

          {/* Charts and Activity */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Progress Chart */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <h2 className="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-4">
                Weekly Activity
              </h2>
              <ProgressChart data={stats.weeklyProgress} />
              <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] text-center mt-2">
                Resources completed per day this week
              </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <h2 className="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-4">
                Recent Activity
              </h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {stats.recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="max-w-6xl mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
            <h2 className="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-6">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 dark:from-opacity-20 dark:to-opacity-20 border-yellow-200 dark:border-yellow-800'
                      : 'bg-gray-50 dark:bg-gray-900 dark:bg-opacity-20 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-yellow-100 dark:bg-yellow-800'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {achievement.earned ? (
                        <Award size={20} className="text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <Target size={20} className="text-gray-500" />
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircle2 size={16} className="text-green-500" />
                    )}
                  </div>
                  <h3 className="font-inter font-semibold text-sm text-[#111827] dark:text-[#F9FAFB] mb-1">
                    {achievement.title}
                  </h3>
                  <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mb-2">
                    {achievement.description}
                  </p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                          Progress
                        </span>
                        <span className="font-inter text-xs text-[#30C4B5]">
                          {achievement.progress}/100
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#30C4B5] rounded-full transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Overview */}
          <div className="max-w-6xl mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
            <h2 className="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-6">
              This Month's Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={24} className="text-[#30C4B5]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                  {stats.monthlyStats.resourcesCompleted}
                </h3>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Resources</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock size={24} className="text-[#8B5CF6]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                  {stats.monthlyStats.hoursStudied}
                </h3>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Hours</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen size={24} className="text-[#10B981]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                  {stats.monthlyStats.plansStarted}
                </h3>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Plans</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HelpCircle size={24} className="text-[#F59E0B]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                  {stats.monthlyStats.quizzesCompleted}
                </h3>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Quizzes</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}