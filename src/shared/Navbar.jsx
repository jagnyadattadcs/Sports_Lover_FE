import { MdOutlinePhone, MdMailOutline, MdOutlinePersonOutline, MdClose } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const NavTabs = [
    {
        name: "Running",
        link: "/products/running"
    },
    {
        name: "Football",
        link: "/products/football"
    },
    {
        name: "Gym & Fitness",
        link: "/products/gym-fitness"
    },
    {
        name: "Yoga",
        link: "/products/yoga"
    },
    {
        name: "Cycling",
        link: "/products/cycling"
    },
    {
        name: "Swimming",
        link: "/products/swimming"
    },
    {
        name: "Basketball",
        link: "/products/basketball"
    },
    {
        name: "Tennis",
        link: "/products/tennis"
    },
];

// Static search suggestions data
const staticSuggestions = [
    "Running Shoes",
    "Football Boots",
    "Yoga Mat",
    "Dumbbells Set",
    "Cycling Helmet",
    "Basketball Shoes",
    "Tennis Racket",
    "Sports T-Shirts",
    "Gym Gloves",
    "Swimming Goggles",
    "Fitness Tracker",
    "Sports Bag"
];

// Sample products to show when no suggestions found
const sampleProducts = [
    { id: 1, name: "Nike Running Shoes", price: "₹4,999", image: "/product1.jpg" },
    { id: 2, name: "Adidas Football", price: "₹2,499", image: "/product2.jpg" },
    { id: 3, name: "Yoga Mat Pro", price: "₹1,299", image: "/product3.jpg" }
];

