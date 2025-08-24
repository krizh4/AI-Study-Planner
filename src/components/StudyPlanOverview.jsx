import { useState } from "react";
import {
  BookOpen,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle2,
  Clock,
  Target,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

function ProgressBar({ percentage }) {
  return (
    <div className="w-full h-2 bg-[#E5F5F2] dark:bg-[#374151] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#21B89A] dark:bg-[#34D399] rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

function SubtopicCard({
  subtopic,
  index,
  isExpanded,
  onToggle,
  onResourceUpdate,
}) {
  const completedResources = subtopic.resources.filter(
    (r) => r.completed,
  ).length;
  const totalResources = subtopic.resources.length;
  const progress =
    totalResources > 0 ? (completedResources / totalResources) * 100 : 0;

  const handleResourceAction = async (resource) => {
    if (resource.type === "quiz") {
      // For quizzes, mark as completed when clicked
      if (!resource.completed && resource.id) {
        try {
          const response = await fetch(`/api/resources/${resource.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: true }),
          });

          if (response.ok) {
            onResourceUpdate();
          }
        } catch (error) {
          console.error("Error updating resource:", error);
        }
      }
    } else {
      // For videos and articles, open the URL
      if (resource.url) {
        window.open(resource.url, "_blank");

        // Mark as completed after opening
        if (!resource.completed && resource.id) {
          try {
            const response = await fetch(`/api/resources/${resource.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ completed: true }),
            });

            if (response.ok) {
              onResourceUpdate();
            }
          } catch (error) {
            console.error("Error updating resource:", error);
          }
        }
      }
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircle size={16} className="text-[#FF6B6B]" />;
      case "article":
        return <FileText size={16} className="text-[#4ECDC4]" />;
      case "quiz":
        return <HelpCircle size={16} className="text-[#45B7D1]" />;
      default:
        return <BookOpen size={16} className="text-[#96CEB4]" />;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-[#FFE5E5] text-[#FF6B6B] dark:bg-[#4A1A1A] dark:text-[#FF8A8A]";
      case "article":
        return "bg-[#E5F9F6] text-[#4ECDC4] dark:bg-[#1A3A37] dark:text-[#6EEEE6]";
      case "quiz":
        return "bg-[#E5F4FF] text-[#45B7D1] dark:bg-[#1A2F4A] dark:text-[#65C7F1]";
      default:
        return "bg-[#F0F8F0] text-[#96CEB4] dark:bg-[#2A3A2A] dark:text-[#B6DEB4]";
    }
  };

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl transition-colors duration-200">
      {/* Subtopic Header */}
      <div
        className="p-6 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#252525] transition-colors duration-200"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-8 h-8 bg-[#30C4B5] text-white rounded-full font-inter font-semibold text-sm mr-4">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
                {subtopic.title}
              </h3>
              <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-3">
                {subtopic.description}
              </p>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  <Clock size={12} className="mr-1" />
                  {subtopic.estimatedTime}
                </div>
                <div className="flex items-center text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  <Target size={12} className="mr-1" />
                  {completedResources}/{totalResources} completed
                </div>
              </div>
              <ProgressBar percentage={progress} />
            </div>
          </div>
          <div className="ml-4">
            {isExpanded ? (
              <ChevronDown
                size={20}
                className="text-[#6B7280] dark:text-[#9CA3AF]"
              />
            ) : (
              <ChevronRight
                size={20}
                className="text-[#6B7280] dark:text-[#9CA3AF]"
              />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-[#E7ECF3] dark:border-[#2A2A2A]">
          <div className="pt-6">
            <h4 className="font-inter font-semibold text-sm text-[#374151] dark:text-[#D1D5DB] mb-4">
              Learning Resources
            </h4>
            <div className="space-y-3">
              {subtopic.resources.map((resource, resourceIndex) => (
                <div
                  key={resourceIndex}
                  className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-[#252525] rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-[#2A2A2A] transition-colors duration-200"
                >
                  <div className="flex items-center flex-1">
                    <div className="mr-3">{getResourceIcon(resource.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-inter font-medium text-sm text-[#111827] dark:text-[#F9FAFB]">
                          {resource.title}
                        </h5>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-inter font-medium ${getResourceTypeColor(resource.type)}`}
                        >
                          {resource.type}
                        </span>
                      </div>
                      <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {resource.completed && (
                      <CheckCircle2 size={20} className="text-[#10B981]" />
                    )}
                    <button
                      onClick={() => handleResourceAction(resource)}
                      className="flex items-center px-3 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-xs transition-colors duration-200"
                    >
                      {resource.type === "quiz" ? "Take Quiz" : "View"}
                      <ExternalLink size={12} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function StudyPlanOverview({ studyPlan: initialStudyPlan }) {
  const [studyPlan, setStudyPlan] = useState(initialStudyPlan);
  const [expandedSubtopics, setExpandedSubtopics] = useState(new Set([0])); // First subtopic expanded by default

  const toggleSubtopic = (index) => {
    const newExpanded = new Set(expandedSubtopics);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSubtopics(newExpanded);
  };

  const handleResourceUpdate = async () => {
    // Refresh the study plan data from the database if we have an ID
    if (studyPlan.id) {
      try {
        const response = await fetch(`/api/study-plans/${studyPlan.id}`);
        if (response.ok) {
          const updatedPlan = await response.json();
          setStudyPlan(updatedPlan);
        }
      } catch (error) {
        console.error("Error refreshing study plan:", error);
      }
    }
  };

  const totalResources = studyPlan.subtopics.reduce(
    (total, subtopic) => total + subtopic.resources.length,
    0,
  );
  const completedResources = studyPlan.subtopics.reduce(
    (total, subtopic) =>
      total + subtopic.resources.filter((r) => r.completed).length,
    0,
  );
  const overallProgress =
    totalResources > 0 ? (completedResources / totalResources) * 100 : 0;

  return (
    <section className="w-full">
      {/* Study Plan Header */}
      <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h2 className="font-poppins font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-2">
              {studyPlan.title}
            </h2>
            <p className="font-inter text-base text-[#6B7280] dark:text-[#9CA3AF] mb-4">
              {studyPlan.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
              <div className="flex items-center">
                <Target size={16} className="mr-2" />
                {studyPlan.difficulty} level
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {studyPlan.timeCommitment} daily
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-2" />
                {studyPlan.subtopics.length} subtopics
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-[#F8FAFC] dark:bg-[#252525] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter font-semibold text-sm text-[#374151] dark:text-[#D1D5DB]">
              Overall Progress
            </span>
            <span className="font-inter font-semibold text-sm text-[#30C4B5]">
              {Math.round(overallProgress)}%
            </span>
          </div>
          <ProgressBar percentage={overallProgress} />
          <p className="font-inter text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-2">
            {completedResources} of {totalResources} resources completed
          </p>
        </div>
      </div>

      {/* Subtopics List */}
      <div className="max-w-[1280px] mx-auto space-y-4">
        {studyPlan.subtopics.map((subtopic, index) => (
          <SubtopicCard
            key={index}
            subtopic={subtopic}
            index={index}
            isExpanded={expandedSubtopics.has(index)}
            onToggle={() => toggleSubtopic(index)}
            onResourceUpdate={handleResourceUpdate}
          />
        ))}
      </div>
    </section>
  );
}
