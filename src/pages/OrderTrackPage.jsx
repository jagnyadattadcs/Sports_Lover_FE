import { useState } from "react";
import { FaSearch, FaTruck, FaBox, FaCheckCircle, FaShippingFast, FaHome, FaCalendarAlt } from "react-icons/fa";
import { MdPending, MdCancel } from "react-icons/md";

const OrderTrackPage = () => {
    const [orderId, setOrderId] = useState("");
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Mock tracking data - in real app, fetch from API
    const mockTrackingData = {
        orderId: "ORD123456789",
        status: "shipped", // pending, confirmed, shipped, delivered, cancelled
        currentStep: 3,
        totalSteps: 4,
        estimatedDelivery: "Dec 28, 2024",
        customerName: "John Doe",
        items: 3,
        orderDate: "Dec 20, 2024",
        orderTotal: 2499,
        shippingAddress: "123 Main Street, Downtown, Mumbai - 400001",
        phone: "+91 9876543210",
        trackingNumber: "TRK789456123",
        carrier: "Fast Delivery Express",
        
        timeline: [
            {
                id: 1,
                status: "Order Placed",
                date: "Dec 20, 2024",
                time: "10:30 AM",
                completed: true,
                icon: <FaCheckCircle />
            },
            {
                id: 2,
                status: "Order Confirmed",
                date: "Dec 21, 2024",
                time: "11:15 AM",
                completed: true,
                icon: <FaCheckCircle />
            },
            {
                id: 3,
                status: "Shipped",
                date: "Dec 22, 2024",
                time: "02:45 PM",
                completed: true,
                current: true,
                icon: <FaShippingFast />
            },
            {
                id: 4,
                status: "Out for Delivery",
                date: "Expected Dec 24, 2024",
                time: "Morning",
                completed: false,
                icon: <FaTruck />
            },
            {
                id: 5,
                status: "Delivered",
                date: "Expected Dec 28, 2024",
                time: "By EOD",
                completed: false,
                icon: <FaHome />
            }
        ]
    };

    const statusConfig = {
        pending: {
            text: "Pending",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            icon: <MdPending />
        },
        confirmed: {
            text: "Confirmed",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            icon: <FaCheckCircle />
        },
        shipped: {
            text: "Shipped",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            icon: <FaShippingFast />
        },
        delivered: {
            text: "Delivered",
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            icon: <FaCheckCircle />
        },
        cancelled: {
            text: "Cancelled",
            color: "text-red-600",
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            icon: <MdCancel />
        }
    };

    const handleTrackOrder = (e) => {
        e.preventDefault();
        
        if (!orderId.trim()) {
            setError("Please enter your Order ID");
            return;
        }

        setLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            if (orderId.toLowerCase().includes("ord")) {
                setTrackingData(mockTrackingData);
            } else {
                setError("Order ID not found. Please check and try again.");
            }
            setLoading(false);
        }, 1000);
    };

    const getStatusConfig = (status) => {
        return statusConfig[status] || statusConfig.pending;
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Track Your Order
                    </h1>
                    <p className="text-gray-600">
                        Enter your Order ID to track the status of your order
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <form onSubmit={handleTrackOrder} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order ID
                            </label>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="Enter your Order ID (e.g., ORD123456789)"
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Tracking...
                                        </>
                                    ) : (
                                        <>
                                            <FaSearch />
                                            Track Order
                                        </>
                                    )}
                                </button>
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">{error}</p>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                You can find your Order ID in the confirmation email or on your order details page.
                            </p>
                        </div>
                    </form>
                </div>

                <p className="bg-blue-700 mx-auto w-66 text-white p-2 rounded-md">Mock Order Id: <span className="p-1 bg-amber-500 rounded">ORD123456789</span></p>

                {/* Tracking Results */}
                {trackingData && (
                    <div className="space-y-6">
                        {/* Order Status Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        Order #{trackingData.orderId}
                                    </h3>
                                    <p className="text-gray-600">
                                        Placed on {trackingData.orderDate}
                                    </p>
                                </div>
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getStatusConfig(trackingData.status).bgColor} ${getStatusConfig(trackingData.status).borderColor} border`}>
                                    {getStatusConfig(trackingData.status).icon}
                                    <span className={`font-semibold ${getStatusConfig(trackingData.status).color}`}>
                                        {getStatusConfig(trackingData.status).text}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Progress: Step {trackingData.currentStep} of {trackingData.totalSteps}
                                    </span>
                                    <span className="text-sm text-blue-600">
                                        {Math.round((trackingData.currentStep / trackingData.totalSteps) * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(trackingData.currentStep / trackingData.totalSteps) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Estimated Delivery */}
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                <FaCalendarAlt className="text-blue-600 text-xl" />
                                <div>
                                    <p className="font-medium text-blue-900">Estimated Delivery</p>
                                    <p className="text-blue-700">{trackingData.estimatedDelivery}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Status Timeline</h3>
                            
                            <div className="space-y-6">
                                {trackingData.timeline.map((step, index) => (
                                    <div key={step.id} className="flex gap-4">
                                        {/* Timeline Line */}
                                        <div className="flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                step.completed 
                                                    ? 'bg-green-100 text-green-600' 
                                                    : step.current
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-gray-100 text-gray-400'
                                            }`}>
                                                {step.icon}
                                            </div>
                                            {index < trackingData.timeline.length - 1 && (
                                                <div className={`flex-1 w-0.5 my-2 ${
                                                    step.completed ? 'bg-green-300' : 'bg-gray-200'
                                                }`}></div>
                                            )}
                                        </div>
                                        
                                        {/* Timeline Content */}
                                        <div className="flex-1 pb-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h4 className={`font-medium ${
                                                    step.completed || step.current 
                                                        ? 'text-gray-900' 
                                                        : 'text-gray-500'
                                                }`}>
                                                    {step.status}
                                                </h4>
                                                <div className="text-sm text-gray-500">
                                                    {step.date} • {step.time}
                                                </div>
                                            </div>
                                            {step.current && (
                                                <p className="text-sm text-blue-600 mt-1">
                                                    Current status
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Shipping Info */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaTruck className="text-blue-600" />
                                    Shipping Information
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-600">Shipping Address</p>
                                        <p className="font-medium">{trackingData.shippingAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Contact Number</p>
                                        <p className="font-medium">{trackingData.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Recipient</p>
                                        <p className="font-medium">{trackingData.customerName}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FaBox className="text-green-600" />
                                    Order Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Items</span>
                                        <span className="font-medium">{trackingData.items} items</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Total</span>
                                        <span className="font-medium">₹{trackingData.orderTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tracking Number</span>
                                        <span className="font-medium">{trackingData.trackingNumber}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Carrier</span>
                                        <span className="font-medium">{trackingData.carrier}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">
                                Need Help With Your Order?
                            </h3>
                            <p className="text-blue-700 mb-4">
                                If you have any questions about your order, contact our customer support.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a 
                                    href="mailto:support@example.com"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Email Support
                                </a>
                                <a 
                                    href="tel:+911800123456"
                                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    Call Support
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!trackingData && !loading && !error && (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <FaSearch className="text-gray-300 text-6xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Track Your Order Status
                        </h3>
                        <p className="text-gray-600 mb-4 max-w-md mx-auto">
                            Enter your Order ID above to view real-time updates on your order's journey.
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p>• Check current status and location</p>
                            <p>• View estimated delivery date</p>
                            <p>• Track shipping progress step by step</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderTrackPage;