const Navbar = () => {
    const wishlistCount = 1; // dynamically update this
    const cartCount = 5;     // dynamically update this
    const [activeTab, setActiveTab] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchRef = useRef(null);
    const timeoutRef = useRef(null);

    // Debounce search function
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (searchQuery.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        timeoutRef.current = setTimeout(() => {
            // Filter static suggestions based on search query
            const filteredSuggestions = staticSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
            setShowSuggestions(true);
        }, 300);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchQuery]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        setShowMobileSearch(false);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleNavTabClick = (index) => {
        setActiveTab(index);
        closeMobileMenu();
    };

    const closeMobileSearch = () => {
        setShowMobileSearch(false);
        setShowSuggestions(false);
        setSearchQuery("");
    };

    return (
        <>
            {/* Top Navbar */}
            <div className='w-full h-8 bg-[#0B3D91] hidden md:flex justify-between items-center px-4 lg:px-6'>
                <div className='flex justify-center items-center gap-2 lg:gap-4'>
                    <div className='flex items-center gap-1'>
                        <span className='text-white text-lg'><MdOutlinePhone /></span>
                        <span className='text-white text-xs lg:text-sm'>+91 18001234567</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='text-white text-lg'><MdMailOutline /></span>
                        <span className='text-white text-xs lg:text-sm hidden lg:inline'>support@sportslover.com</span>
                        <span className='text-white text-xs lg:text-sm lg:hidden'>support@sl.com</span>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 lg:gap-4'>
                    <Link to="/track-order" className='text-white text-xs lg:text-sm hover:border-b-2 transition-all duration-200'>Track Order</Link>
                    <Link to="/help" className='text-white text-xs lg:text-sm hover:border-b-2 transition-all duration-200'>Help</Link>
                </div>
            </div>

            {/* Middle Navbar */}
            <div className="w-full sticky top-0 flex justify-between items-center p-2 px-6 lg:px-10 bg-white border-b border-gray-200 z-39">
                {/* Logo and Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button 
                        className="lg:hidden text-gray-700 text-xl font-semibold"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        ☰
                    </button>
                    
                    <Link to="/" onClick={()=> setActiveTab(null)} className="flex justify-center items-center">
                        <img src="/SL_logo.jpeg" alt="logo" className="w-20 lg:w-28 rounded-lg"/>
                    </Link>
                </div>
                
                {/* Search Bar */}
                <div className="hidden md:flex relative w-60 lg:w-96 xl:w-120" ref={searchRef}>
                    <div className="w-full h-10 bg-gray-100 flex items-center gap-3 border border-gray-400 rounded-3xl px-4 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-400 transition-colors duration-200">
                        <IoSearchOutline className="text-xl text-gray-600"/>
                        <input 
                            type="text" 
                            placeholder="Search for products, brands..." 
                            className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchQuery && (
                            <button 
                                onClick={clearSearch}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <IoClose />
                            </button>
                        )}
                    </div>
                    
                    {/* Search Suggestions */}
                    {showSuggestions && (
                        <div className="absolute top-12 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                            {suggestions.length > 0 ? (
                                // Show suggestions when found
                                <>
                                    {suggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <IoSearchOutline className="text-gray-400" />
                                                <span className="text-sm">{suggestion}</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : searchQuery.trim() !== "" ? (
                                // Show "no products found" and sample products when no suggestions
                                <>
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3 text-gray-500">
                                            <IoSearchOutline className="text-gray-400" />
                                            <span className="text-sm">No products found for "{searchQuery}"</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">You might be interested in:</h4>
                                        <div className="space-y-3">
                                            {sampleProducts.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                    onClick={() => handleSuggestionClick(product.name)}
                                                >
                                                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                        <span className="text-xs text-gray-500">📦</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-xs text-green-600">{product.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    )}
                </div>

                {/* Mobile Search Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setShowMobileSearch(true)}
                        className="text-gray-700 hover:text-blue-600"
                    >
                        <IoSearchOutline size={24} />
                    </button>
                </div>
                
                {/* User Actions */}
                <div className="flex justify-center items-center gap-4 lg:gap-6">
                    <Link to="/wishlist" className="relative hover:text-blue-600 transition-colors duration-200">
                        <IoIosHeartEmpty className="text-2xl lg:text-3xl" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="relative hover:text-blue-600 transition-colors duration-200">
                        <FiShoppingCart className="text-2xl lg:text-3xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-green-600 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    {/* Hide account icon on mobile */}
                    <Link to="/account" className="hidden lg:flex hover:text-blue-600 transition-colors duration-200">
                        <MdOutlinePersonOutline className="text-2xl lg:text-3xl" />
                    </Link>
                </div>
            </div>

            {/* Full Screen Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="md:hidden fixed inset-0 z-50 bg-white">
                    {/* Search Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                        <button 
                            onClick={closeMobileSearch}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <IoClose size={24} />
                        </button>
                        <div className="flex-1 relative" ref={searchRef}>
                            <div className="w-full h-12 bg-gray-100 flex items-center gap-3 border border-gray-400 rounded-lg px-4 focus-within:border-blue-700 focus-within:ring-2 focus-within:ring-blue-400 transition-colors duration-200">
                                <IoSearchOutline className="text-xl text-gray-600"/>
                                <input 
                                    type="text" 
                                    placeholder="Search for products, brands..." 
                                    className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    autoFocus
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={clearSearch}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        <IoClose />
                                    </button>
                                )}
                            </div>
                            
                            {/* Search Suggestions for Mobile */}
                            {showSuggestions && (
                                <div className="absolute top-14 left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                                    {suggestions.length > 0 ? (
                                        // Show suggestions when found
                                        <>
                                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                                                <span className="text-sm font-medium text-gray-700">Suggestions</span>
                                            </div>
                                            {suggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                                                    onClick={() => handleSuggestionClick(suggestion)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <IoSearchOutline className="text-gray-400" />
                                                        <span className="text-sm">{suggestion}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : searchQuery.trim() !== "" ? (
                                        // Show "no products found" and sample products when no suggestions
                                        <>
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <div className="flex items-center gap-3 text-gray-500">
                                                    <IoSearchOutline className="text-gray-400" />
                                                    <span className="text-sm">No products found for "{searchQuery}"</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">You might be interested in:</h4>
                                                <div className="space-y-3">
                                                    {sampleProducts.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                            onClick={() => handleSuggestionClick(product.name)}
                                                        >
                                                            <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                                                <span className="text-xs text-gray-500">📦</span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                                <p className="text-xs text-green-600">{product.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Searches or Popular Searches Section */}
                    {!searchQuery && (
                        <div className="p-4">
                            <h3 className="font-medium text-gray-700 mb-3">Popular Searches</h3>
                            <div className="flex flex-wrap gap-2">
                                {staticSuggestions.slice(0, 6).map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSearchQuery(suggestion);
                                        }}
                                        className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                {/* Backdrop */}
                <div 
                    className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                        isMobileMenuOpen ? 'bg-opacity-50' : 'bg-opacity-0'
                    }`}
                    onClick={closeMobileMenu}
                ></div>
                
                {/* Sidebar */}
                <div 
                    className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    {/* Sidebar Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                        <button 
                            onClick={closeMobileMenu}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <MdClose className="text-2xl text-gray-600" />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="h-full overflow-y-auto">
                        {/* User Profile Section */}
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <MdOutlinePersonOutline className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Welcome!</p>
                                    <Link 
                                        to="/account" 
                                        onClick={closeMobileMenu}
                                        className="text-sm text-blue-600 hover:text-blue-700"
                                    >
                                        Login / Register
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="p-4">
                            <h3 className="font-medium text-gray-700 mb-3">Categories</h3>
                            <div className="space-y-2">
                                {NavTabs.map((tab, index) => (
                                    <Link 
                                        key={tab.name}
                                        to={tab.link} 
                                        onClick={() => handleNavTabClick(index)}
                                        className={`block px-3 py-2 rounded-lg transition-all duration-150 ${
                                            activeTab === index 
                                                ? "bg-blue-100 text-blue-700 font-medium" 
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {tab.name}
                                    </Link>
                                ))}
                                <Link 
                                    to="/offers" 
                                    onClick={() => handleNavTabClick(10)}
                                    className={`block px-3 py-2 rounded-lg transition-all duration-150 ${
                                        activeTab === 10 
                                            ? "bg-red-100 text-red-700 font-medium" 
                                            : "text-red-600 hover:bg-red-50 font-medium"
                                    }`}
                                >
                                    Deals 🔥
                                </Link>
                            </div>
                        </div>

                        {/* Additional Mobile Links */}
                        <div className="p-4 border-t border-gray-200">
                            <h3 className="font-medium text-gray-700 mb-3">Account</h3>
                            <div className="space-y-2">
                                <Link 
                                    to="/track-order" 
                                    onClick={closeMobileMenu}
                                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Track Order
                                </Link>
                                <Link 
                                    to="/help" 
                                    onClick={closeMobileMenu}
                                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Help & Support
                                </Link>
                                <Link 
                                    to="/wishlist" 
                                    onClick={closeMobileMenu}
                                    className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    My Wishlist
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navbar - NavTabs (Hidden on mobile) */}
            <div className="w-full sticky top-16 bg-white z-35 hidden lg:flex justify-start items-center gap-6 xl:gap-8 h-10 text-black text-sm border-b border-gray-200 px-10 shadow-md">
                {NavTabs.map((tab, index) => (
                    <Link 
                        key={tab.name}
                        to={tab.link} 
                        onClick={() => setActiveTab(index)} 
                        className={`hover:text-blue-600 transition-all duration-150 py-1 ${
                            activeTab === index 
                                ? "border-b-2 border-blue-600 text-blue-600 font-semibold" 
                                : ""
                        }`}
                    >
                        {tab.name}
                    </Link>
                ))}
                <Link 
                    to="/offers" 
                    onClick={() => setActiveTab(10)} 
                    className={`text-red-600 font-semibold hover:text-red-700 transition-all duration-150 py-1 ${
                        activeTab === 10 ? "border-b-2 border-red-600" : ""
                    }`}
                >
                    Deals 🔥
                </Link>
            </div>
        </>
    );
};

export default Navbar;
