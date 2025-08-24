import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import StudyPlanGenerator from "@/components/StudyPlanGenerator";
import StudyPlanOverview from "@/components/StudyPlanOverview";
import { useState } from "react";

export default function HomePage() {
  const [currentStudyPlan, setCurrentStudyPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Left Sidebar - Fixed dark sidebar with navigation - hidden on mobile */}
      <LeftSidebar />

      {/* Main Content Area - Responsive with sidebar offset on desktop */}
      <div className="flex-1 md:ml-64">
        {/* Header - Top navigation bar with search and actions */}
        <Header />

        {/* Main Content Container - Scrollable main content with responsive padding */}
        <main className="p-4 md:p-6 space-y-6 md:space-y-8">
          {/* Study Plan Generator Section */}
          <StudyPlanGenerator 
            onPlanGenerated={setCurrentStudyPlan}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />

          {/* Study Plan Overview Section */}
          {currentStudyPlan && (
            <StudyPlanOverview studyPlan={currentStudyPlan} />
          )}
        </main>
      </div>

      {/* Global styles and fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@800&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-onest {
          font-family: 'Onest', sans-serif;
        }
        
        .font-jetbrains-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .font-mono {
          font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .bg-opacity-6 {
          background-color: rgba(0, 0, 0, 0.06);
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(48, 196, 181, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(48, 196, 181, 0);
          }
        }
        
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}