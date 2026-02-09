const products = [
  {
    id: 1,
    category: "Running Shoes",
    name: "Pro Runner X1",
    price: "₹8,999",
    image:
      "https://images.unsplash.com/photo-1695459590088-d6fd3cc97cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc25lYWtlcnMlMjBwcm9kdWN0fGVufDF8fHx8MTc2ODUzNTg5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4,
  },
  {
    id: 2,
    category: "Gym Wear",
    name: "Elite Training Set",
    price: "₹4,499",
    image:
      "https://thefittheory.in/cdn/shop/files/womens-gym-wear-front-view-standing01.webp?v=1728390476",
    rating: 5,
  },
  {
    id: 3,
    category: "Yoga Gear",
    name: "Yoga Essentials",
    price: "₹2,999",
    image:
      "https://brand.assets.adidas.com/capi/enIN/Images/what-to-wear-to-your-next-yoga-class-body-image-4_209-874824.jpg",
    rating: 4,
  },
  {
    id: 4,
    category: "Swimming",
    name: "SwimPro Gear",
    price: "₹3,499",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2025/AUGUST/21/7nOKWEnK_6b159ef96f3246f8b4d67322a25c5ab3.jpg",
    rating: 4,
  },
];

export default function BestSellers() {
  return (
    <section className="w-full py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Best <span className="text-orange-500">Sellers</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Top picks loved by athletes
        </p>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {products.map((item) => (
          <div key={item.id} className="group">
            {/* Image Card */}
            <div className="relative h-64 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 duration-900"
              />

              {/* Add to Cart Button */}
              <button
                className="
                  absolute bottom-4 left-1/2 -translate-x-1/2
                  bg-white text-black px-2 py-2 rounded-full text-sm
                  flex items-center gap-2 shadow-md
                  opacity-0 translate-y-6 group-hover:bg-[#ff6a00] group-hover:text-white
                  group-hover:opacity-100 group-hover:translate-y-0
                  transition-all duration-500
                "
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* Info */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 ">{item.category}</p>
              <h3 className="font-semibold text-sm group-hover:text-[#ff6a00] duration-300">{item.name}</h3>

              {/* Rating */}
              <div className="flex text-orange-400 text-xs mt-1">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <p className="font-semibold mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
