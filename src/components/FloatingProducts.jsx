import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    images: [
      "https://cricstudioinc.com/cdn/shop/files/DiscovertheBatBehindHardikPandya_sExplosiveStrokes_TheSGHardikPandyaisengineeredforthemoderncricketer.WhysettleforlesswhenyoucanwieldthebestPremiumEnglishWillowformaximumpoweronevery.jpg?v=1757281948",
      "https://m.media-amazon.com/images/I/41QHCaMuWvL._SY879_.jpg",
      "https://cdn.shopify.com/s/files/1/0827/6249/8336/files/Untitled_design_55_a6d392ad-1949-4b38-85ba-c201a983d614.png?v=1745390244"
    ],
    alt: "Cricket Bat",
    brand: "SG",
    tag: "New",
    delay: 0,
    scale: 1.1,
    rotation: -12,
    slideInterval: 3000,
  },
  {
    id: 2,
    images: [
      "https://scssports.in/cdn/shop/files/Tiro_League_TB_Ball_Yellow_FS0377_01_standard.jpg?v=1735712813&width=1200",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w-800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800&auto=format&fit=crop&q=60"
    ],
    alt: "Football",
    brand: "Adidas",
    tag: "Best Seller",
    delay: 0.2,
    scale: 0.9,
    rotation: 8,
    slideInterval: 4500,
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NzAxNTcxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60"
    ],
    alt: "Running Shoes",
    brand: "Nike",
    tag: "Trending",
    delay: 0.4,
    scale: 1,
    rotation: -6,
    slideInterval: 3800,
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1770155590942-49d858bc5401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBqZXJzZXklMjBhdGhsZXRpY3xlbnwxfHx8fDE3NzAxOTY5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60"
    ],
    alt: "Sports Jersey",
    brand: "Puma",
    tag: "New",
    delay: 0.6,
    scale: 0.95,
    rotation: 10,
    slideInterval: 4200,
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1608947325421-b13e6956c7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdW1iYmVsbHMlMjBneW0lMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzcwMTE3MzY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=60"
    ],
    alt: "Dumbbells",
    brand: "Reebok",
    tag: "Hot",
    delay: 0.8,
    scale: 0.85,
    rotation: -10,
    slideInterval: 3500,
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1704830081428-2db85de99d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwc3BvcnRzfGVufDF8fHx8MTc3MDE5Njk3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519861531473-920034658307?w=800&auto=format&fit=crop&q=60"
    ],
    alt: "Basketball",
    brand: "Yonex",
    tag: "Popular",
    delay: 1,
    scale: 0.8,
    rotation: 12,
    slideInterval: 5000,
  },
];

export function FloatingProducts() {
  const [currentSlideIndices, setCurrentSlideIndices] = useState(() => {
    const indices = {};
    products.forEach(product => {
      indices[product.id] = 0;
    });
    return indices;
  });

  const intervalRefs = useRef({});

  // Set up individual intervals for each product
  useEffect(() => {
    products.forEach(product => {
      // Clear existing interval if any
      if (intervalRefs.current[product.id]) {
        clearInterval(intervalRefs.current[product.id]);
      }

      // Set new interval with unique timing
      intervalRefs.current[product.id] = setInterval(() => {
        setCurrentSlideIndices(prev => ({
          ...prev,
          [product.id]: (prev[product.id] + 1) % product.images.length
        }));
      }, product.slideInterval + Math.random() * 1000); // Add slight random variation
    });

    // Cleanup all intervals on unmount
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  // Handle manual slide change
  const handleSlideChange = (productId, slideIndex) => {
    setCurrentSlideIndices(prev => ({
      ...prev,
      [productId]: slideIndex
    }));
    
    // Reset the interval for this product after manual change
    const product = products.find(p => p.id === productId);
    if (product && intervalRefs.current[productId]) {
      clearInterval(intervalRefs.current[productId]);
      intervalRefs.current[productId] = setInterval(() => {
        setCurrentSlideIndices(prev => ({
          ...prev,
          [productId]: (prev[productId] + 1) % product.images.length
        }));
      }, product.slideInterval);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative h-140"
    >
      {/* Floating Product Grid */}
      <div className="relative w-full h-full">
        {products.map((product, index) => {
          const positions = [
            { top: '5%', left: '18%' },
            { top: '5%', right: '10%' },
            { top: '35%', left: '5%' },
            { top: '40%', right: '20%' },
            { top: '60%', left: '25%' },
            { top: '65%', right: '2%' },
          ];

          return (
            <motion.div
              key={product.id}
              className="absolute"
              style={positions[index]}
              initial={{ opacity: 0, y: 50, rotateZ: 0 }}
              animate={{ 
                opacity: 1,
                y: 0,
                rotateZ: product.rotation,
              }}
              transition={{ 
                delay: product.delay, 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [product.rotation, product.rotation + 3, product.rotation],
                }}
                transition={{
                  duration: 3 + product.delay,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative group"
              >
                {/* Product Image Container */}
                <div 
                  className="relative bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-xl hover:shadow-2xl hover:border-[#FF6A00]/30 transition-all duration-300"
                  style={{
                    width: `${120 + (product.scale * 50)}px`,
                    height: `${120 + (product.scale * 50)}px`,
                  }}
                >
                  {/* Sliding Images Container */}
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                      className="flex h-full"
                      animate={{
                        x: `-${currentSlideIndices[product.id] * 100}%`
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.5
                      }}
                    >
                      {product.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="w-full h-full shrink-0"
                        >
                          <img 
                            src={image} 
                            alt={`${product.alt} ${imgIndex + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </motion.div>

                    {/* Image Navigation Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {product.images.map((_, dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSlideChange(product.id, dotIndex);
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            dotIndex === currentSlideIndices[product.id]
                              ? 'bg-[#FF6A00] w-4'
                              : 'bg-white/70 hover:bg-white'
                          }`}
                          aria-label={`Go to slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Orange Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#FF6A00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Tag */}
                  <div className="absolute top-3 right-3 bg-[#FF6A00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                    {product.tag}
                  </div>

                  {/* Orange Corner Accent */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#FF6A00]/10 transform -skew-x-12" />
                </div>

                {/* Product Name Badge */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-lg border border-gray-100 z-10"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: product.delay + 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-black uppercase tracking-wide">
                      {product.brand}
                    </span>
                    <div className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full" />
                  </div>
                  {/* Orange underline */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-[#FF6A00]" />
                </motion.div>

                {/* Shadow */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-gray-300/50 rounded-full blur-md"
                  animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 3 + product.delay,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}