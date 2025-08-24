import { useState, useEffect } from "react";
import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import useUser from "@/utils/useUser";
import { 
  BookOpen, 
  Clock, 
  Target, 
  MoreVertical, 
  Plus, 
  Search,
  Filter,
  Calendar,
  Trash2,
  Edit,
  Eye
} from "lucide-react";

function StudyPlanCard({ plan, onView, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const progress = plan.total_resources > 0 
    ? Math.round((plan.completed_resources / plan.total_resources) * 100) 
    : 0;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-colors duration-200 hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
            {plan.title}
          </h3>
          <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3 line-clamp-2">
            {plan.description}
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <Target size={12} className="mr-1" />
              {plan.difficulty}
            </div>
            <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <Clock size={12} className="mr-1" />
              {plan.time_commitment}
            </div>
            <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              <BookOpen size={12} className="mr-1" />
              {plan.subtopic_count} topics
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-inter text-xs text-[#374151] dark:text-[#D1D5DB]">Progress</span>
              <span className="font-inter text-xs text-[#30C4B5]">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#E5F5F2] dark:bg-[#374151] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#21B89A] dark:bg-[#34D399] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
              {plan.completed_resources} of {plan.total_resources} resources completed
            </p>
          </div>

          <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
            <Calendar size={12} className="mr-1" />
            Created {new Date(plan.created_at).toLocaleDateString()}
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-[#F8FAFC] dark:hover:bg-[#252525] rounded-lg transition-colors duration-200"
          >
            <MoreVertical size={16} className="text-[#6B7280] dark:text-[#9CA3AF]" />
          </button>

          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-lg shadow-lg z-20">
                <button
                  onClick={() => {
                    onView(plan);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left font-inter text-sm text-[#374151] dark:text-[#D1D5DB] hover:bg-[#F8FAFC] dark:hover:bg-[#252525] flex items-center transition-colors duration-200"
                >
                  <Eye size={14} className="mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => {
                    onEdit(plan);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left font-inter text-sm text-[#374151] dark:text-[#D1D5DB] hover:bg-[#F8FAFC] dark:hover:bg-[#252525] flex items-center transition-colors duration-200"
                >
                  <Edit size={14} className="mr-2" />
                  Edit Plan
                </button>
                <button
                  onClick={() => {
                    onDelete(plan);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left font-inter text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:hover:bg-opacity-20 flex items-center transition-colors duration-200"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete Plan
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(plan)}
          className="flex-1 py-2 px-4 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}

export default function MyStudyPlansPage() {
  const { data: user, loading: userLoading } = useUser();
  const [studyPlans, setStudyPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    if (user) {
      fetchStudyPlans();
    }
  }, [user]);

  const fetchStudyPlans = async () => {
    try {
      const response = await fetch('/api/study-plans');
      if (response.ok) {
        const data = await response.json();
        setStudyPlans(data);
      } else {
        console.error('Failed to fetch study plans');
      }
    } catch (error) {
      console.error('Error fetching study plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPlan = (plan) => {
    // Navigate to study plan detail page
    window.location.href = `/study-plan/${plan.id}`;
  };

  const handleEditPlan = (plan) => {
    // Navigate to edit page (or open modal)
    console.log('Edit plan:', plan);
  };

  const handleDeletePlan = async (plan) => {
    if (confirm(`Are you sure you want to delete "${plan.title}"?`)) {
      try {
        const response = await fetch(`/api/study-plans/${plan.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setStudyPlans(studyPlans.filter(p => p.id !== plan.id));
        }
      } catch (error) {
        console.error('Error deleting study plan:', error);
      }
    }
  };

  const filteredPlans = studyPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "in-progress") {
      const progress = plan.total_resources > 0 
        ? (plan.completed_resources / plan.total_resources) * 100 
        : 0;
      return matchesSearch && progress > 0 && progress < 100;
    }
    if (filterBy === "completed") {
      const progress = plan.total_resources > 0 
        ? (plan.completed_resources / plan.total_resources) * 100 
        : 0;
      return matchesSearch && progress === 100;
    }
    if (filterBy === "not-started") {
      return matchesSearch && plan.completed_resources === 0;
    }
    
    return matchesSearch;
  });

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
                Please <a href="/account/signin" className="text-[#30C4B5] hover:underline">sign in</a> to view your study plans.
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
                  My Study Plans
                </h1>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                  Manage and track your personalized learning journeys
                </p>
              </div>
              
              <a
                href="/"
                className="flex items-center px-4 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200 mt-4 md:mt-0"
              >
                <Plus size={16} className="mr-2" />
                Create New Plan
              </a>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search study plans..."
                  className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] placeholder-[#6B7280] dark:placeholder-[#9CA3AF] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-[#9CA3AF]" />
                </div>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                >
                  <option value="all">All Plans</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Study Plans Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredPlans.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={48} className="text-[#9CA3AF] mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
                  {searchTerm || filterBy !== "all" ? "No study plans found" : "No study plans yet"}
                </h3>
                <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-6">
                  {searchTerm || filterBy !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Create your first AI-powered study plan to get started"
                  }
                </p>
                {!searchTerm && filterBy === "all" && (
                  <a
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                  >
                    <Plus size={18} className="mr-2" />
                    Create Your First Study Plan
                  </a>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <StudyPlanCard
                    key={plan.id}
                    plan={plan}
                    onView={handleViewPlan}
                    onEdit={handleEditPlan}
                    onDelete={handleDeletePlan}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}