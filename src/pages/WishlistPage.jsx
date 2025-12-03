import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaTrash, FaShoppingCart, FaHeart, FaArrowRight } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "../context/AuthContext.jsx";

const WishlistPage = () => {
  const { wishlistedItems, setWishlistedItems, cartItems, setCartItems } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleRemoveFromWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlistedItems(prev => 
      prev.filter(item => item.id !== productId)
    );
  };

  const handleMoveToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Remove from wishlist
    setWishlistedItems(prev => 
      prev.filter(item => item.id !== product.id)
    );
    
    // Add to cart if not already there
    const existsInCart = cartItems.some(item => item.id === product.id);
    if (!existsInCart) {
      setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const handleAddAllToCart = () => {
    wishlistedItems.forEach(product => {
      const existsInCart = cartItems.some(item => item.id === product.id);
      if (!existsInCart) {
        setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
      }
    });
    setWishlistedItems([]);
  };

  const handleClearWishlist = () => {
    setWishlistedItems([]);
  };

  const calculateTotalSavings = () => {
    return wishlistedItems.reduce((total, item) => {
      return total + (item.originalPrice - item.price);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <IoMdHeart className="text-gray-300 text-6xl sm:text-8xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save items you love for later. Click the heart icon on any product to add it here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse Products
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalSavings = calculateTotalSavings();

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 px-8 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistedItems.length} item{wishlistedItems.length !== 1 ? 's' : ''} saved for later
          </p>
          
          {/* Total Savings Bar */}
          {/* <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-900">
                Total Savings on Wishlisted Items
              </span>
              <span className="text-sm font-bold text-green-700">
                ₹{totalSavings.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '100%' }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Add items to cart to avail these savings
            </p>
          </div> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Wishlist Items - Left Column */}
          <div className="lg:w-[70%]">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              {/* Wishlist Items List */}
              <div className="space-y-4">
                {wishlistedItems.map((product) => {
                  const isInCart = cartItems.some(item => item.id === product.id);
                  
                  return (
                    <div key={product.id} className="relative flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
                      {/* Product Image */}
                      <Link 
                        to={`/product/${product.id}`}
                        className="shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`}>
                          <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base">
                            {product.name}
                          </h4>
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-2">
                            ({product.reviews})
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-blue-600 font-semibold">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                            Save ₹{(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        </div>
                        
                        {/* Brand and Category */}
                        <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {product.brand}
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* Bestseller Tag */}
                        {product.isBestseller && (
                          <div className="inline-block mt-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            Bestseller
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 sm:items-end sm:justify-between">
                        {/* Remove Button */}
                        <button
                          onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                          className="w-full sm:w-10 h-10 flex items-center justify-center cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Remove from wishlist"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                        
                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => handleMoveToCart(product, e)}
                          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            isInCart
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                          disabled={isInCart}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <FaShoppingCart className="text-xs" />
                            {isInCart ? "In Cart" : "Add to Cart"}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Shopping Button */}
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 mt-6"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary Panel - Right Column */}
          <div className="lg:w-[30%]">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-24">
              <h5 className="text-xl font-bold text-gray-900 mb-4">Wishlist Summary</h5>
              
              {/* Stats Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaHeart className="text-red-500" />
                    <span className="font-medium text-gray-900">Items Saved</span>
                  </div>
                  <span className="font-bold text-blue-700">{wishlistedItems.length}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total Value</span>
                  <span className="font-medium">
                    ₹{wishlistedItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Total Savings</span>
                  <span className="font-bold text-green-600">₹{totalSavings.toLocaleString()}</span>
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <button
                  onClick={handleAddAllToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <FaShoppingCart />
                  Add All to Cart
                </button>
                
                <button
                  onClick={handleClearWishlist}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                >
                  <FaTrash />
                  Clear Wishlist
                </button>
              </div>

              {/* Cart Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium text-gray-900">Your Cart</p>
                    <p className="text-sm text-gray-600">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
                  </div>
                  <span className="text-lg font-bold text-blue-700">
                    ₹{cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toLocaleString()}
                  </span>
                </div>
                
                <button
                  onClick={() => navigate('/cart')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  View Cart
                  <FaArrowRight />
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">•</span>
                  Items remain saved until you remove them
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">•</span>
                  Move items to cart when ready to buy
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">•</span>
                  Prices may change over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
