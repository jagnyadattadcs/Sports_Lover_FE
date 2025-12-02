import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Running",
    total: 156,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600"
  },
  {
    name: "Football",
    total: 89,
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600"
  },
  {
    name: "Gym & Fitness",
    total: 234,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600"
  },
  {
    name: "Yoga",
    total: 67,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600"
  },
  {
    name: "Cycling",
    total: 112,
    image: "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600"
  },
  {
    name: "Swimming",
    total: 78,
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600"
  },
  {
    name: "Basketball",
    total: 54,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600"
  },
  {
    name: "Tennis",
    total: 43,
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600"
  },
]

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full bg-[#E7EEFB] grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 sm:p-6 lg:p-6">
        {/* Left Content */}
        <div className="pl-4 sm:pl-6 lg:pl-8 pt-4 sm:pt-6 lg:pt-8">
          <p className="w-32 sm:w-36 lg:w-44 flex justify-center items-center rounded-lg text-xs sm:text-sm lg:text-base text-white font-semibold mb-3 sm:mb-4 p-1 sm:p-1 bg-[#0A66FF]">
            New Collection 2025
          </p>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-5 leading-tight">
            Gear Up. Play Hard.
          </h3>
          <p className="mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
            Top brands. Best prices. Fast delivery. Everything you need to unleash your athletic potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <Link to="/products" className="w-full sm:w-40 flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 border rounded-md p-2 sm:p-2 bg-[#0A66FF] hover:bg-[#3482ff] text-white cursor-pointer transition-colors duration-200 text-sm sm:text-base">
              Shop Now <FaArrowRight className="text-xs sm:text-sm" />
            </Link>
            <button className="w-full sm:w-40 border border-gray-200 rounded-md p-2 sm:p-2 bg-white hover:bg-[#0A66FF] text-black hover:text-white cursor-pointer transition-colors duration-200 text-sm sm:text-base">
              Explore Categories
            </button>
          </div>
          <div className="flex gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-7 lg:mt-8">
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">500+</p>
              <span className="text-sm sm:text-base text-gray-600">Products</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">50+</p>
              <span className="text-sm sm:text-base text-gray-600">Brands</span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold">10k+</p>
              <span className="text-sm sm:text-base text-gray-600">Happy Customers</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Hero Image */}
        <div className="relative mt-6 lg:mt-0">
          <img 
            src="/hero-image.jpeg" 
            alt="Hero Image" 
            className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 rounded-2xl object-cover"
          />
          <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 bg-white p-3 sm:p-4 flex items-center gap-3 sm:gap-4 rounded-lg shadow-lg">
            <div className="p-2 bg-gray-200 rounded-full text-sm sm:text-base">
              🎯
            </div>
            <div>
              <p className="font-semibold text-sm sm:text-base lg:text-lg">50% OFF</p>
              <span className="text-xs sm:text-sm">First Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="w-full bg-white px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-6 flex flex-col items-start gap-3 sm:gap-4 lg:gap-6 border-b border-gray-300">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Shop by Category</h2>
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-3 sm:gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="relative w-full h-20 sm:h-24 lg:h-28 lg:w-36 xl:w-40 flex items-center gap-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute bottom-1 left-2 sm:left-3 lg:left-4 p-1 sm:p-2 rounded-md bg-black/30 flex flex-col gap-0.5 sm:gap-1">
                  <p className="font-semibold text-center text-white text-xs sm:text-sm lg:text-base">
                    {category.name}
                  </p>
                  <span className="text-white text-xs sm:text-sm">
                    {category.total} Products
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
