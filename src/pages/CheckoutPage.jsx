import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCreditCard, FaMoneyBillWave, FaPaypal, FaApple, FaGoogle, FaCheckCircle } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { SiPhonepe, SiGooglepay } from "react-icons/si";

const CheckoutPage = () => {
    const { cartItems, user } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        saveAddress: false
    });
    
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [orderNotes, setOrderNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    
    // Calculate totals
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
    
    const calculateShipping = () => {
        return calculateSubtotal() >= 999 ? 0 : 99;
    };
    
    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping();
    };
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Generate random order ID
            const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
            const orderStatus = Math.random() > 0.1 ? "success" : "failed"; // 90% success rate
            
            navigate(`/order-status/${orderId}`, { 
                state: { 
                    status: orderStatus,
                    orderId,
                    paymentMethod,
                    orderTotal: calculateTotal(),
                    items: cartItems.length,
                    address: formData
                }
            });
        }, 1500);
    };
    
    const paymentMethods = [
        {
            id: "cod",
            name: "Cash on Delivery",
            icon: <FaMoneyBillWave className="text-xl" />,
            available: true,
            description: "Pay when you receive your order"
        },
        {
            id: "card",
            name: "Credit/Debit Card",
            icon: <FaCreditCard className="text-xl" />,
            available: false,
            description: "Coming Soon"
        },
        {
            id: "upi",
            name: "UPI Payment",
            icon: <SiGooglepay className="text-xl" />,
            available: false,
            description: "Coming Soon"
        },
        {
            id: "netbanking",
            name: "Net Banking",
            icon: <RiBankFill className="text-xl" />,
            available: false,
            description: "Coming Soon"
        },
        {
            id: "wallet",
            name: "Wallet",
            icon: <FaGoogle className="text-xl" />,
            available: false,
            description: "Coming Soon"
        }
    ];
    
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add items to your cart to proceed to checkout</p>
                    <button
                        onClick={() => navigate("/cart")}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Go to Cart
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your purchase in a few simple steps</p>
                </div>
                
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                                1
                            </div>
                            <div className="ml-2 text-sm font-medium text-blue-600">Cart</div>
                        </div>
                        
                        <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-2"></div>
                        
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                                2
                            </div>
                            <div className="ml-2 text-sm font-medium text-blue-600">Checkout</div>
                        </div>
                        
                        <div className="w-16 sm:w-24 h-1 bg-gray-300 mx-2"></div>
                        
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600">
                                3
                            </div>
                            <div className="ml-2 text-sm font-medium text-gray-500">Confirmation</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:w-[60%]">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Street Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            PIN Code *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="saveAddress"
                                        name="saveAddress"
                                        checked={formData.saveAddress}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-700">
                                        Save this address for future orders
                                    </label>
                                </div>
                            </form>
                        </div>
                        
                        {/* Payment Methods */}
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                            <div className="space-y-3">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                            paymentMethod === method.id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        } ${
                                            !method.available ? "opacity-60 cursor-not-allowed" : ""
                                        }`}
                                        onClick={() => method.available && setPaymentMethod(method.id)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    paymentMethod === method.id
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    {method.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">
                                                        {method.name}
                                                        {!method.available && (
                                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">{method.description}</p>
                                                </div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                                paymentMethod === method.id
                                                    ? "border-blue-500 bg-blue-500"
                                                    : "border-gray-300"
                                            }`}>
                                                {paymentMethod === method.id && (
                                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Order Notes */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Notes (Optional)
                                </label>
                                <textarea
                                    value={orderNotes}
                                    onChange={(e) => setOrderNotes(e.target.value)}
                                    rows="3"
                                    placeholder="Any special instructions for delivery..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column - Order Summary */}
                    <div className="lg:w-[40%]">
                        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                            
                            {/* Items List */}
                            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 p-2 border-b border-gray-100">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-900 text-sm">{item.name}</h5>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-gray-600 text-sm">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="font-medium">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Price Breakdown */}
                            <div className="space-y-2 border-t border-gray-200 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">₹{calculateSubtotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className={`font-medium ${calculateShipping() === 0 ? 'text-green-600' : ''}`}>
                                        {calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}
                                    </span>
                                </div>
                                {calculateSubtotal() < 999 && (
                                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">
                                        Add ₹{999 - calculateSubtotal()} more for FREE shipping
                                    </div>
                                )}
                            </div>
                            
                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-700">
                                            ₹{calculateTotal().toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">(Inclusive of all taxes)</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Security & Submit */}
                            <div className="mt-6">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                                    <FaLock />
                                    <span>Secure checkout powered by SSL encryption</span>
                                </div>
                                
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`w-full py-3 rounded-lg font-semibold text-lg ${
                                        isSubmitting
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white transition-colors`}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : (
                                        `Place Order`
                                    )}
                                </button>
                                
                                <p className="text-xs text-center text-gray-500 mt-3">
                                    By placing your order, you agree to our Terms & Conditions
                                </p>
                                
                                <div className="mt-6 space-y-2">
                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="text-green-500" />
                                        Free shipping on orders above ₹999
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="text-green-500" />
                                        30-day easy returns
                                    </p>
                                    <p className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaCheckCircle className="text-green-500" />
                                        100% secure payment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
