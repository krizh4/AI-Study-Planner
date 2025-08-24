import { useEffect, useState } from "react";
import useAuth from "@/utils/useAuth";
import { Brain, LogOut, ArrowLeft } from "lucide-react";

export default function LogoutPage() {
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut({
        callbackUrl: "/account/signin",
        redirect: true,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDFA] via-[#FAFAFA] to-[#F0F9FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#30C4B5] rounded-full flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
          </div>
          <h1 className="font-poppins font-bold text-2xl text-[#04111C] mb-2">
            Sign Out
          </h1>
          <p className="font-inter text-sm text-[#6B7280]">
            Are you sure you want to sign out of your account?
          </p>
        </div>

        {/* Sign Out Form */}
        <div className="bg-white rounded-xl border border-[#E7ECF3] p-6 shadow-sm space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <p className="font-inter text-sm text-[#6B7280] mb-6">
              You'll be redirected to the sign-in page after signing out.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className={`
                w-full py-3 px-4 rounded-lg font-inter font-semibold text-base transition-all duration-200
                ${loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white hover:shadow-lg'
                }
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing Out...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </div>
              )}
            </button>

            <a
              href="/"
              className="w-full py-3 px-4 rounded-lg font-inter font-semibold text-base bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}