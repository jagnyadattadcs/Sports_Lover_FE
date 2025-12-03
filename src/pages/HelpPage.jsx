import { useState } from "react";
import { FaSearch, FaQuestionCircle, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaHeadset, FaShippingFast, FaUndo, FaCreditCard, FaShieldAlt } from "react-icons/fa";
import { MdSupportAgent, MdPayment, MdLocalShipping, MdAccountCircle } from "react-icons/md";
import { HiOutlineChat, HiOutlineDocumentText } from "react-icons/hi";

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedFaq, setExpandedFaq] = useState(null);

    // FAQ Categories
    const categories = [
        { id: "all", name: "All Topics", icon: <FaQuestionCircle /> },
        { id: "shipping", name: "Shipping & Delivery", icon: <MdLocalShipping /> },
        { id: "returns", name: "Returns & Refunds", icon: <FaUndo /> },
        { id: "payment", name: "Payments", icon: <MdPayment /> },
        { id: "account", name: "Account & Orders", icon: <MdAccountCircle /> },
        { id: "support", name: "Support", icon: <MdSupportAgent /> }
    ];

    // FAQ Data
    const faqs = [
        {
            id: 1,
            question: "How long does shipping take?",
            answer: "Standard shipping takes 5-7 business days. Express shipping (available at checkout) delivers within 2-3 business days. You'll receive tracking information once your order ships.",
            category: "shipping"
        },
        {
            id: 2,
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for unused items in original packaging with tags attached. Returns are free for defective or incorrect items. Refunds are processed within 7-10 business days after we receive the return.",
            category: "returns"
        },
        {
            id: 3,
            question: "What payment methods do you accept?",
            answer: "Currently we accept Cash on Delivery (COD) only. Other payment methods including credit/debit cards, UPI, and net banking will be available soon.",
            category: "payment"
        },
        {
            id: 4,
            question: "How can I track my order?",
            answer: "You can track your order using the Order Track page. Enter your Order ID (found in your confirmation email) to view real-time updates on your order's journey.",
            category: "account"
        },
        {
            id: 5,
            question: "How do I contact customer support?",
            answer: "You can contact us through email at support@example.com, call us at 1800-123-456, or use the WhatsApp chat button on this page. Our support team is available 24/7.",
            category: "support"
        },
        {
            id: 6,
            question: "Do you offer international shipping?",
            answer: "Currently we only ship within India. We're working on expanding our shipping options to other countries in the near future.",
            category: "shipping"
        },
        {
            id: 7,
            question: "Can I modify or cancel my order?",
            answer: "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact support immediately if you need assistance.",
            category: "account"
        },
        {
            id: 8,
            question: "Is my payment information secure?",
            answer: "Yes, we use SSL encryption to protect all payment information. We don't store your payment details on our servers. All transactions are processed securely.",
            category: "payment"
        },
        {
            id: 9,
            question: "What should I do if I receive a damaged item?",
            answer: "If you receive a damaged item, please contact us within 48 hours of delivery. Send photos of the damaged item and packaging to support@example.com. We'll arrange a replacement or refund.",
            category: "returns"
        },
        {
            id: 10,
            question: "How do I reset my password?",
            answer: "Click on 'Forgot Password' on the login page. Enter your registered email address and we'll send you a password reset link. The link expires in 24 hours.",
            category: "account"
        }
    ];

    // Contact Methods
    const contactMethods = [
        {
            id: 1,
            title: "24/7 Support",
            description: "Round-the-clock customer support",
            icon: <FaHeadset className="text-3xl" />,
            details: "Available all days",
            action: "Call Now",
            link: "tel:+919778716214",
            color: "bg-blue-100 text-blue-600"
        },
        {
            id: 2,
            title: "Email Support",
            description: "Get help via email",
            icon: <FaEnvelope className="text-3xl" />,
            details: "Response within 24 hours",
            action: "Send Email",
            link: "mailto:support@example.com",
            color: "bg-green-100 text-green-600"
        },
        {
            id: 3,
            title: "WhatsApp Chat",
            description: "Quick chat support",
            icon: <FaWhatsapp className="text-3xl" />,
            details: "Instant responses",
            action: "Start Chat",
            link: "https://wa.me/919778716214",
            color: "bg-green-100 text-green-600"
        }
    ];

    // Popular Topics
    const popularTopics = [
        { id: 1, title: "Track Your Order", link: "/track-order", icon: <FaShippingFast /> },
        { id: 2, title: "Return an Item", link: "/returns", icon: <FaUndo /> },
        { id: 3, title: "Payment Options", link: "/payment", icon: <FaCreditCard /> },
        { id: 4, title: "Privacy & Security", link: "/privacy", icon: <FaShieldAlt /> }
    ];

    // Filter FAQs based on search and category
    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch = searchQuery === "" || 
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFaq = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        How can we help you?
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Find answers to common questions or get in touch with our support team
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-10">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for help topics, questions..."
                                className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg"
                            />
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {searchQuery && (
                            <p className="text-sm text-gray-500 mt-2 text-center">
                                Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                {/* Contact Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {contactMethods.map((method) => (
                        <div key={method.id} className="bg-white rounded-xl shadow-sm p-6 text-center">
                            <div className={`inline-flex p-4 rounded-full ${method.color} mb-4`}>
                                {method.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {method.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{method.description}</p>
                            <p className="text-sm text-gray-500 mb-4">{method.details}</p>
                            <a
                                href={method.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                {method.action}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                                    activeCategory === category.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                }`}
                            >
                                {category.icon}
                                <span>{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Frequently Asked Questions
                        </h2>
                        <span className="text-sm text-gray-500">
                            {filteredFaqs.length} questions
                        </span>
                    </div>
                    
                    <div className="space-y-4">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq) => (
                                <div key={faq.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                                <FaQuestionCircle />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900 text-lg">
                                                    {faq.question}
                                                </h3>
                                                <span className="text-sm text-gray-500 mt-1">
                                                    {categories.find(c => c.id === faq.category)?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-gray-400">
                                            {expandedFaq === faq.id ? '−' : '+'}
                                        </div>
                                    </button>
                                    
                                    {expandedFaq === faq.id && (
                                        <div className="px-5 pb-5 pt-2 border-t border-gray-100">
                                            <div className="pl-12">
                                                <p className="text-gray-700">{faq.answer}</p>
                                                <div className="mt-4 flex gap-3">
                                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                                        Was this helpful?
                                                    </button>
                                                    <button className="text-sm text-blue-600 hover:text-blue-700">
                                                        Still need help?
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                <FaSearch className="text-gray-300 text-5xl mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    No results found
                                </h3>
                                <p className="text-gray-600">
                                    Try searching with different keywords or browse the categories above.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Popular Topics */}
                <div className="mb-12">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Popular Help Topics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {popularTopics.map((topic) => (
                            <a
                                key={topic.id}
                                href={topic.link}
                                className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        {topic.icon}
                                    </div>
                                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {topic.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Support Hours & Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                                <FaClock className="text-blue-600 text-xl" />
                                <h3 className="text-lg font-semibold text-blue-900">
                                    Support Hours
                                </h3>
                            </div>
                            <div className="space-y-1">
                                <p className="text-blue-800">24/7 Customer Support</p>
                                <p className="text-blue-700">Email response within 24 hours</p>
                                <p className="text-blue-700">Live chat available 9 AM - 9 PM IST</p>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <div className="flex items-center gap-3 justify-center mb-3">
                                <HiOutlineChat className="text-blue-600 text-xl" />
                                <h3 className="text-lg font-semibold text-blue-900">
                                    Quick Help
                                </h3>
                            </div>
                            <a
                                href="mailto:support@example.com"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>

                {/* Additional Resources */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Additional Resources
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <HiOutlineDocumentText className="text-2xl text-blue-600" />
                                <h3 className="font-semibold text-gray-900">Help Center</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Browse our comprehensive help articles and guides.
                            </p>
                            <a href="/help-center" className="text-blue-600 hover:text-blue-700 font-medium">
                                Visit Help Center →
                            </a>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <FaPhone className="text-2xl text-green-600" />
                                <h3 className="font-semibold text-gray-900">Phone Support</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Speak directly with our support agents.
                            </p>
                            <div className="space-y-1">
                                <a href="tel:+911800123456" className="block text-blue-600 hover:text-blue-700">
                                    Toll Free: 1800-123-456
                                </a>
                                <a href="tel:+919876543210" className="block text-blue-600 hover:text-blue-700">
                                    Mobile: +91 9876543210
                                </a>
                            </div>
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <FaEnvelope className="text-2xl text-purple-600" />
                                <h3 className="font-semibold text-gray-900">Email Support</h3>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Send us an email for detailed inquiries.
                            </p>
                            <div className="space-y-1">
                                <a href="mailto:support@example.com" className="block text-blue-600 hover:text-blue-700">
                                    support@example.com
                                </a>
                                <a href="mailto:help@example.com" className="block text-blue-600 hover:text-blue-700">
                                    help@example.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
