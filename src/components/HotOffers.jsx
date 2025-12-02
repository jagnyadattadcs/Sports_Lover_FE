import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import { useState, useEffect } from "react";

const offers = [
    {
        title: "Running Shoes",
        description: "Get the best running shoes at half the price. Limited time offer!",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800",
        expiry: "Expiry: Today"
    },
    {
        title: "Football Gear",
        description: "Premium football equipment with 40% discount. Don't miss out!",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800",
        expiry: "Expiry: 2 Days"
    },
    {
        title: "Fitness Equipment",
        description: "Complete your home gym with our exclusive fitness bundle offers.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
        expiry: "Expiry: 5 Days"
    }
];

const HotOffers = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offers.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % offers.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative h-90 sm:h-100 lg:h-130 flex flex-col mx-4 md:mx-6 lg:mx-10 py-2 md:py-6">
            <div className="flex justify-between mb-4">
                <h3 className="text-lg sm:text-2xl font-semibold">Hot Deals & Offers</h3>
                <div className="flex gap-4 items-center">
                    <TfiArrowCircleLeft 
                        className="text-3xl cursor-pointer hover:bg-[#0A66FF] hover:text-white rounded-full hover:border hover:border-[#0A66FF] transition-colors duration-200"
                        onClick={prevSlide}
                    />
                    <TfiArrowCircleRight 
                        className="text-3xl cursor-pointer hover:bg-[#0A66FF] hover:text-white rounded-full hover:border hover:border-[#0A66FF] transition-colors duration-200"
                        onClick={nextSlide}
                    />
                </div>
            </div>
            <div className="w-full h-full rounded-2xl overflow-hidden">
                <div className="relative w-full h-75 sm:h-75 lg:h-105 overflow-hidden rounded-2xl">
                    {/* Slides Container */}
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {offers.map((offer, index) => (
                            <div 
                                key={index} 
                                className="w-full h-75 sm:h-75 lg:h-105 shrink-0 relative"
                            >
                                <img 
                                    src={offer.image} 
                                    alt={offer.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute flex flex-col top-10 md:top-20 lg:left-5 p-4 sm:p-6 gap-3">
                                    <h3 className="text-white text-2xl md:text-3xl font-semibold">{offer.title}</h3>
                                    <p className="text-white bg-gray-500/80 p-2 rounded-sm max-w-md text-sm sm:text-base">
                                        {offer.description}
                                    </p>
                                    <p className="text-white sm:text-xl font-medium">{offer.expiry}</p>
                                </div>
                                <button>
                                    <span className="absolute bottom-8 lg:bottom-10 left-5 lg:left-10 text-[#0A66FF] bg-white hover:text-white cursor-pointer px-4 py-2 rounded-md text-sm sm:text-base hover:bg-[#3482ff] transition-colors duration-200">
                                        Shop Now
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {/* Indicator Dots */}
                    <div className="absolute bottom-5 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {offers.map((_, index) => (
                            <button 
                                key={index}
                                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-300 ${
                                    index === currentSlide 
                                        ? "w-8 sm:w-10 bg-white" 
                                        : "bg-gray-400 hover:bg-gray-300"
                                }`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotOffers;
