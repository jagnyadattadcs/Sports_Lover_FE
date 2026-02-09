import React, { useEffect, useState } from 'react';
import { PiLightningFill } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { FloatingProducts } from './FloatingProducts';

const Hero = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Product data with image URLs and titles
  const products = [
    {
      id: 1,
      title: "Pro Basketball",
      mainImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1519861531473-920034658307?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1519315901365-1c6bb627b9c7?auto=format&fit=crop&w-400&q=80"
      ]
    },
    {
      id: 2,
      title: "Running Shoes",
      mainImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 3,
      title: "Football Gear",
      mainImage: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1517927033936-8c6b6f16d9e9?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 4,
      title: "Tennis Racket",
      mainImage: "https://images.unsplash.com/photo-1595435934247-5d33b7f92c70?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 5,
      title: "Gym Equipment",
      mainImage: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 6,
      title: "Cycling Helmet",
      mainImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 7,
      title: "Swim Gear",
      mainImage: "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1599458487964-498e8e9e8b8d?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 8,
      title: "Yoga Mat",
      mainImage: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80"
      ]
    },
    {
      id: 9,
      title: "Hiking Backpack",
      mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      slides: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80"
      ]
    }
  ];

  // Auto-slide effect for each product
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming 3 slides per product
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Floating animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className='w-full flex flex-col lg:flex-row gap-4 p-3 md:p-4 lg:p-5'>
      {/* Left Content Column */}
      <div className='w-full lg:w-1/2 p-4 md:p-5 lg:p-6'>
        {/* Premium Sports Collection Badge */}
        <div className='flex items-center justify-center border rounded-full w-full max-w-70 text-sm md:text-base text-[#FF6A00] py-1.5 px-4'>
          <PiLightningFill className='mr-2' />
          Premium Sports Collection
        </div>
        
        {/* Main Heading */}
        <div className='mt-6 md:mt-8 lg:mt-10'>
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>All Sports.</h2>
          <div className='bg-[#FF6A00] w-24 sm:w-28 md:w-32 lg:w-36 h-1 mt-2'></div>
          <div className='relative'>
            <h2 className='text-[#FF6A00] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-right lg:text-right'>One Store.</h2>
            <div className='bg-black w-24 sm:w-28 md:w-32 lg:w-36 h-1 mt-2 ml-auto lg:ml-64'></div>
          </div>
          <p className='text-[#4A5565] mt-4 md:mt-5 text-sm md:text-base lg:text-lg max-w-lg'>Every sport. Every gear. All top brands in one place.</p>
        </div>
        
        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 mt-6 md:mt-8'>
          <button className='py-2.5 px-5 md:py-3 md:px-6 mr-0 sm:mr-2 border border-[#FF6A00] font-semibold bg-[#FF6A00] hover:bg-[#f87416] hover:shadow-lg md:hover:shadow-2xl hover:shadow-[#FF6A00] hover:scale-105 text-white rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 group text-sm md:text-base'>
            Shop Now 
            <FaArrowRightLong className='group-hover:translate-x-1.5 transition-all duration-200' />
          </button>
          <button className='py-2.5 px-5 md:py-3 md:px-6 transition-all duration-200 cursor-pointer hover:text-white hover:bg-[#FF6A00] border border-[#FF6A00] rounded-lg text-[#FF6A00] font-semibold text-sm md:text-base'>
            Explore Categories
          </button>
        </div>
        
        {/* Stats Section */}
        <div className='flex flex-wrap gap-3 md:gap-4 mt-8 md:mt-10'>
          <div className='border-l-4 border-r-4 rounded-2xl border-[#FF6A00] p-2 px-3 md:p-1 md:px-2 flex-1 min-w-30'>
            <h1 className="font-bold text-xl md:text-2xl text-center">50K+</h1>
            <p className='text-gray-500 text-xs md:text-sm text-center'>Products</p>
          </div>
          <div className='border-l-4 border-r-4 rounded-2xl border-[#FF6A00] p-2 px-3 md:p-1 md:px-2 flex-1 min-w-30'>
            <h1 className="font-bold text-xl md:text-2xl text-center">200+</h1>
            <p className='text-gray-500 text-xs md:text-sm text-center'>Brands</p>
          </div>
          <div className='border-l-4 border-r-4 rounded-2xl border-[#FF6A00] p-2 px-3 md:p-1 md:px-2 flex-1 min-w-30'>
            <h1 className="font-bold text-xl md:text-2xl text-center">1M+</h1>
            <p className='text-gray-500 text-xs md:text-sm text-center'>Happy Customers</p>
          </div>
        </div>
      </div>

      {/* All floating Products - Right Column */}
      <div className='hidden lg:block w-full lg:w-1/2 p-4 md:p-5 lg:p-6'>
        <FloatingProducts/>
      </div>
    </div>
  )
}

export default Hero