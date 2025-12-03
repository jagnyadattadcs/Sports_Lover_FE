import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { FaRegTrashAlt, FaTag, FaShoppingCart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cartItems, setCartItems } = useAuth();
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState("");
    const [shippingCost, setShippingCost] = useState(99); // Default shipping cost
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    
    // Available coupons
    const availableCoupons = [
        { code: "SAVE10", discount: 10, minOrder: 999 },
        { code: "SAVE20", discount: 20, minOrder: 1999 },
        { code: "FIRST50", discount: 50, minOrder: 4999 }
    ];

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    // Calculate total savings
    const calculateTotalSavings = () => {
        return cartItems.reduce((total, item) => {
            return total + ((item.originalPrice - item.price) * item.quantity);
        }, 0);
    };

    // Calculate discount from coupon
    const calculateDiscount = () => {
        if (!appliedCoupon) return 0;
        const subtotal = calculateSubtotal();
        if (subtotal < appliedCoupon.minOrder) return 0;
        return (subtotal * appliedCoupon.discount) / 100;
    };

    // Calculate shipping (free if subtotal > 999)
    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal >= 999 ? 0 : shippingCost;
    };

    // Calculate final total
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discount = calculateDiscount();
        const shipping = calculateShipping();
        return subtotal - discount + shipping;
    };

    // Handle quantity change
    const handleQuantityChange = (productId, type) => {
        setCartItems(prev => 
            prev.map(item => {
                if (item.id === productId) {
                    const newQuantity = type === 'increment' 
                        ? item.quantity + 1 
                        : Math.max(1, item.quantity - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // Remove item from cart
    const handleRemoveItem = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // Apply coupon
    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code");
            return;
        }

        const coupon = availableCoupons.find(c => 
            c.code.toLowerCase() === couponCode.trim().toLowerCase()
        );

        if (!coupon) {
            setCouponError("Invalid coupon code");
            return;
        }

        const subtotal = calculateSubtotal();
        if (subtotal < coupon.minOrder) {
            setCouponError(`Minimum order of ₹${coupon.minOrder} required`);
            return;
        }

        setAppliedCoupon(coupon);
        setCouponError("");
        setCouponCode("");
    };

    // Remove coupon
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponError("");
        setCouponCode("");
    };

    // Handle checkout
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    // Initialize quantity for items
    useEffect(() => {
        setCartItems(prev => 
            prev.map(item => ({
                ...item,
                quantity: item.quantity || 1
            }))
        );
    }, []);

    // Free shipping threshold
    const freeShippingThreshold = 999;
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const discount = calculateDiscount();
    const total = calculateTotal();
    const totalSavings = calculateTotalSavings();
    const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <FaShoppingCart className="text-gray-300 text-6xl sm:text-8xl" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet.
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

    return (
        <div className="min-h-screen bg-gray-50 pb-6">
            <div className="w-full mx-auto">
                {/* Header */}
                <div className="bg-white shadow-sm p-2 sm:p-4 px-6 sm:px-8 sm:mb-6">
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
                    </p>
                    
                    {/* Free Shipping Progress Bar */}
                    {shipping > 0 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-900">
                                    ₹{freeShippingThreshold - subtotal} away from FREE shipping!
                                </span>
                                <span className="text-sm text-blue-700">
                                    {progressToFreeShipping.toFixed(0)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressToFreeShipping}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Add ₹{freeShippingThreshold - subtotal} more to get FREE shipping
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Cart Items - Left Column */}
                    <div className="lg:w-[70%]">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            {/* Cart Items List */}
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="relative flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
                                        {/* Product Image */}
                                        <Link 
                                            to={`/product/${item.id}`}
                                            className="shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden"
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <Link to={`/product/${item.id}`}>
                                                <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-sm sm:text-base">
                                                    {item.name}
                                                </h4>
                                            </Link>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-blue-600 font-semibold">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                                <span className="text-gray-400 line-through text-sm">
                                                    ₹{item.originalPrice.toLocaleString()}
                                                </span>
                                                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                                                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                                                </span>
                                            </div>
                                            
                                            {/* Quantity Selector */}
                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, 'decrement')}
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <FiMinus className="text-gray-600" />
                                                    </button>
                                                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => handleQuantityChange(item.id, 'increment')}
                                                        className="p-2 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <GoPlus className="text-gray-600" />
                                                    </button>
                                                </div>
                                                
                                                <span className="text-sm text-gray-600">
                                                    Item Total: <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors sm:relative sm:top-auto sm:right-auto"
                                            title="Remove item"
                                        >
                                            <FaRegTrashAlt className="text-lg" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping Button */}
                            <Link 
                                to="/products" 
                                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2 sm:py-3 border border-gray-300 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 mt-6"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary - Right Column */}
                    <div className="lg:w-[30%]">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-24">
                            <h5 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h5>
                            
                            {/* Coupon Section */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-600 mb-2">Have a coupon?</p>
                                
                                {appliedCoupon ? (
                                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FaTag className="text-green-600" />
                                            <span className="font-medium text-green-800">
                                                {appliedCoupon.code} - {appliedCoupon.discount}% OFF
                                            </span>
                                        </div>
                                        <button 
                                            onClick={handleRemoveCoupon}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2 mb-2">
                                        <input 
                                            type="text" 
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="Enter coupon code"
                                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                        <button 
                                            onClick={handleApplyCoupon}
                                            className="px-4 py-2 border border-gray-300 text-black hover:text-white rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                )}
                                
                                {couponError && (
                                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                                )}
                                
                                <p className="text-xs text-gray-500">
                                    Try: {availableCoupons.map(c => c.code).join(', ')}
                                </p>
                            </div>

                            {/* Order Details */}
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                                </div>
                                
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount ({appliedCoupon?.discount}%)</span>
                                        <span className="font-medium">-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                                        {shipping === 0 ? 'FREE' : `₹${shipping}`}
                                    </span>
                                </div>
                                
                                {totalSavings > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                        <span>Total Savings</span>
                                        <span className="font-medium text-green-600">₹{totalSavings.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-blue-700">
                                        ₹{total.toLocaleString()}
                                    </span>
                                </div>
                                
                                <button
                                    onClick={handleCheckout}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                                >
                                    Proceed to Checkout
                                    <FaArrowRight />
                                </button>
                                
                                <p className="text-xs text-center text-gray-500 mt-3">
                                    🔒 Secure checkout powered by SSL encryption
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-lg">✓</span>
                                    Free shipping on orders above ₹999
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-lg">✓</span>
                                    30-day easy returns
                                </p>
                                <p className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="text-lg">✓</span>
                                    100% secure payment
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
