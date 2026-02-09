import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    title: "Running",
    image: "https://images.unsplash.com/photo-1594736797933-d1551b1b7d11?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Gym",
    image: "https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Yoga",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Swimming",
    image: "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 5,
    title: "Cycling",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 6,
    title: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 7,
    title: "Football",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    title: "Tennis",
    image: "https://images.unsplash.com/photo-1595435934247-5d33b7f92c70?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    title: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=60"
  },
  {
    id: 10,
    title: "Boxing",
    image: "https://images.unsplash.com/photo-1544919982-b61976a0d7ed?w=600&auto=format&fit=crop&q=60"
  },
];

const ShopByCategory = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  // Check if arrows should be shown based on scroll position
  const checkArrows = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Handle mouse down for drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.cursor = 'grabbing';
    sliderRef.current.style.userSelect = 'none';
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.removeProperty('user-select');
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      sliderRef.current.style.cursor = 'grab';
      sliderRef.current.style.removeProperty('user-select');
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    sliderRef.current.scrollLeft = scrollLeft - walk;
    checkArrows();
  };

  // Scroll to left
  const scrollLeftHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      setTimeout(checkArrows, 300);
    }
  };

  // Scroll to right
  const scrollRightHandler = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      setTimeout(checkArrows, 300);
    }
  };

  // Initialize and add event listeners
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    checkArrows();

    slider.addEventListener('scroll', checkArrows);
    window.addEventListener('resize', checkArrows);

    return () => {
      slider.removeEventListener('scroll', checkArrows);
      window.removeEventListener('resize', checkArrows);
    };
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center bg-[#fffaf5] p-4 md:p-8'>
      {/* Header */}
      <div className='w-full flex justify-center items-center mb-4 md:mb-6'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
          Shop By <span className='text-[#FF6A00]'>Category</span>
        </h2>
      </div> 

      {/* Slider Container */}
      <div className='relative w-full group'>
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeftHandler}
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-r-lg shadow-lg p-3 md:p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-xl hover:scale-110'
            aria-label='Scroll left'
          >
            <FaChevronLeft className='text-[#FF6A00] w-4 h-4 md:w-5 md:h-5' />
          </button>
        )}

        {/* Categories Slider */}
        <div
          ref={sliderRef}
          className='flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2 cursor-grab active:cursor-grabbing'
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={checkArrows}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {categories.map((item) => (
            <div
              key={item.id}
              className={`shrink-0 relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                activeCategory === item.id 
                  ? '' 
                  : 'hover:ring-2 hover:ring-[#FF6A00]'
              }`}
              style={{
                width: '280px',
                height: '280px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
              onClick={() => setActiveCategory(item.id === activeCategory ? null : item.id)}
              onMouseEnter={() => !isDragging && setActiveCategory(item.id)}
              onMouseLeave={() => !isDragging && setActiveCategory(null)}
            >
              {/* Category Title */}
              <div className='absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 via-black/50 to-transparent'>
                <h3 className='text-white text-lg md:text-xl font-bold'>{item.title}</h3>
                
                {/* Orange Bar */}
                <div className={`mt-2 h-1 w-12 rounded-full bg-[#FF6A00] transition-all duration-300 ${
                  activeCategory === item.id ? 'w-24' : 'group-hover:w-20'
                }`} />
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-[#FF6A00]/20 transition-opacity duration-300 ${
                activeCategory === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />

              {/* Orange Corner */}
              <div className='absolute top-0 left-0 w-8 h-8'>
                <div className='absolute top-0 left-0 w-full h-full bg-[#FF6A00] transform -skew-y-12 opacity-80' />
              </div>

              {/* Shop Now Button (Visible on Hover) */}
              <button
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6A00] text-white px-4 py-2 rounded-full font-semibold shadow-lg transition-all duration-300 ${
                  activeCategory === item.id 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Shop ${item.title}`);
                }}
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRightHandler}
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-l-lg shadow-lg p-3 md:p-4 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-xl hover:scale-110'
            aria-label='Scroll right'
          >
            <FaChevronRight className='text-[#FF6A00] w-4 h-4 md:w-5 md:h-5' />
          </button>
        )}

        {/* Scroll Indicator */}
        <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5'>
          <div className='w-8 h-1 bg-gray-300 rounded-full overflow-hidden'>
            <div 
              className='h-full bg-[#FF6A00] transition-all duration-300'
              style={{
                width: sliderRef.current 
                  ? `${(sliderRef.current.scrollLeft / (sliderRef.current.scrollWidth - sliderRef.current.clientWidth)) * 100}%`
                  : '0%'
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className='md:hidden flex justify-center gap-4 mt-4'>
        <button
          onClick={scrollLeftHandler}
          disabled={!showLeftArrow}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
            showLeftArrow 
              ? 'bg-[#FF6A00] text-white hover:bg-[#e55a00] hover:scale-110' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label='Scroll left'
        >
          <FaChevronLeft className='w-4 h-4' />
        </button>
        
        <button
          onClick={scrollRightHandler}
          disabled={!showRightArrow}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
            showRightArrow 
              ? 'bg-[#FF6A00] text-white hover:bg-[#e55a00] hover:scale-110' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label='Scroll right'
        >
          <FaChevronRight className='w-4 h-4' />
        </button>
      </div>

      {/* Add this to your global CSS or in a style tag */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ShopByCategory;