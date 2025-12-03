import { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaShoppingBag,
  FaHeart,
  FaHistory,
  FaSignOutAlt,
  FaBell,
  FaShieldAlt,
  FaCreditCard,
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaStar,
  FaCog
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // User data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Downtown, Mumbai - 400001",
    joinedDate: "January 15, 2024",
    avatar: null
  });

  // Orders data
  const orders = [
    {
      id: "ORD789456123",
      date: "Dec 15, 2024",
      status: "delivered",
      items: 3,
      total: 2499,
      itemsList: [
        { name: "Sports Shoes", quantity: 1, price: 1599 },
        { name: "T-Shirt", quantity: 2, price: 900 }
      ]
    },
    {
      id: "ORD456789123",
      date: "Dec 10, 2024",
      status: "shipped",
      items: 2,
      total: 1799,
      itemsList: [
        { name: "Sports Bag", quantity: 1, price: 1299 },
        { name: "Cap", quantity: 1, price: 500 }
      ]
    },
    {
      id: "ORD123456789",
      date: "Dec 5, 2024",
      status: "processing",
      items: 1,
      total: 899,
      itemsList: [
        { name: "Water Bottle", quantity: 1, price: 899 }
      ]
    }
  ];

  // Wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Running Shoes",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      inStock: true
    },
    {
      id: 2,
      name: "Sports Watch",
      price: 4999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w-400",
      inStock: true
    }
  ];

  // Navigation tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "orders", label: "My Orders", icon: <FaShoppingBag /> },
    { id: "wishlist", label: "Wishlist", icon: <FaHeart /> },
    { id: "address", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // In real app, save to API here
  };

  const handleLogout = () => {
    // Handle logout logic
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile, orders, and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
              {/* User Info Card */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {userData.avatar ? (
                      <img src={userData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <FaUser className="text-blue-600 text-3xl sm:text-4xl" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <FaEdit className="text-sm" />
                  </button>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base">{userData.email}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Member since {userData.joinedDate}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    <span className="text-sm sm:text-base font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 mt-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Account Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending Orders</span>
                  <span className="font-semibold text-yellow-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Wishlist Items</span>
                  <span className="font-semibold text-pink-600">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold">₹24,999</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaEdit />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <FaUser className="text-gray-400" />
                          <span>{userData.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaEnvelope className="text-gray-400" />
                        <span>{userData.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <FaPhone className="text-gray-400" />
                          <span>{userData.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span>{userData.joinedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Preferences */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span>SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Orders</h2>
                  <Link to="/track-order" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                    <FaHistory />
                    Track All Orders
                  </Link>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <span className="font-bold text-lg">₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.itemsList.map((item, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        <Link 
                          to={`/order-details/${order.id}`}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-center"
                        >
                          View Details
                        </Link>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Download Invoice
                        </button>
                        {order.status === 'delivered' && (
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Rate Order
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link 
                    to="/orders" 
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FaShoppingBag />
                    View All Orders
                  </Link>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
                  <span className="text-gray-600">{wishlistItems.length} items</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-blue-600">₹{item.price.toLocaleString()}</span>
                        <span className="text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                          Save ₹{(item.originalPrice - item.price).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {wishlistItems.length === 0 && (
                  <div className="text-center py-12">
                    <FaHeart className="text-gray-300 text-6xl mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Save items you like to your wishlist</p>
                    <Link 
                      to="/products" 
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Address */}
                  <div className="border-2 border-blue-300 rounded-lg p-5 bg-blue-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">Primary</span>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                          <FaSignOutAlt />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-blue-600 mt-1" />
                        <div>
                          <p className="font-medium">{userData.name}</p>
                          <p className="text-gray-700">{userData.address}</p>
                          <p className="text-gray-600">Phone: {userData.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Address */}
                  <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Home Address</span>
                      <div className="flex gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                          <FaEdit />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                          <FaSignOutAlt />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-gray-700">456 Park Avenue, Andheri, Mumbai - 400053</p>
                          <p className="text-gray-600">Phone: +91 9876543211</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaShieldAlt className="text-blue-600" />
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input 
                          type="password" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                        />
                      </div>
                      <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Security Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-600">Add an extra layer of security</p>
                        </div>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Login Activity</p>
                          <p className="text-sm text-gray-600">View recent login activity</p>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          View Logs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {['Order updates', 'Promotional offers', 'Price drop alerts', 'New arrivals', 'Account security'].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item === 'Order updates'} />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-5">
                    <h3 className="font-semibold text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {['Order status updates', 'Delivery alerts', 'Promotional notifications'].map((item) => (
                        <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span>{item}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={item === 'Delivery alerts'} />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
