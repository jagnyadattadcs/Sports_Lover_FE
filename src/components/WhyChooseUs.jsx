import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Free Home Delivery",
    desc: "Fast and free shipping across Odisha",
    icon: <Truck size={22} />,
  },
  {
    id: 2,
    title: "Secure Payment",
    desc: "100% secure transactions guaranteed",
    icon: <ShieldCheck size={22} />,
  },
  {
    id: 3,
    title: "Easy Returns",
    desc: "30-day hassle-free return policy",
    icon: <RotateCcw size={22} />,
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "Always here to help you",
    icon: <Headphones size={22} />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-[#fffaf5]">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Why Choose <span className="text-orange-500">Us</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Your trusted partner in sports excellence
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {features.map((item) => (
          <div
            key={item.id}
            className="
              group bg-white rounded-2xl p-6
              transition-all duration-300
              hover:bg-orange-500
            "
          >
            {/* Icon */}
            <div
              className="
                w-12 h-12 rounded-xl flex items-center justify-center
                bg-orange-100 text-orange-500
                mb-5
                transition-all duration-300
                group-hover:bg-white group-hover:text-orange-500
              "
            >
              {item.icon}
            </div>

            {/* Text */}
            <h3
              className="
                font-semibold text-sm mb-2
                transition-colors duration-300
                group-hover:text-white
              "
            >
              {item.title}
            </h3>

            <p
              className="
                text-sm text-gray-500
                transition-colors duration-300
                group-hover:text-orange-100
              "
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
