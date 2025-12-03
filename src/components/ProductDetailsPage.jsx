import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaStar, FaRegStar, FaCheck, FaTruck, FaShieldAlt, FaUndo, FaHeart, FaRegHeart, FaMinus, FaPlus } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineArrowBack } from "react-icons/md";
import { products } from "../utils/products.js";
import { useAuth } from "../context/AuthContext.jsx";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const { cartItems, setCartItems, wishlistedItems, setWishlistedItems } = useAuth();
    
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Check if product is in wishlist
    const isWishlisted = product ? wishlistedItems.some(item => item.id === product.id) : false;
    
    // Check if product is in cart
    const isInCart = product ? cartItems.some(item => item.id === product.id) : false;

    // Product images gallery
    const productImages = [
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
        "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w-800",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800"
    ];

    // Available sizes
    const availableSizes = ["6", "7", "8", "9", "10", "11", "12"];
    
    // Available colors
    const availableColors = [
        { name: "Black", hex: "#000000" },
        { name: "Blue", hex: "#0B3D91" },
        { name: "Red", hex: "#DC2626" },
        { name: "White", hex: "#FFFFFF", border: "1px solid #D1D5DB" },
        { name: "Gray", hex: "#6B7280" }
    ];

    useEffect(() => {
        // Find the product by ID
        const foundProduct = products.find(p => p.id === parseInt(productId));
        
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedSize(availableSizes[2]); // Default size
            setSelectedColor(availableColors[0].name); // Default color
            
            // Find related products (same category)
            const related = products
                .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
                .slice(0, 4); // Limit to 4 products
            setRelatedProducts(related);
        } else {
            // Redirect to products page if product not found
            navigate("/category/all");
        }
        
        setLoading(false);
    }, [productId, navigate]);

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        const cartItem = {
            ...product,
            selectedSize,
            selectedColor,
            quantity,
            price: product.price,
            originalPrice: product.originalPrice
        };
        
        // Check if item already exists in cart
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
            // Update quantity if item exists
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + quantity
            };
            setCartItems(updatedCartItems);
        } else {
            // Add new item to cart
            setCartItems(prev => [...prev, cartItem]);
        }
        
        // Show success message
        alert(`${quantity} ${product.name} added to cart!`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate("/cart");
    };

    const toggleWishlist = () => {
        if (!product) return;
        
        if (isWishlisted) {
            // Remove from wishlist
            setWishlistedItems(prev => 
                prev.filter(item => item.id !== product.id)
            );
        } else {
            // Add to wishlist
            setWishlistedItems(prev => [...prev, product]);
        }
    };

    const handleMoveToCartFromWishlist = () => {
        handleAddToCart();
        // Remove from wishlist if it was there
        if (isWishlisted) {
            setWishlistedItems(prev => 
                prev.filter(item => item.id !== product.id)
            );
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
        }
        
        if (hasHalfStar) {
            stars.push(<FaStar key="half" className="text-yellow-500" />);
        }
        
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
        }
        
        return stars;
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

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
                        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                        <Link 
                            to="/category/all" 
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Back Navigation */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <MdOutlineArrowBack className="text-lg" />
                        <span>Back to Products</span>
                    </button>
                </div>
            </div>

            {/* Main Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                        {/* Product Images */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                                <img 
                                    src={productImages[activeImageIndex]} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Tags */}
                                {product.isBestseller && (
                                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Bestseller
                                    </div>
                                )}
                                {product.discount && (
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {product.discount}% OFF
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-3">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                                            activeImageIndex === index 
                                                ? 'border-blue-600 ring-2 ring-blue-100' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        } transition-all duration-200`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Product Header */}
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">
                                            {product.name}
                                        </h1>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="text-gray-600">({product.reviews} reviews)</span>
                                            <span className="text-green-600 font-medium ml-4">
                                                ⭐ {product.rating}/5
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={toggleWishlist}
                                        className="p-3 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                        {isWishlisted ? (
                                            <FaHeart className="text-2xl text-red-600" />
                                        ) : (
                                            <FaRegHeart className="text-2xl text-gray-400 hover:text-red-500" />
                                        )}
                                    </button>
                                </div>
                                
                                {/* Price Section */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-lg sm:text-3xl font-bold text-blue-700">
                                        ₹{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="text-sm sm:text-lg font-semibold text-green-600">
                                        Save ₹{(product.originalPrice - product.price).toLocaleString()} ({product.discount}% off)
                                    </span>
                                </div>
                                
                                {/* Brand & Category */}
                                <div className="flex items-center gap-4 text-gray-600 mb-6">
                                    <span className="bg-gray-100 px-3 py-1 rounded-lg">
                                        Brand: <span className="font-semibold">{product.brand}</span>
                                    </span>
                                    <span className="bg-gray-100 px-3 py-1 rounded-lg">
                                        Category: <span className="font-semibold">{product.category}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">Color: <span className="font-normal">{selectedColor}</span></h3>
                                <div className="flex gap-3">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`relative p-1 rounded-full border-2 ${
                                                selectedColor === color.name 
                                                    ? 'border-blue-600 ring-2 ring-blue-100' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            } transition-all duration-200`}
                                        >
                                            <div 
                                                className="w-6 h-6 sm:w-10 sm:h-10 rounded-full"
                                                style={{ 
                                                    backgroundColor: color.hex,
                                                    border: color.border || 'none'
                                                }}
                                            />
                                            {selectedColor === color.name && (
                                                <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                                                    <FaCheck className="text-xs" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Size: <span className="font-normal">{selectedSize}</span></h3>
                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                        Size Guide
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 sm:grid-cols-7 gap-3">
                                    {availableSizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`sm:py-3 sm:px-2 text-center border rounded-lg font-medium transition-all duration-200 ${
                                                selectedSize === size
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button 
                                            onClick={() => handleQuantityChange('decrement')}
                                            className="p-3 hover:bg-gray-100 transition-colors"
                                        >
                                            <FaMinus className="text-gray-600" />
                                        </button>
                                        <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                                        <button 
                                            onClick={() => handleQuantityChange('increment')}
                                            className="p-3 hover:bg-gray-100 transition-colors"
                                        >
                                            <FaPlus className="text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="text-gray-600">
                                        Only <span className="font-semibold text-red-600">12 items</span> left!
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                {!isWishlisted && (
                                    <button
                                        onClick={handleAddToCart}
                                        className={`flex-1 flex items-center justify-center gap-3 py-2 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg ${
                                            isInCart 
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        <LuShoppingCart className="text-xl" />
                                        {isInCart ? 'Already in Cart' : 'Add to Cart'}
                                    </button>
                                )}
                                
                                {isWishlisted && (
                                    <button
                                        onClick={handleMoveToCartFromWishlist}
                                        className="flex-1 py-2 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                                    >
                                        Move to Cart
                                    </button>
                                )}
                                
                                <button
                                    onClick={handleBuyNow}
                                    className={`flex-1 py-2 sm:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg ${
                                        isWishlisted ? 'sm:col-span-1' : ''
                                    }`}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Features & Benefits */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-3">
                                    <FaTruck className="text-2xl text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Free Delivery</p>
                                        <p className="text-sm text-gray-600">On orders above ₹999</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaUndo className="text-2xl text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Easy Returns</p>
                                        <p className="text-sm text-gray-600">30 Days Return Policy</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaShieldAlt className="text-2xl text-blue-600" />
                                    <div>
                                        <p className="font-semibold">Warranty</p>
                                        <p className="text-sm text-gray-600">1 Year Manufacturer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cart Stats */}
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-blue-900">
                                        Items in your cart: {cartItems.length}
                                    </span>
                                    <Link 
                                        to="/cart" 
                                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                                    >
                                        View Cart →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description & Details */}
                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            Experience peak performance with these professional-grade running shoes. Designed for maximum comfort and durability, 
                            featuring advanced cushioning technology and breathable mesh upper for optimal ventilation during intense workouts.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-gray-900">Key Features:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="text-green-600 mt-1" />
                                        <span>Lightweight & breathable mesh upper</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="text-green-600 mt-1" />
                                        <span>Advanced cushioning technology</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="text-green-600 mt-1" />
                                        <span>Anti-slip rubber sole</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <FaCheck className="text-green-600 mt-1" />
                                        <span>Moisture-wicking inner lining</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-gray-900">Specifications:</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Material</span>
                                        <span className="font-medium">Synthetic Mesh</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Weight</span>
                                        <span className="font-medium">320g (per shoe)</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Closure</span>
                                        <span className="font-medium">Lace-up</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-600">Water Resistant</span>
                                        <span className="font-medium">Yes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
                            <Link 
                                to={`/category/${product.category.toLowerCase().replace(' & ', '-')}`}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View All
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Link 
                                    key={relatedProduct.id}
                                    to={`/product/${relatedProduct.id}`}
                                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img 
                                            src={relatedProduct.image} 
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        {relatedProduct.isBestseller && (
                                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                                                Bestseller
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            {renderStars(relatedProduct.rating)}
                                            <span className="text-sm text-gray-600 ml-2">({relatedProduct.reviews})</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-blue-700">
                                                ₹{relatedProduct.price.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                ₹{relatedProduct.originalPrice.toLocaleString()}
                                            </span>
                                            <span className="text-sm font-semibold text-green-600">
                                                {relatedProduct.discount}% off
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
