import { CiMail, CiLock } from "react-icons/ci";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({email, password});
    navigate("/account");
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="group py-1 px-5 border border-gray-400 rounded-md absolute top-2 left-2 sm:top-2 sm:left-10 font-semibold hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300">
        <span className="hidden sm:block"><span className="text-xl group-hover:-translate-x-3 transition-all duration-300">←</span> Back to Home</span>
        <span className="sm:hidden"><IoHomeOutline /></span>
      </Link>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 my-3 sm:my-4 rounded-md cursor-pointer transition-colors duration-300 text-sm sm:text-base font-medium">
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
