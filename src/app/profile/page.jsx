import { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import useUser from "@/utils/useUser";
import { User, Mail, Calendar, Trophy, Clock, BookOpen, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
  const { data: user, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    bio: '',
    learningGoals: ''
  });
  const [stats, setStats] = useState({
    totalStudyPlans: 0,
    completedResources: 0,
    totalStudyTime: 0,
    streak: 0
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || user.email?.split('@')[0] || 'Study Learner',
        bio: 'Passionate learner exploring new topics and mastering skills.',
        learningGoals: 'Currently focusing on technology, programming, and personal development.'
      });
      
      // Fetch user stats
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handleSaveProfile = async () => {
    // In a real app, you would save to the database
    setIsEditing(false);
  };

  if (loading) {
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
                Please <a href="/account/signin" className="text-[#30C4B5] hover:underline">sign in</a> to view your profile.
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
          {/* Profile Header */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-[#30C4B5] to-[#1E9B8A] rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] bg-transparent border-b border-[#30C4B5] focus:outline-none"
                      />
                    ) : (
                      <h1 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-1">
                        {profileData.name}
                      </h1>
                    )}
                    <div className="flex items-center text-[#6B7280] dark:text-[#9CA3AF] text-sm">
                      <Mail size={14} className="mr-2" />
                      {user.email}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          className="flex items-center px-3 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                        >
                          <Save size={16} className="mr-1" />
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                        >
                          <X size={16} className="mr-1" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-3 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                      >
                        <Edit2 size={16} className="mr-1" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows="3"
                      className="w-full p-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                    />
                  ) : (
                    <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      {profileData.bio}
                    </p>
                  )}
                </div>

                {/* Learning Goals */}
                <div>
                  <label className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2">
                    Learning Goals
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.learningGoals}
                      onChange={(e) => setProfileData({ ...profileData, learningGoals: e.target.value })}
                      rows="2"
                      className="w-full p-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                    />
                  ) : (
                    <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                      {profileData.learningGoals}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <BookOpen size={20} className="text-[#30C4B5]" />
                <span className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB]">
                  {stats.totalStudyPlans}
                </span>
              </div>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Study Plans</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <Trophy size={20} className="text-[#F59E0B]" />
                <span className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB]">
                  {stats.completedResources}
                </span>
              </div>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Completed</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <Clock size={20} className="text-[#8B5CF6]" />
                <span className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB]">
                  {stats.totalStudyTime}h
                </span>
              </div>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Study Time</p>
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={20} className="text-[#EF4444]" />
                <span className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB]">
                  {stats.streak}
                </span>
              </div>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">Day Streak</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
            <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-[#F8FAFC] dark:bg-[#252525] rounded-lg">
                <div className="w-10 h-10 bg-[#30C4B5] rounded-full flex items-center justify-center mr-4">
                  <BookOpen size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB]">
                    Completed "React Fundamentals" lesson
                  </p>
                  <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    2 hours ago
                  </p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-[#F8FAFC] dark:bg-[#252525] rounded-lg">
                <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center mr-4">
                  <Trophy size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB]">
                    Created new study plan for "Machine Learning"
                  </p>
                  <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}