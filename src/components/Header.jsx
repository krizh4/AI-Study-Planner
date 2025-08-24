import {
  Menu,
  Search,
  Mic,
  Bell,
  Brain,
  Home,
  BookOpen,
  Target,
  ChevronDown,
  Plus,
  Settings,
  Info,
  Power,
  X,
} from "lucide-react";
import { useState } from "react";
import useUser from "@/utils/useUser";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: user } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    closeMobileMenu();
  };

  const handleLogout = () => {
    window.location.href = "/account/logout";
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-[#E9EDF3] dark:border-[#2A2A2A] h-14 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Utility Group - Hamburger */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40"
              >
                <Menu
                  size={22}
                  className="text-[#001D2E] dark:text-white hover:text-[#30C4B5] transition-colors"
                />
              </button>

              {/* Brand name on mobile */}
              <h1
                className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white ml-3 md:hidden cursor-pointer hover:text-[#30C4B5] transition-colors duration-200"
                onClick={() => handleNavigation("/")}
              >
                StudyPlan AI
              </h1>
            </div>

            {/* Search Module - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-[480px] min-w-[280px] mx-4">
              <div className="flex items-center h-10 border border-[#D7DBE3] dark:border-[#374151] rounded-lg overflow-hidden focus-within:border-[#30C4B5] transition-colors bg-white dark:bg-[#262626] w-full">
                {/* Search Icon Section */}
                <div className="w-12 flex items-center justify-center">
                  <Search
                    size={20}
                    className="text-[#505B6B] dark:text-[#9CA3AF]"
                  />
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search study topics..."
                  className="flex-1 h-full px-0 py-0 border-0 outline-none font-inter text-sm text-[#505B6B] dark:text-[#E5E7EB] placeholder-[#8B93A3] dark:placeholder-[#6B7280] focus:placeholder-[#707888] dark:focus:placeholder-[#9CA3AF] bg-transparent"
                />

                {/* Divider */}
                <div className="w-px h-6 bg-[#D7DBE3] dark:bg-[#374151]"></div>

                {/* Mic Button */}
                <button className="w-10 h-10 flex items-center justify-center hover:bg-[#30C4B5] hover:bg-opacity-10 dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                  <Mic
                    size={20}
                    className="text-[#505B6B] dark:text-[#9CA3AF]"
                  />
                </button>
              </div>
            </div>

            {/* Action Cluster */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Search icon for mobile */}
              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                <Search
                  size={20}
                  className="text-[#505B6B] dark:text-[#9CA3AF]"
                />
              </button>

              {/* Vertical Divider - hidden on mobile */}
              <div className="w-px h-6 bg-[#E1E4E8] dark:bg-[#374151] hidden md:block"></div>

              {/* Show different actions based on auth status */}
              {user ? (
                <>
                  {/* Notification Bell */}
                  <button className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-[#ECF9F7] dark:hover:bg-[#30C4B5] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40">
                    <Bell
                      size={20}
                      className="text-[#8B93A3] dark:text-[#9CA3AF]"
                    />
                    {/* Notification Dot */}
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF4E5C] rounded-full"></div>
                  </button>

                  {/* Primary CTA */}
                  <button
                    onClick={() => handleNavigation("/")}
                    className="flex items-center h-10 px-3 md:px-6 bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white rounded-lg font-jetbrains-mono font-extrabold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40"
                  >
                    <span className="hidden sm:inline">AI Study Plan</span>
                    <Brain size={18} className="sm:ml-2" />
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In Button */}
                  <a
                    href="/account/signin"
                    className="hidden sm:flex items-center px-4 py-2 text-[#30C4B5] hover:text-[#29AF9F] font-inter font-medium text-sm transition-colors duration-200"
                  >
                    Sign In
                  </a>

                  {/* Sign Up Button */}
                  <a
                    href="/account/signup"
                    className="flex items-center h-10 px-3 md:px-6 bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white rounded-lg font-inter font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-40"
                  >
                    <span className="hidden sm:inline">Get Started</span>
                    <Brain size={18} className="sm:ml-2" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobileMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[#001D2E] dark:bg-[#0D1117] text-white flex flex-col transition-colors duration-200 transform">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#0B3144] dark:border-[#1F2937]">
              <h1 className="font-montserrat font-bold text-lg text-white">
                StudyPlan AI
              </h1>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {user ? (
                <>
                  {/* Profile Section */}
                  <div
                    className="flex items-center mb-7 cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200"
                    onClick={() => handleNavigation("/profile")}
                  >
                    <img
                      src="https://images.pexels.com/photos/8555232/pexels-photo-8555232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="Student"
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-onest font-semibold text-[13px] text-white">
                        {user?.name ||
                          user?.email?.split("@")[0] ||
                          "Study Learner"}
                      </div>
                      <div className="font-onest font-normal text-[11px] text-white opacity-50">
                        {user?.email || "learner@email.com"}
                      </div>
                    </div>
                    <ChevronDown
                      size={18}
                      className="text-white opacity-60 hover:opacity-80 transition-opacity"
                    />
                  </div>

                  {/* Main Menu Section */}
                  <div className="mb-9">
                    <h2 className="font-onest font-semibold text-[11px] text-white mb-3 opacity-60">
                      Main Menu
                    </h2>
                    <div className="space-y-3">
                      {/* Dashboard */}
                      <div
                        className="flex items-center bg-[#38C5B0] dark:bg-[#30C4B5] rounded-md px-4 py-3 transition-colors duration-150 ease-out hover:bg-[#32B5A1] dark:hover:bg-[#29AF9F] active:bg-[#2DA496] dark:active:bg-[#239E8F] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38C5B0]"
                        onClick={() => handleNavigation("/")}
                      >
                        <Home size={18} className="text-white mr-4" />
                        <span className="font-onest font-medium text-[13px] text-white">
                          Dashboard
                        </span>
                      </div>

                      {/* My Study Plans */}
                      <div
                        className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38C5B0] group"
                        onClick={() => handleNavigation("/my-study-plans")}
                      >
                        <BookOpen
                          size={18}
                          className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                        />
                        <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                          My Study Plans
                        </span>
                      </div>

                      {/* Progress Tracker */}
                      <div
                        className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#38C5B0] group"
                        onClick={() => handleNavigation("/progress-tracker")}
                      >
                        <Target
                          size={18}
                          className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                        />
                        <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                          Progress Tracker
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Study Topics Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-onest font-semibold text-[11px] text-white opacity-60">
                        Study Topics
                      </h2>
                      <button className="w-6 h-6 border border-[#2F4C65] dark:border-[#4A5568] rounded flex items-center justify-center hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 hover:border-[#4A6A8A] dark:hover:border-[#6B7280] active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#38C5B0]">
                        <Plus
                          size={14}
                          className="text-white opacity-70 hover:opacity-90 transition-opacity"
                        />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                        <div className="w-2.5 h-2.5 bg-[#006DFF] dark:bg-[#3B82F6] rounded-full mr-4"></div>
                        <span className="font-onest font-normal text-[12px] text-white">
                          Programming
                        </span>
                      </div>
                      <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
                        <div className="w-2.5 h-2.5 bg-[#794CFF] dark:bg-[#8B5CF6] rounded-full mr-4"></div>
                        <span className="font-onest font-normal text-[12px] text-white">
                          Mathematics
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Utility Links */}
                  <div className="border-t border-[#0B3144] dark:border-[#1F2937] pt-6">
                    <div className="space-y-3">
                      <div
                        className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#38C5B0] rounded px-2 py-1 group"
                        onClick={() => handleNavigation("/settings")}
                      >
                        <Settings
                          size={18}
                          className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                        />
                        <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                          Settings
                        </span>
                      </div>

                      <div
                        className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#38C5B0] rounded px-2 py-1 group"
                        onClick={() => handleNavigation("/help")}
                      >
                        <Info
                          size={18}
                          className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                        />
                        <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                          Help Center
                        </span>
                      </div>

                      <div
                        className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#062236] dark:hover:bg-[#1F2937] active:bg-[#0A1E2D] dark:active:bg-[#111827] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#38C5B0]"
                        onClick={handleLogout}
                      >
                        <Power size={18} className="text-white mr-4" />
                        <span className="font-onest font-medium text-[12px] text-white">
                          Logout
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Not authenticated - show auth options */
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <h3 className="font-montserrat font-semibold text-lg text-white mb-2">
                      Welcome to StudyPlan AI
                    </h3>
                    <p className="font-inter text-sm text-white opacity-60 mb-6">
                      Sign in to access your personalized study plans
                    </p>
                    <div className="space-y-3">
                      <a
                        href="/account/signin"
                        className="block w-full py-3 px-4 bg-[#30C4B5] hover:bg-[#29AF9F] text-white rounded-lg font-inter font-semibold text-sm transition-colors duration-200 text-center"
                        onClick={closeMobileMenu}
                      >
                        Sign In
                      </a>
                      <a
                        href="/account/signup"
                        className="block w-full py-3 px-4 border border-[#30C4B5] text-[#30C4B5] hover:bg-[#30C4B5] hover:text-white rounded-lg font-inter font-semibold text-sm transition-colors duration-200 text-center"
                        onClick={closeMobileMenu}
                      >
                        Create Account
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
