import { CiMail, CiLock, CiUser, CiPhone } from "react-icons/ci";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Register = () => {
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
          <h3 className="text-xl sm:text-2xl font-semibold mt-2 sm:mt-3">Create Account</h3>
          <p className="text-sm sm:text-base text-gray-500 mt-1">Join our sports community</p>
        </div>

        {/* Register Form */}
        <div className="flex flex-col p-6 sm:p-8 w-full bg-white rounded-lg shadow-xl">
          {/* Name Input */}
          <label htmlFor="name" className="text-sm sm:text-base font-medium mb-1">Full Name</label>
          <div className="focus-within:ring-2 focus-within:ring-blue-300 p-2 sm:p-3 my-2 flex items-center justify-center bg-[#E8F0FE] rounded-md">
            <CiUser className="inline-block mr-2 text-xl sm:text-2xl text-gray-500" />
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              className="outline-none w-full bg-transparent text-sm sm:text-base"
            />
          </div>

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

          {/* Phone Input */}
          <label htmlFor="phone" className="text-sm sm:text-base font-medium mb-1">Phone Number</label>
          <div className="focus-within:ring-2 focus-within:ring-blue-300 p-2 sm:p-3 my-2 flex items-center justify-center bg-[#E8F0FE] rounded-md">
            <CiPhone className="inline-block mr-2 text-xl sm:text-2xl text-gray-500" />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Phone Number" 
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

          {/* Confirm Password Input */}
          <label htmlFor="confirmPassword" className="text-sm sm:text-base font-medium mb-1">Confirm Password</label>
          <div className="focus-within:ring-2 focus-within:ring-blue-300 p-2 sm:p-3 my-2 flex items-center justify-center bg-[#E8F0FE] rounded-md">
            <CiLock className="inline-block mr-2 text-xl sm:text-2xl text-gray-500" />
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              className="outline-none bg-transparent w-full text-sm sm:text-base" 
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start mt-2">
            <input type="checkbox" name="terms" className="mr-2 mt-1" />
            <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
              I agree to the 
              <Link to="/terms" className="text-blue-600 hover:border-b mx-1">
                Terms of Service
              </Link> 
              and 
              <Link to="/privacy-policy" className="text-blue-600 hover:border-b mx-1">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 my-3 sm:my-4 rounded-md cursor-pointer transition-colors duration-300 text-sm sm:text-base font-medium">
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-full mt-3 sm:mt-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="mx-3 text-xs sm:text-sm text-gray-500">Or sign up with</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Register Buttons */}
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

          {/* Login Link */}
          <p className="text-center mt-4 sm:mt-6 text-sm sm:text-base">
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:border-b font-bold ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
