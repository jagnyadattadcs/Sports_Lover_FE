import { CiMail, CiLock } from "react-icons/ci";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Headings */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Sports Lovers</h1>
          <h3 className="text-xl sm:text-2xl font-semibold mt-2 sm:mt-3">Welcome Back</h3>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Please login to your account</p>
        </div>

        {/* Login Form */}
        <div className="flex flex-col p-6 sm:p-8 w-full bg-white rounded-lg shadow-xl">
          {/* Email Input */}
          <label htmlFor="email" className="text-sm sm:text-base font-medium mb-1">Email</label>
          <div className="focus-within:ring-2 focus-within:ring-blue-300 p-2 sm:p-3 my-2 flex items-center justify-center bg-[#E8F0FE] rounded-md">
            <CiMail className="inline-block mr-2 text-xl sm:text-2xl text-gray-500" />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="outline-none w-full bg-transparent text-sm sm:text-base"
            />
          </div>

          {/* Password Input */}
          <label htmlFor="password" className="text-sm sm:text-base font-medium mb-1">Password</label>
          <div className="focus-within:ring-2 focus-within:ring-blue-300 p-2 sm:p-3 my-2 flex items-center justify-center bg-[#E8F0FE] rounded-md">
            <CiLock className="inline-block mr-2 text-xl sm:text-2xl text-gray-500" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="outline-none bg-transparent w-full text-sm sm:text-base" 
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
            <div className="flex items-center justify-center mb-2 sm:mb-0">
              <input type="checkbox" name="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm sm:text-base font-medium">Remember Me</label>
            </div>
            <Link to="/forgot-password" className="text-blue-600 hover:border-b text-sm sm:text-base">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 my-3 sm:my-4 rounded-md cursor-pointer transition-colors duration-300 text-sm sm:text-base font-medium">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-full mt-3 sm:mt-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="mx-3 text-xs sm:text-sm text-gray-500">Or continue with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 gap-3">
            <button className="w-full flex items-center justify-center hover:bg-blue-700 hover:text-white border border-gray-300 p-2 sm:p-3 rounded-md cursor-pointer transition-all duration-300 text-sm sm:text-base">
              <FaGoogle className="text-lg sm:text-xl" />
              <span className="ml-2 hidden sm:inline">Google</span>
            </button>
            <button className="w-full flex items-center justify-center hover:bg-blue-700 hover:text-white border border-gray-300 p-2 sm:p-3 rounded-md cursor-pointer transition-all duration-300 text-sm sm:text-base">
              <FaFacebook className="text-lg sm:text-xl" />
              <span className="ml-2 hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base">
            Don't have an account? 
            <Link to="/register" className="text-blue-600 hover:border-b font-bold ml-1">
              Sign up
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-600">
          By continuing, you agree to our 
          <Link to="/terms" className="text-blue-600 hover:border-b font-bold mx-1">
            Terms of Service
          </Link> 
          and 
          <Link to="/privacy-policy" className="text-blue-600 hover:border-b font-bold mx-1">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
