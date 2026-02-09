import { useState } from "react";

const testimonials = [
  {
    id: 1,
    text:
      "Best sports store in Odisha! The quality of products is outstanding and the customer service is exceptional. Got my running shoes delivered the next day.",
    name: "Rajesh Kumar",
    location: "Bhubaneswar, Odisha",
  },
  {
    id: 2,
    text:
      "Amazing experience! Great collection and very fast delivery. Highly recommended for all sports lovers.",
    name: "Anita Sharma",
    location: "Cuttack, Odisha",
  },
  {
    id: 3,
    text:
      "Affordable prices and premium quality products. Customer support was very helpful throughout.",
    name: "Sourav Das",
    location: "Rourkela, Odisha",
  },
];

export default function HappyCustomers() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="w-full py-20 bg-gray-50">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Happy <span className="text-orange-500">Customers</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Hear what our athletes say
        </p>
      </div>

      {/* Testimonial Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 text-center shadow-sm">
        {/* Stars */}
        <div className="flex justify-center mb-4 text-orange-400">
          {"★★★★★"}
        </div>

        {/* Text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          “{testimonials[current].text}”
        </p>

        {/* User */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
            😊
          </div>
          <p className="font-semibold text-sm">
            {testimonials[current].name}
          </p>
          <p className="text-xs text-gray-400">
            {testimonials[current].location}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
        >
          ‹
        </button>

        {/* Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === current ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
        >
          ›
        </button>
      </div>
    </section>
  );
}
