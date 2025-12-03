import { MdOutlineLocalShipping, MdCreditCard, MdOutlinePhone  } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FiMail, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-[#0B3D91] flex flex-col items-center">
        {/* Features Section */}
        <div className="w-full h-auto py-6 sm:py-8 border-b border-blue-700 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4 px-4 sm:px-6 lg:px-8 xl:px-20">
            <div className="flex justify-center items-center w-full sm:w-auto">
                <div className="bg-blue-800 p-3 rounded-full mr-3">
                    <MdOutlineLocalShipping size={25} color="white" />
                </div>
                <div>
                    <h4 className="text-white text-sm sm:text-base">Free Shipping</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">On orders above ₹999</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-full sm:w-auto">
                <div className="bg-blue-800 p-3 rounded-full mr-3">
                    <RiSecurePaymentLine size={25} color="white" />
                </div>
                <div>
                    <h4 className="text-white text-sm sm:text-base">Secure Payment</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">100% secure transactions</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-full sm:w-auto">
                <div className="bg-blue-800 p-3 rounded-full mr-3">
                    <MdCreditCard size={25} color="white" />
                </div>
                <div>
                    <h4 className="text-white text-sm sm:text-base">Easy Returns</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">30-day return policy</p>
                </div>
            </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full flex flex-col justify-center items-center gap-2 px-4 sm:px-6 lg:px-8 xl:px-20 py-6 sm:py-8 border-b border-blue-700">
            <FiMail size={30} className="text-blue-600"/>
            <h3 className="text-white text-xl sm:text-2xl text-center">Join Our Newsletter</h3>
            <p className="text-gray-400 text-sm sm:text-base text-center max-w-2xl">
                Get exclusive deals, new product alerts, and fitness tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row mt-4 w-full max-w-md">
                <input 
                    type="text" 
                    className="w-full bg-white rounded-lg p-2 sm:p-3 text-black outline-none focus-within:ring-2 sm:focus-within:ring-4 focus-within:ring-blue-500 text-sm sm:text-base" 
                    placeholder="Enter your mail here"
                />
                <button className="bg-blue-600 text-white px-4 py-2 sm:py-3 mt-2 sm:mt-0 sm:ml-2 rounded-lg hover:bg-blue-500 cursor-pointer transition-colors duration-300 text-sm sm:text-base">
                    Subscribe
                </button>
            </div>
        </div>

        {/* Links Section */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 xl:px-20 py-6 sm:py-10 border-b border-blue-700">
            {/* Company Info */}
            <div className="flex flex-col gap-2">
                <h4 className="text-white text-xl sm:text-2xl font-semibold">Sports Lovers</h4>
                <p className="text-gray-400 text-sm sm:text-base">
                    Your one-stop destination for premium sports equipment, apparel, and accessories. Gear up for your best performance.
                </p>
                <div>
                    <p className="text-white">Address :</p>
                    <p className="text-gray-300">College Square, Cuttack, Odisha</p>
                    <p className="text-gray-300">753003</p>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='text-white text-lg'><MdOutlinePhone /></span>
                    <span className='text-gray-300 text-xs lg:text-sm'>: +91 9778716214 / 8270946494</span>
                </div>
                <div className="flex gap-3 mt-4 text-white">
                    <LuFacebook size={30} className="p-2 bg-blue-800 rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300"/>
                    <FiTwitter size={30} className="p-2 bg-blue-800 rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300"/>
                    <FiInstagram size={30} className="p-2 bg-blue-800 rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300"/>
                    <FiYoutube size={30} className="p-2 bg-blue-800 rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300"/>
                </div>
            </div>
            
            {/* Shop Links */}
            <div>
                <h4 className="text-white text-lg sm:text-xl font-semibold mb-3">Shop</h4>
                <ul className="flex flex-col gap-1">
                    <li onClick={()=> navigate("/products/running")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Running</li>
                    <li onClick={()=> navigate("/products/football")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Football</li>
                    <li onClick={()=> navigate("/products/gym-fitness")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Gym & Fitness</li>
                    <li onClick={()=> navigate("/products/yoga")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Yoga</li>
                    <li onClick={()=> navigate("/products/cycling")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Cycling</li>
                    <li onClick={()=> navigate("/products/swimming")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Swimming</li>
                    <li onClick={()=> navigate("/products/basketball")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Basketball</li>
                    <li onClick={()=> navigate("/products/tennis")} className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Tennis</li>
                </ul>
            </div>
            
            {/* Customer Service Links */}
            <div>
                <h4 className="text-white text-lg sm:text-xl font-semibold mb-3">Customer Service</h4>
                <ul className="flex flex-col gap-1">
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Contact Us</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Shipping & Delivery</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Returns & Refunds</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">FAQs</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Track Order</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Size Guide</li>
                </ul>
            </div>
            
            {/* Company Links */}
            <div>
                <h4 className="text-white text-lg sm:text-xl font-semibold mb-3">Company</h4>
                <ul className="flex flex-col gap-1">
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">About Us</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Careers</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Store Locator</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Privacy Policy</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Terms & Conditions</li>
                    <li className="text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 cursor-pointer">Swimming</li>
                </ul>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 xl:px-20 py-6">
            <p className="text-sm sm:text-base text-white text-center sm:text-left">
                © 2025 Sports Lovers. All rights reserved.
            </p>
            <p className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
                Developed by : <a href="https://dayacs.com/" target="_blank" className="text-white font-bold hover:border-b transition-all duration-300">DCS</a>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <p className="text-sm sm:text-base text-white">We Accept: </p>
                <div className="flex items-center justify-center gap-3 text-white text-2xl sm:text-3xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcAmex />
                    <img src="/bhim-upi.png" alt="Bhim upi icon" className="w-7 h-5 sm:w-8 sm:h-6 bg-white rounded-sm"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
