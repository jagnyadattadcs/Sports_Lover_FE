import { FaArrowRight, FaStar } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { products } from "../utils/products.js";
import { Link } from "react-router-dom";

const NewArrivals = () => {
    const [wishlistedItems, setWishlistedItems] = useState([]);

    const toggleWishlist = (productId,e) => {
        e.preventDefault();
        e.stopPropagation();
        setWishlistedItems(prev => 
        prev.includes(productId) 
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
    };
    const handleAddCart = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        // Add to cart logic here
        console.log(`Added product ${productId} to cart`);
    }
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="sm:mx-1">
            <h2 className="text-lg sm:text-2xl font-semibold">New Arrivals</h2>
            <p className="text-sm sm:text-lg text-gray-500">Fresh gear just dropped</p>
        </div>
        <button className="w-30 flex justify-center items-center gap-2 border border-gray-300 rounded-md p-1 px-2 sm:mr-2 hover:bg-blue-700 transition-all duration-200 text-gray-700 hover:text-white cursor-pointer">
          View All <FaArrowRight className="text-xs sm:text-sm" />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2">
        {products.slice(0,4).map((product) => (
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
    </div>
  )
}

export default NewArrivals
