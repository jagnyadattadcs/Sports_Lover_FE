import { useState, useEffect, use } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaFilter } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart, FaHeart, FaTimes } from "react-icons/fa";
import { products } from "../utils/products.js";

// Dummy data for filters
const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "Asics", "New Balance"];
const sizes = {
  clothing: ["S", "M", "L", "XL", "XXL"],
  shoes: ["6", "7", "8", "9", "10", "11", "12"]
};
const ratings = [
  { value: 4, label: "4+ ⭐ & above" },
  { value: 3, label: "3+ ⭐ & above" },
  { value: 2, label: "2+ ⭐ & above" },
  { value: 1, label: "1+ ⭐ & above" }
];
const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "customer-ratings", label: "Customer Ratings" }
];

// Map category params to product categories
const categoryMap = {
  "running": "Running",
  "football": "Football",
  "gym-fitness": ["Gym", "Fitness"], // Map to multiple categories
  "yoga": "Yoga",
  "cycling": "Cycling",
  "swimming": "Swimming",
  "basketball": "Basketball",
  "tennis": "Tennis"
};

const ProductsPage = () => {
    const { category } = useParams();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [wishlistedItems, setWishlistedItems] = useState([]);
    const [sortBy, setSortBy] = useState("relevance");
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("All Products");

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    // Filter products based on category when category param changes
    useEffect(() => {
        let filteredProducts = [...products];
        
        // Filter by category if category param exists
        if (category && categoryMap[category]) {
            const categoryFilter = categoryMap[category];
            filteredProducts = filteredProducts.filter(product => 
                // Check if categoryFilter is an array (for gym-fitness) or string
                Array.isArray(categoryFilter) 
                    ? categoryFilter.includes(product.category)
                    : product.category === categoryFilter
            );
            setCategoryTitle(categoryMap[category].toString().replace(",", " & "));
        } else {
            setCategoryTitle("All Products");
        }
        
        // Apply brand filter
        if (selectedBrands.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                selectedBrands.some(brand => product.brand.toLowerCase().includes(brand.toLowerCase()))
            );
        }
        
        // Apply rating filter
        if (selectedRatings.length > 0) {
            const minRating = Math.max(...selectedRatings);
            filteredProducts = filteredProducts.filter(product => 
                product.rating >= minRating
            );
        }
        
        // Apply price filter
        filteredProducts = filteredProducts.filter(product => 
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );
        
        // Apply sorting
        filteredProducts.sort((a, b) => {
            switch(sortBy) {
                case 'price-low-high':
                    return a.price - b.price;
                case 'price-high-low':
                    return b.price - a.price;
                case 'new-arrivals':
                    return b.id - a.id; // Assuming higher ID means newer
                case 'customer-ratings':
                    return b.rating - a.rating;
                default:
                    return 0; // Relevance - no sorting
            }
        });
        
        setDisplayedProducts(filteredProducts);
    }, [category, selectedBrands, selectedRatings, priceRange, sortBy]);

    const toggleWishlist = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlistedItems(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleBrandToggle = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand)
                ? prev.filter(b => b.toLowerCase() !== brand.toLowerCase())
                : [...prev, brand]
        );
    };

    const handleSizeToggle = (size) => {
        setSelectedSizes(prev => 
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );
    };

    const handleRatingToggle = (ratingValue) => {
        setSelectedRatings(prev => 
            prev.includes(ratingValue)
                ? prev.filter(r => r !== ratingValue)
                : [...prev, ratingValue]
        );
    };

    const handleAddCart = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add to cart logic here
        console.log(`Added product ${productId} to cart`);
    }

    const handleClearAllFilters = () => {
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedRatings([]);
        setPriceRange([0, 50000]);
    };

    const getActiveFilters = () => {
        const filters = [];
        if (selectedBrands.length > 0) {
            filters.push(...selectedBrands);
        }
        if (selectedSizes.length > 0) {
            filters.push(...selectedSizes);
        }
        if (selectedRatings.length > 0) {
            filters.push(...selectedRatings.map(r => `${r}+ Stars`));
        }
        if (priceRange[0] > 0 || priceRange[1] < 50000) {
            filters.push(`₹${priceRange[0]} - ₹${priceRange[1]}`);
        }
        return filters;
    };

    const removeFilter = (index) => {
        const filters = getActiveFilters();
        const filterToRemove = filters[index];
        
        // Handle removal based on filter type
        if (brands.includes(filterToRemove)) {
            setSelectedBrands(prev => prev.filter(b => b !== filterToRemove));
        } else if ([...sizes.clothing, ...sizes.shoes].includes(filterToRemove)) {
            setSelectedSizes(prev => prev.filter(s => s !== filterToRemove));
        } else if (filterToRemove.includes('Stars')) {
            const ratingValue = parseInt(filterToRemove);
            setSelectedRatings(prev => prev.filter(r => r !== ratingValue));
        } else if (filterToRemove.includes('₹')) {
            setPriceRange([0, 50000]);
        }
    };

    const applyFilters = () => {
        setShowMobileFilters(false);
    };

    const activeFilters = getActiveFilters();
    const activeFiltersCount = activeFilters.length;

    return (
        <>
            <div className="w-full p-4 px-4 sm:px-6 lg:px-10 bg-white border-b border-b-gray-300">
                <h3 className="text-xl sm:text-2xl font-bold">{categoryTitle}</h3>
                <p className="text-gray-700 text-sm sm:text-base">{displayedProducts.length} products found</p>  
            </div>
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden w-full px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-30">
                <div className="flex items-center justify-between">
                    <button 
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaFilter />
                        Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </button>
                    
                    {activeFiltersCount > 0 && (
                        <button 
                            onClick={handleClearAllFilters}
                            className="px-3 py-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear All
                        </button>
                    )}
                </div>
                
                {/* Active Filters Chips for Mobile */}
                {activeFiltersCount > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {activeFilters.map((filter, index) => (
                            <div key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-2">
                                {filter} 
                                <span 
                                    onClick={() => removeFilter(index)} 
                                    className="cursor-pointer hover:text-red-600 transition-colors"
                                >
                                    ✕
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="flex flex-col lg:flex-row w-full min-h-screen px-4 sm:px-6 lg:px-10 py-4 gap-5">
                {/* Mobile Filter Overlay */}
                {showMobileFilters && (
                    <>
                        <div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                            onClick={() => setShowMobileFilters(false)}
                        />
                        <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 lg:hidden overflow-y-auto transform transition-transform duration-300">
                            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h4 className="text-lg font-semibold">Filters</h4>
                                <button 
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                            
                            <div className="p-4 space-y-6">
                                {/* Brand Filter */}
                                <div>
                                    <h5 className="font-semibold mb-3 text-gray-700">Brand</h5>
                                    <div className="space-y-2">
                                        {brands.map((brand) => (
                                            <div key={brand} className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id={`mobile-brand-${brand}`}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandToggle(brand)}
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <label htmlFor={`mobile-brand-${brand}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                                    {brand}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Price Range Filter */}
                                <div>
                                    <h5 className="font-semibold mb-3 text-gray-700">Price Range</h5>
                                    <div className="px-2">
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="50000" 
                                            step="500"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                                            <span>₹0</span>
                                            <span>₹{priceRange[1].toLocaleString()}</span>
                                            <span>₹50,000</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Size Filter */}
                                <div>
                                    <h5 className="font-semibold mb-3 text-gray-700">Size</h5>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Clothing</p>
                                            <div className="flex flex-wrap gap-2">
                                                {sizes.clothing.map((size) => (
                                                    <button
                                                        key={`mobile-clothing-${size}`}
                                                        onClick={() => handleSizeToggle(size)}
                                                        className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all duration-200 ${
                                                            selectedSizes.includes(size)
                                                                ? "bg-blue-700 text-white border-blue-700"
                                                                : "border-gray-300 hover:border-blue-500"
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-2">Shoes</p>
                                            <div className="flex flex-wrap gap-2">
                                                {sizes.shoes.map((size) => (
                                                    <button
                                                        key={`mobile-shoes-${size}`}
                                                        onClick={() => handleSizeToggle(size)}
                                                        className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all duration-200 ${
                                                            selectedSizes.includes(size)
                                                                ? "bg-blue-700 text-white border-blue-700"
                                                                : "border-gray-300 hover:border-blue-500"
                                                        }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Rating Filter */}
                                <div>
                                    <h5 className="font-semibold mb-3 text-gray-700">Minimum Rating</h5>
                                    <div className="space-y-2">
                                        {ratings.map((rating) => (
                                            <div key={rating.value} className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id={`mobile-rating-${rating.value}`}
                                                    checked={selectedRatings.includes(rating.value)}
                                                    onChange={() => handleRatingToggle(rating.value)}
                                                    className="w-4 h-4 text-blue-600 rounded"
                                                />
                                                <label htmlFor={`mobile-rating-${rating.value}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                                    {rating.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Apply Filters Button */}
                                <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
                                    <button 
                                        onClick={applyFilters}
                                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Apply Filters ({displayedProducts.length} products)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                
                {/* Desktop Sidebar - Filters */}
                <div className="hidden lg:flex lg:w-64 flex-col p-4 rounded-lg lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">Filters</h4>
                        {activeFilters.length > 0 && (
                            <button 
                                onClick={handleClearAllFilters} 
                                className="text-sm text-gray-800 cursor-pointer font-semibold hover:text-blue-700 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                    
                    {/* Active filters */}
                    {activeFilters.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {activeFilters.map((filter, index) => (
                                    <div key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center gap-2">
                                        {filter} 
                                        <span 
                                            onClick={() => removeFilter(index)} 
                                            className="cursor-pointer hover:text-red-600 transition-colors"
                                        >
                                            ✕
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Brand Filter */}
                    <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-gray-700">Brand</h5>
                        <div className="space-y-2">
                            {brands.map((brand) => (
                                <div key={brand} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={`desktop-brand-${brand}`}
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandToggle(brand)}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor={`desktop-brand-${brand}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                        {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div> 
                    
                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-gray-700">Price Range</h5>
                        <div className="px-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="50000" 
                                step="500"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>₹0</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                                <span>₹50,000</span>
                            </div>
                        </div>
                    </div>  
                    
                    {/* Size Filter */}
                    <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-gray-700">Size</h5>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Clothing</p>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.clothing.map((size) => (
                                        <button
                                            key={`desktop-clothing-${size}`}
                                            onClick={() => handleSizeToggle(size)}
                                            className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all duration-200 ${
                                                selectedSizes.includes(size)
                                                    ? "bg-blue-700 text-white border-blue-700"
                                                    : "border-gray-300 hover:border-blue-500"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Shoes</p>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.shoes.map((size) => (
                                        <button
                                            key={`desktop-shoes-${size}`}
                                            onClick={() => handleSizeToggle(size)}
                                            className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all duration-200 ${
                                                selectedSizes.includes(size)
                                                    ? "bg-blue-700 text-white border-blue-700"
                                                    : "border-gray-300 hover:border-blue-500"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Rating Filter */}
                    <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-gray-700">Minimum Rating</h5>
                        <div className="space-y-2">
                            {ratings.map((rating) => (
                                <div key={rating.value} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={`desktop-rating-${rating.value}`}
                                        checked={selectedRatings.includes(rating.value)}
                                        onChange={() => handleRatingToggle(rating.value)}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor={`desktop-rating-${rating.value}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                        {rating.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Products Grid */}
                <div className="flex-1 flex flex-col">
                    {/* Sort Bar */}
                    <div className="flex flex-row sm:items-center justify-between gap-4 mb-6 p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-700 font-medium">Sort by:</p>
                        <div className="flex gap-4">
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md outline-none bg-white text-sm min-w-[180px] focus:border-blue-500"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {/* Products Grid */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {displayedProducts.map((product) => (
                            <Link to={`/product/${product.id}`}>
                                <div key={product.id} className="relative w-full h-80 sm:h-96 lg:h-100 border border-gray-300 rounded-lg group overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                    {/* Product Image */}
                                    <div className="w-full h-[60%] sm:h-[65%] overflow-hidden rounded-tl-lg rounded-tr-lg">
                                        <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    
                                    {/* Add to Cart Button - Behind product info */}
                                    <button onClick={(e)=>handleAddCart(product.id,e)} className="absolute bottom-23 left-1/2 transform -translate-x-1/2 w-[90%] bg-blue-700 text-white py-1 sm:py-1.5 rounded-lg hover:bg-blue-800 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-14 flex justify-center items-center gap-2 text-sm sm:text-base z-10 cursor-pointer">
                                        <LuShoppingCart size={18} /> Add to Cart
                                    </button>

                                    {/* Product Info - Above cart button */}
                                    <div className="bg-white flex flex-col gap-2 p-3 sm:p-4 transition-all duration-300 z-20 relative">
                                        <h4 className="text-sm sm:text-md font-semibold line-clamp-2">{product.name}</h4>
                                        <p className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                                        <FaStar className="text-yellow-500" /> 
                                        {product.rating} ({product.reviews})
                                        </p>
                                        <p className="text-blue-700 text-lg sm:text-xl font-semibold">
                                        ₹{product.price.toLocaleString()} 
                                        <span className="line-through text-gray-600 ml-2 text-sm sm:text-md">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                        </p> 
                                    </div>

                                    {/* Tags - Conditionally Rendered */}
                                    {product.isBestseller && (
                                        <div className="text-white bg-[#EF4444] absolute top-2 left-2 px-2 py-1 rounded-lg text-xs sm:text-sm z-30">
                                        Bestseller
                                        </div>
                                    )}
                                    {product.discount && (
                                        <div className="text-white bg-[#0A66FF] absolute top-2 left-2 px-2 py-1 rounded-lg text-xs sm:text-sm z-30" 
                                        style={{ top: product.isBestseller ? '2.5rem' : '0.5rem' }}>
                                        {product.discount}% off
                                        </div>
                                    )}

                                    {/* Wishlist Button */}
                                    <div 
                                        className="absolute top-2 right-2 p-2 bg-white rounded-full hover:bg-blue-700 transition-colors duration-200 cursor-pointer z-30"
                                        onClick={(e) => toggleWishlist(product.id,e)}
                                    >
                                        {wishlistedItems.includes(product.id) ? 
                                        <FaHeart className="text-red-600 text-sm sm:text-base" /> : 
                                        <FaRegHeart className="text-gray-600 hover:text-white text-sm sm:text-base" />
                                        }
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    {/* No Products Message */}
                    {displayedProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No products found matching your filters.</p>
                            <button 
                                onClick={handleClearAllFilters}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
