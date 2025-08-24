import { useState } from "react";
import { Brain, Sparkles, Clock, Target } from "lucide-react";

export default function StudyPlanGenerator({
  onPlanGenerated,
  isGenerating,
  setIsGenerating,
}) {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [timeCommitment, setTimeCommitment] = useState("1-2 hours");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic to study");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-study-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic.trim(),
          difficulty,
          timeCommitment,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to generate study plan: ${response.status} ${response.statusText}`,
        );
      }

      const studyPlan = await response.json();

      // Save the study plan to the database
      try {
        const saveResponse = await fetch("/api/study-plans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studyPlan),
        });

        if (saveResponse.ok) {
          const savedPlan = await saveResponse.json();
          // Add the database ID to the study plan
          studyPlan.id = savedPlan.id;
        } else {
          console.warn(
            "Failed to save study plan to database, but continuing with generated plan",
          );
        }
      } catch (saveError) {
        console.warn("Error saving study plan:", saveError);
        // Continue with the generated plan even if saving fails
      }

      onPlanGenerated(studyPlan);
    } catch (error) {
      console.error("Error generating study plan:", error);
      setError("Failed to generate study plan. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="w-full">
      {/* Hero Section */}
      <div className="max-w-[1280px] mx-auto bg-gradient-to-br from-[#30C4B5] to-[#1E9B8A] dark:from-[#1A5B54] dark:to-[#0F3D37] rounded-xl p-8 md:p-12 text-white transition-colors duration-200 mb-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Brain size={32} className="text-white" />
            </div>
          </div>

          <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            AI-Powered Study Plan Generator
          </h1>

          <p className="font-inter text-lg md:text-xl opacity-90 mb-8">
            Transform any topic into a comprehensive, personalized study plan
            with videos, articles, and quizzes
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="font-poppins font-bold text-2xl mb-1">10+</div>
              <div className="font-inter text-sm opacity-80">
                Subtopics Generated
              </div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-2xl mb-1">100+</div>
              <div className="font-inter text-sm opacity-80">
                Learning Resources
              </div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-bold text-2xl mb-1">Smart</div>
              <div className="font-inter text-sm opacity-80">
                Progress Tracking
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Plan Generator Form */}
      <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
        <div className="flex items-center mb-6">
          <Sparkles size={24} className="text-[#30C4B5] mr-3" />
          <h2 className="font-montserrat font-bold text-xl text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200">
            Generate Your Study Plan
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div>
            <label
              htmlFor="topic"
              className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2"
            >
              What would you like to study?
            </label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Machine Learning, React.js, Calculus, Spanish..."
              className="w-full h-12 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] placeholder-[#6B7280] dark:placeholder-[#9CA3AF] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
              disabled={isGenerating}
            />
          </div>

          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Difficulty Level */}
            <div>
              <label
                htmlFor="difficulty"
                className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2"
              >
                <Target size={16} className="inline mr-2" />
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full h-12 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                disabled={isGenerating}
              >
                <option value="beginner">Beginner - New to this topic</option>
                <option value="intermediate">
                  Intermediate - Some knowledge
                </option>
                <option value="advanced">Advanced - Deep understanding</option>
              </select>
            </div>

            {/* Time Commitment */}
            <div>
              <label
                htmlFor="timeCommitment"
                className="block font-inter font-medium text-sm text-[#374151] dark:text-[#D1D5DB] mb-2"
              >
                <Clock size={16} className="inline mr-2" />
                Daily Time Commitment
              </label>
              <select
                id="timeCommitment"
                value={timeCommitment}
                onChange={(e) => setTimeCommitment(e.target.value)}
                className="w-full h-12 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                disabled={isGenerating}
              >
                <option value="30 minutes">30 minutes per day</option>
                <option value="1-2 hours">1-2 hours per day</option>
                <option value="2-4 hours">2-4 hours per day</option>
                <option value="4+ hours">4+ hours per day</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="font-inter text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className={`
                flex items-center px-8 py-4 rounded-lg font-inter font-semibold text-base transition-all duration-200
                ${
                  isGenerating || !topic.trim()
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white hover:shadow-lg transform hover:-translate-y-0.5 pulse-glow"
                }
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
              `}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin-slow mr-3"></div>
                  Generating Your Study Plan...
                </>
              ) : (
                <>
                  <Brain size={20} className="mr-3" />
                  Generate Study Plan
                </>
              )}
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isGenerating && (
          <div className="mt-8 p-6 bg-[#F0FDFA] dark:bg-[#0F2A26] border border-[#A7F3D0] dark:border-[#065F46] rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-3 border-[#30C4B5] border-t-transparent rounded-full animate-spin-slow"></div>
            </div>
            <p className="text-center font-inter text-sm text-[#065F46] dark:text-[#A7F3D0]">
              Our AI is analyzing your topic and creating a personalized study
              plan with curated resources...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
