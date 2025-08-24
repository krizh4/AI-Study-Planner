import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Couldn't start sign-in. Please try again or use a different method.",
        OAuthCallback: "Sign-in failed after redirecting. Please try again.",
        OAuthCreateAccount: "Couldn't create an account with this sign-in method. Try another option.",
        EmailCreateAccount: "This email can't be used to create an account. It may already exist.",
        Callback: "Something went wrong during sign-in. Please try again.",
        OAuthAccountNotLinked: "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin: "Incorrect email or password. Try again or reset your password.",
        AccessDenied: "You don't have permission to sign in.",
        Configuration: "Sign-in isn't working right now. Please try again later.",
        Verification: "Your sign-in link has expired. Request a new one.",
      };

      setError(errorMessages[err.message] || "Something went wrong. Please try again.");
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
            Welcome Back
          </h1>
          <p className="font-inter text-sm text-[#6B7280]">
            Sign in to your StudyPlan AI account
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-xl border border-[#E7ECF3] p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-inter font-medium text-sm text-[#374151] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#9CA3AF]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] rounded-lg font-inter text-sm text-[#111827] placeholder-[#6B7280] bg-white focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-inter font-medium text-sm text-[#374151] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#9CA3AF]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-[#D1D5DB] rounded-lg font-inter text-sm text-[#111827] placeholder-[#6B7280] bg-white focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:border-transparent transition-colors duration-200"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-[#9CA3AF] hover:text-[#6B7280]" />
                  ) : (
                    <Eye size={18} className="text-[#9CA3AF] hover:text-[#6B7280]" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-inter text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className={`
                w-full py-3 px-4 rounded-lg font-inter font-semibold text-base transition-all duration-200
                ${loading || !email || !password
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#30C4B5] hover:bg-[#29AF9F] active:bg-[#239E8F] text-white hover:shadow-lg transform hover:-translate-y-0.5'
                }
                focus:outline-none focus:ring-2 focus:ring-[#30C4B5] focus:ring-opacity-50
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="font-inter text-sm text-[#6B7280]">
                Don't have an account?{" "}
                <a
                  href={`/account/signup${typeof window !== "undefined" ? window.location.search : ""}`}
                  className="font-medium text-[#30C4B5] hover:text-[#29AF9F] transition-colors duration-200"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}