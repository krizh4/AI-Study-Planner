import LeftSidebar from "@/components/LeftSidebar";
import Header from "@/components/Header";
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Mail, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function HelpPage() {
  const faqItems = [
    {
      question: "How do I create a study plan?",
      answer: "Click the 'AI Study Plan' button in the header or go to the dashboard and click 'Generate Study Plan'. Enter your topic, select difficulty level and time commitment, then let our AI create a personalized plan for you."
    },
    {
      question: "Can I edit my study plans after creation?",
      answer: "Yes! You can edit study plan titles, descriptions, and mark resources as completed. Go to 'My Study Plans' and click the menu button on any plan to access editing options."
    },
    {
      question: "How does progress tracking work?",
      answer: "Progress is automatically tracked when you complete resources. Visit the 'Progress Tracker' page to see detailed analytics, achievements, and your learning streaks."
    },
    {
      question: "What types of resources are included?",
      answer: "Our AI curates a mix of videos, articles, and quizzes for each subtopic. Resources are selected based on quality, relevance, and your specified difficulty level."
    },
    {
      question: "How can I change my account settings?",
      answer: "Go to Settings from the sidebar menu. You can update your profile, notification preferences, privacy settings, and appearance options."
    },
    {
      question: "Is my data private and secure?",
      answer: "Yes, we take privacy seriously. Your study plans and progress data are securely stored and never shared without your consent. Check our Privacy Policy for details."
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "support@studyplanai.com",
      type: "email"
    },
    {
      title: "Community Forum",
      description: "Join discussions with other learners",
      icon: MessageSquare,
      action: "Visit Forum",
      type: "link"
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      icon: BookOpen,
      action: "View Docs",
      type: "link"
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      <LeftSidebar />
      
      <div className="flex-1 md:ml-64">
        <Header />
        
        <main className="p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-[#30C4B5] rounded-full flex items-center justify-center">
                  <HelpCircle size={32} className="text-white" />
                </div>
              </div>
              <h1 className="font-poppins font-bold text-3xl text-[#04111C] dark:text-[#E5E7EB] mb-4">
                Help Center
              </h1>
              <p className="font-inter text-lg text-[#6B7280] dark:text-[#9CA3AF] mb-8">
                Find answers to common questions and get the support you need
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full pl-12 pr-4 py-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg font-inter text-sm text-[#111827] dark:text-[#F9FAFB] placeholder-[#6B7280] dark:placeholder-[#9CA3AF] bg-white dark:bg-[#1F2937] focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                />
              </div>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 text-center transition-colors duration-200 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-[#30C4B5] bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-[#30C4B5]" />
                    </div>
                    <h3 className="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
                      {option.title}
                    </h3>
                    <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-4">
                      {option.description}
                    </p>
                    <button className="inline-flex items-center px-4 py-2 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200">
                      {option.action}
                      {option.type === "link" && <ExternalLink size={14} className="ml-1" />}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
              <h2 className="font-montserrat font-bold text-2xl text-[#04111C] dark:text-[#E5E7EB] mb-8 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-lg transition-colors duration-200"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#252525] rounded-lg transition-colors duration-200">
                      <h3 className="font-inter font-semibold text-base text-[#111827] dark:text-[#F9FAFB] pr-4">
                        {item.question}
                      </h3>
                      <ChevronRight 
                        size={20} 
                        className="text-[#6B7280] dark:text-[#9CA3AF] transition-transform duration-200 group-open:rotate-90" 
                      />
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="font-inter text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center mt-12 p-8 bg-gradient-to-br from-[#F0FDFA] to-[#E6FFFA] dark:from-[#0F2A26] dark:to-[#1A3A37] rounded-xl border border-[#A7F3D0] dark:border-[#065F46] transition-colors duration-200">
              <h3 className="font-montserrat font-bold text-xl text-[#065F46] dark:text-[#A7F3D0] mb-4">
                Still need help?
              </h3>
              <p className="font-inter text-sm text-[#047857] dark:text-[#6EE7B7] mb-6">
                Our support team is here to help you succeed in your learning journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:support@studyplanai.com"
                  className="inline-flex items-center px-6 py-3 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200"
                >
                  <Mail size={16} className="mr-2" />
                  Contact Support
                </a>
                <button className="inline-flex items-center px-6 py-3 border border-[#30C4B5] text-[#30C4B5] hover:bg-[#30C4B5] hover:text-white rounded-lg font-inter font-medium text-sm transition-colors duration-200">
                  <MessageSquare size={16} className="mr-2" />
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}