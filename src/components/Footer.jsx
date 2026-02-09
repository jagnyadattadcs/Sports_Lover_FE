import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 pt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              SPORTS<span className="text-orange-500">LOVERS</span>
            </h2>
            <p className="text-sm mt-4 leading-relaxed">
              Odisha's trusted sports store, delivering premium athletic gear
              to champions across the state.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition cursor-pointer"
                >
                  <Icon size={16} className="text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Men", "Women", "Kids", "New Arrivals", "Best Sellers"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-orange-500 transition cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                "Contact Us",
                "Shipping Policy",
                "Returns & Exchanges",
                "FAQ",
                "Track Order",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-orange-500 transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Stay Updated
            </h3>
            <p className="text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>

            <div className="flex items-center bg-[#1a1a1a] rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent border border-[#ff6a00] rounded-bl-full rounded-tl-full px-4 py-3 text-sm w-full outline-none"
              />
              <button className="bg-[#ff6a00] border border-[#ff6a00] cursor-pointer rounded-tr-full rounded-br-full px-6 py-3 text-sm text-white hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 Sports Lovers. All rights reserved.</p>

          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map(
              (item) => (
                <span
                  key={item}
                  className="hover:text-orange-500 transition cursor-pointer"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
