import { FaArrowRight, FaStar } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { products } from "../utils/products.js";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const BestSellers = () => {
  const {wishlistedItems, setWishlistedItems, setCartItems, cartItems} = useAuth();

  const toggleWishlist = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    setWishlistedItems(prev => {
        const exists = prev.some(item => item.id === product.id);
        return exists
          ? prev.filter(item => item.id !== product.id)
          : [...prev, product];
    });
  };

  const handleAddCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCartItems(prev => {
        const exist = prev.some(item => item.id === product.id);
        return exist ? prev : [...prev, product];
    });
  }

  return (
    <div className="min-h-screen mx-4 sm:mx-6 lg:mx-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="sm:mx-1">
            <h2 className="text-lg sm:text-2xl font-semibold">Best Sellers</h2>
            <p className="text-sm sm:text-lg text-gray-500">Top picks loved by athletes</p>
        </div>
        <button className="w-30 flex justify-center items-center gap-2 border border-gray-300 rounded-md p-1 px-2 sm:mr-2 hover:bg-blue-700 transition-all duration-200 text-gray-700 hover:text-white cursor-pointer">
          View All <FaArrowRight className="text-xs sm:text-sm" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2">
        {products.slice(0,8).map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
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
              <button 
                onClick={(e) => handleAddCart(product, e)} 
                className={`absolute bottom-23 left-1/2 transform -translate-x-1/2 w-[90%] py-1 sm:py-1.5 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-14 flex justify-center items-center gap-2 text-sm sm:text-base z-10 cursor-pointer ${
                  cartItems.some(item => item.id === product.id)
                    ? "bg-green-600 hover:bg-green-700" // Green for already in cart
                    : "bg-blue-700 hover:bg-blue-800"   // Blue for add to cart
                } text-white`}
              >
                <LuShoppingCart size={18} /> 
                {cartItems.some(item => item.id === product.id) ? "Already in Cart" : "Add to Cart"}
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
                  onClick={(e) => toggleWishlist(product, e)}
              >
                  {wishlistedItems.some(item => item.id === product.id) ? 
                      <FaHeart className="text-red-600 text-sm sm:text-base" /> : 
                      <FaRegHeart className="text-gray-600 hover:text-white text-sm sm:text-base" />
                  }
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center px-8 py-6 mt-8 lg:mt-12">
        <h3 className="text-2xl font-semibold mb-6 lg:mb-10">Trusted Brands</h3>
        <div className="w-full flex flex-wrap justify-center items-center gap-5">
          <div className="w-20 sm:w-40 h-20 p-2 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png" alt="Nike" className="w-full h-full object-contain p-2" />
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://static.vecteezy.com/system/resources/previews/014/414/689/non_2x/adidas-new-logo-on-transparent-background-free-vector.jpg" alt="Adidas" className="w-full h-full object-contain" />
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://static.vecteezy.com/system/resources/previews/020/336/032/non_2x/puma-logo-puma-icon-free-free-vector.jpg" alt="Puma" className="w-full h-full object-contain" />
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://images.wallpapersden.com/image/download/reebok-logo-sport_Z2llamiUmZqaraWkpJRna2pqrWZpZm0.jpg" alt="Reebok" className="w-full h-full object-contain p-2" />
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://download.logo.wine/logo/Under_Armour/Under_Armour-Logo.wine.png" alt="Under Armour" className="w-full h-full object-contain p-2" /> 
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://images.seeklogo.com/logo-png/9/1/new-balance-logo-png_seeklogo-98723.png" alt="New Balance" className="w-full h-full object-contain p-2" /> 
          </div>
          <div className="w-20 sm:w-40 h-20 bg-white rounded-2xl shadow-lg shadow-stone-400 overflow-hidden">
            <img src="https://images.seeklogo.com/logo-png/49/1/asics-logo-png_seeklogo-499804.png" alt="Asics" className="w-full h-full object-contain p-2" /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSellers
