const offers = [
  {
    id: 1,
    discount: "50% OFF",
    text: "On all running shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
  },
  {
    id: 2,
    discount: "30% OFF",
    text: "Complete your workout setup",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600",
  },
  {
    id: 3,
    discount: "70% OFF",
    text: "Premium activewear collection",
    image: null,
  },
];

export default function BestOffers() {
  return (
    <section className="w-full py-14 bg-white">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Best <span className="text-orange-500">Offers</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Limited time deals you can't miss
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {offers.map((item) => (
          <div
            key={item.id}
            className="relative h-90 rounded-2xl overflow-hidden bg-gray-300 group"
          >
            {/* Background Image */}
            {item.image && (
              <img
                src={item.image}
                alt="offer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 duration-500"
              />
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Diagonal Orange Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 clip-triangle duration-300 -translate-y-30 group-hover:translate-y-0" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-3xl font-bold text-orange-500">
                {item.discount}
              </h3>
              <p className="text-sm mb-4">{item.text}</p>
              <button className="w-fit px-4 py-2 bg-orange-500 text-white text-sm rounded-full hover:bg-orange-600 transition">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
