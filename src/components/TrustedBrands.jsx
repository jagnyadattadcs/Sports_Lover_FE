const brands = [
  "NIKE",
  "ADIDAS",
  "PUMA",
  "REEBOK",
  "NEW BAL.",
];

export default function TrustedBrands() {
  return (
    <section className="w-full py-16 bg-[#fffaf5] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Trusted <span className="text-orange-500">Brands</span>
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          We partner with the world's best sports brands
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-20 marquee">
          {/* duplicate list for infinite scroll */}
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="text-gray-400 text-lg font-medium tracking-widest whitespace-nowrap"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
