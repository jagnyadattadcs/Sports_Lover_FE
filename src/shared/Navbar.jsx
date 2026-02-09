import React, { useState } from "react";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";

const navLinks = [
  {
    id: "1",
    name: "Home",
    link: "/",
  },
  {
    id: "2",
    name: "Shop",
    link: "/shoping",
  },
  {
    id: "3",
    name: "Categories",
    link: "/categories",
  },
  {
    id: "4",
    name: "Brands",
    link: "/brands",
  },
  {
    id: "5",
    name: "Offers",
    link: "/offers",
  },
  {
    id: "6",
    name: "Contact",
    link: "/contact",
  },
];

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [inputData, setInputData] = useState("");
  const [activeLink, setActiveLink] = useState("Home");
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if(!inputData) {
      alert("Type Something to Search!");
      return;
    }
  }
  return (
    <>
      <div className="sticky top-0 w-full flex items-center justify-between shadow-md p-2 px-4 lg:px-10 bg-white z-90">
        {/* logo */}
        <div className="w-20 sm:w-25">
          <img className="w-full rounded-xl shadow-sm shadow-amber-500" src="../../public/logo.png" alt="logo" />
        </div>

        {/* Nav Links - Hidden on small screens */}
        <ul className="hidden sm:flex gap-4 md:gap-6 ml-4 md:ml-15">
          {navLinks.map((item) => (
            <Link
              // to={item.link}
              onClick={() => setActiveLink(item.name)}
              className={`font-semibold text-sm md:text-base ${item.name === activeLink ? "text-[#FF6A00] border-b-2 rounded-b-md transition-transform duration-300" : ""} hover:text-[#FF6A00]`}
              key={item.id}
            >
              {item.name}
            </Link>
          ))}
        </ul>

        {/* Shopnow & Searchbar - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 ml-2 lg:ml-0 lg:gap-4 xl:gap-5">
          <IoSearch 
            onClick={()=> setActiveSearch(v=>!v)} 
            size={20} 
            className="text-[#FF6A00] cursor-pointer hover:scale-110 transition-transform duration-200" 
          />
          <IoCartOutline 
            size={20} 
            className="text-[#FF6A00] cursor-pointer hover:scale-110 transition-transform duration-200" 
          />
          <button className="p-1 md:p-1.5 bg-[#FF6A00] hover:bg-[#fc822b] text-white text-xs md:text-sm font-semibold rounded-2xl w-20 md:w-25 lg:w-30 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-200">
            Shop Now
          </button>
        </div>

        {/* Mobile section */}
        <div className="flex items-center gap-4 sm:hidden">
          <IoSearch 
            onClick={()=> setActiveSearch(v=>!v)} 
            size={20} 
            className="text-[#FF6A00] cursor-pointer"
          />
          {
              activeMenu ? (
                <IoMdClose 
                  onClick={()=> setActiveMenu(v=>!v)} 
                  size={20}
                  className="text-[#FF6A00] cursor-pointer"
                />
              ):(
                <TfiMenu 
                  onClick={()=> setActiveMenu(v=>!v)} 
                  size={20}
                  className="text-[#FF6A00] cursor-pointer"
                />
              )
          }
        </div>
      </div>

      {/* Search Modal */}
      {
        activeSearch && (
          <div className="fixed flex flex-col items-center bg-black/70 top-0 w-full h-screen z-50">
            <IoMdClose 
              onClick={()=> setActiveSearch(v=>!v)} 
              size={24} 
              className="absolute top-28 right-10 sm:top-15 sm:right-10 md:top-20 md:right-20 lg:left-2/3 mb-5 hover:bg-[#FF6A00] hover:text-white transition-all duration-200 cursor-pointer border border-white bg-white/10 backdrop-blur-sm rounded-full p-1"
            />
            <div className="absolute top-1/3 sm:top-1/4 flex items-center justify-center w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3">
              <input 
                placeholder="Type something to search" 
                value={inputData} 
                onChange={(e) => setInputData(e.target.value)}                            
                type="text" 
                className="w-full border outline-none p-2 px-4 rounded-l-full border-gray-300 bg-white text-black shadow-lg shadow-white text-sm sm:text-base" 
              />
              <div 
                onClick={handleSearch} 
                className="w-12 sm:w-16 border border-gray-300 p-2 flex items-center justify-center shadow-lg shadow-white bg-white hover:bg-[#FF6A00] hover:text-white cursor-pointer transition-all duration-200 rounded-r-full"
              >
                <IoSearch size={18} className="sm:w-6 sm:h-6"/>
              </div>
            </div>
          </div>
        )
      }

      {/* Mobile Menu */}
      <div className={`
        fixed top-0 right-0 w-4/5 sm:w-2/3 md:w-1/2 h-screen bg-white p-4
        border-l-2 border-l-[#ff6a00] rounded-l-2xl
        transform transition-transform duration-500 ease-in-out
        ${activeMenu ? "translate-x-0" : "translate-x-full"} z-50
        flex flex-col
      `}>
        <div className="w-full h-full flex flex-col">
            <IoMdClose 
              className="absolute top-4 right-4 text-[#FF6A00] cursor-pointer hover:bg-[#FF6A00] hover:text-white rounded-full p-1 transition-all duration-200" 
              onClick={()=> setActiveMenu(v=>!v)} 
              size={26}
            />
            
            {/* User Auth Section at top for mobile */}
            <div className="w-full flex flex-col items-center justify-center mt-5 mb-6">
              {
                user ? (
                  <button 
                    onClick={()=> setUser(p=>!p)} 
                    className="mt-2 p-2 border bg-[#ff0000] hover:bg-[#f85252] text-white text-sm font-semibold rounded-2xl w-full cursor-pointer transition-all duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={()=> setUser(p=>!p)} 
                      className="mt-2 p-2 border bg-[#FF6A00] hover:bg-[#fc822b] text-white text-sm font-semibold rounded-2xl w-full cursor-pointer transition-all duration-200"
                    >
                      Sign in
                    </button>
                    <button 
                      onClick={()=> setUser(p=>!p)} 
                      className="mt-2 p-2 border border-[#FF6A00] hover:bg-[#ff6a00] hover:text-white text-[#ff6a00] text-sm font-semibold rounded-2xl w-full cursor-pointer transition-all duration-200"
                    >
                      Sign up
                    </button>
                  </>
                )
              }
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col gap-3 mt-2">
              {navLinks.map((item) => (
                <Link
                  // to={item.link}
                  onClick={() => {
                    setActiveLink(item.name);
                    // setActiveMenu(false);
                  }}
                  className={`font-semibold text-base p-3 rounded-lg transition-all duration-200 ${item.name === activeLink ? "text-[#FF6A00] bg-orange-50 border-l-4 border-l-[#FF6A00]" : "hover:text-[#FF6A00] hover:bg-gray-50"}`}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Cart and Shop Now buttons at bottom */}
            <div className="mt-auto mb-8">
              <div className="border border-[#ff6a00] rounded-2xl flex items-center justify-center p-3 hover:bg-[#ff6a00] text-[#FF6A00] hover:text-white cursor-pointer transition-all duration-200 mb-4">
                <IoCartOutline size={24} />
                <span className="ml-2 font-semibold">Cart (0)</span>
              </div>
              <button className="p-3 bg-[#FF6A00] hover:bg-[#fc822b] text-white text-sm font-semibold rounded-2xl w-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-200">
                Shop Now
              </button>
            </div>
        </div>
      </div>
      
      {/* Backdrop for mobile menu */}
      {activeMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setActiveMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;