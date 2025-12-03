import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBox, FaHome, FaCreditCard, FaCalendarAlt, FaShoppingBag } from "react-icons/fa";
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";

const OrderStatusPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId } = useParams();
    
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Mock order data - in real app, this would come from API
    const mockOrders = {
        "success": {
            status: "success",
            title: "Order Confirmed!",
            message: "Thank you for your purchase. Your order has been successfully placed.",
            icon: <FaCheckCircle className="text-6xl text-green-500" />,
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            statusText: "Confirmed",
            estimatedDelivery: "3-5 business days",
            nextSteps: [
                "Order confirmation sent to your email",
                "We'll notify you when your order ships",
                "Track your order using the order ID"
            ]
        },
        "failed": {
            status: "failed",
            title: "Order Failed",
            message: "There was an issue processing your order. Please try again or contact support.",
            icon: <FaTimesCircle className="text-6xl text-red-500" />,
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            textColor: "text-red-700",
            statusText: "Failed",
            estimatedDelivery: "N/A",
            nextSteps: [
                "Payment was not processed successfully",
                "No amount has been deducted from your account",
                "Please try again or use a different payment method"
            ]
        }
    };

    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const status = location.state?.status || (Math.random() > 0.1 ? "success" : "failed");
            const orderDetails = {
                orderId: orderId || `ORD${Date.now()}`,
                status: status,
                paymentMethod: location.state?.paymentMethod || "Cash on Delivery",
                orderTotal: location.state?.orderTotal || 2999,
                items: location.state?.items || 3,
                address: location.state?.address || {
                    firstName: "John",
                    lastName: "Doe",
                    address: "123 Main Street, Downtown",
                    city: "Mumbai",
                    state: "Maharashtra",
                    pincode: "400001",
                    phone: "+91 9876543210"
                },
                orderDate: new Date().toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                orderTime: new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            
            setOrderData({
                ...orderDetails,
                ...mockOrders[status]
            });
            setLoading(false);
        }, 1000);
    }, [orderId, location.state]);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading order details...</p>
                </div>
            </div>
        );
    }
    
    const orderStatus = orderData;
    
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Status Card */}
                <div className={`${orderStatus.bgColor} ${orderStatus.borderColor} border-2 rounded-2xl p-6 sm:p-8 mb-8`}>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4">
                            {orderStatus.icon}
                        </div>
                        <h1 className={`text-2xl sm:text-3xl font-bold ${orderStatus.textColor} mb-2`}>
                            {orderStatus.title}
                        </h1>
                        <p className="text-gray-700 mb-6 max-w-md">
                            {orderStatus.message}
                        </p>
                        
                        {/* Order ID */}
                        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 w-full max-w-md">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Order ID</p>
                                    <p className="font-mono font-bold text-lg text-gray-900">{orderStatus.orderId}</p>
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(orderStatus.orderId)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Copy ID
                                </button>
                            </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${orderStatus.textColor} ${orderStatus.bgColor} border ${orderStatus.borderColor} mb-6`}>
                            {orderStatus.status === "success" ? (
                                <HiOutlineEmojiHappy className="text-xl" />
                            ) : (
                                <HiOutlineEmojiSad className="text-xl" />
                            )}
                            <span className="font-semibold">Status: {orderStatus.statusText}</span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <button
                                onClick={() => navigate("/products")}
                                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Continue Shopping
                            </button>
                            {orderStatus.status === "success" ? (
                                <button
                                    onClick={() => navigate("/orders")}
                                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    View My Orders
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Order Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FaShoppingBag className="text-blue-600" />
                            Order Summary
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order Total</span>
                                <span className="font-bold text-lg">₹{orderStatus.orderTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items</span>
                                <span>{orderStatus.items} item{orderStatus.items !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium">{orderStatus.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order Date</span>
                                <span>{orderStatus.orderDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Order Time</span>
                                <span>{orderStatus.orderTime}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Shipping Details */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FaTruck className="text-green-600" />
                            Shipping Details
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FaHome className="text-gray-400 mt-1" />
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {orderStatus.address.firstName} {orderStatus.address.lastName}
                                    </p>
                                    <p className="text-gray-600">{orderStatus.address.address}</p>
                                    <p className="text-gray-600">
                                        {orderStatus.address.city}, {orderStatus.address.state} - {orderStatus.address.pincode}
                                    </p>
                                    <p className="text-gray-600 mt-1">📱 {orderStatus.address.phone}</p>
                                </div>
                            </div>
                            {orderStatus.status === "success" && (
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <FaCalendarAlt className="text-blue-600" />
                                    <div>
                                        <p className="font-medium text-blue-900">Estimated Delivery</p>
                                        <p className="text-blue-700">{orderStatus.estimatedDelivery}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Next Steps */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {orderStatus.status === "success" ? "What happens next?" : "What to do next?"}
                    </h3>
                    <div className="space-y-4">
                        {orderStatus.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm shrink-0 mt-1">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700">{step}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Support Info */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">
                            Need help? Contact our customer support at{" "}
                            <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                                support@example.com
                            </a>{" "}
                            or call us at{" "}
                            <a href="tel:+911800123456" className="text-blue-600 hover:underline">
                                1800-123-456
                            </a>
                        </p>
                    </div>
                </div>
                
                {/* Continue Shopping Card */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-4">Discover more amazing products</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/products")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Browse All Products
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Go to Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusPage;
