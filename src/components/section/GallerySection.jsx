'use client'

import React, { useState } from 'react';
import { Play, Sparkles, Eye, Heart, ShoppingBag } from 'lucide-react';

const GallerySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      size: 'large',
      category: 'CUSTOM ACRYLIC',
      title: 'ACRYLIC CUTOUT',
      description: 'Precision-cut glossy shapes',
      bgColor: 'from-red-50 to-rose-100',
      accentColor: 'text-red-600',
      borderColor: 'border-red-200',
      image: 'custom-frame.jpeg'
    },
    {
      id: 2,
      type: 'video',
      size: 'medium',
      category: 'DESK COLLECTION',
      title: 'DESK PHOTO',
      description: 'Perfect for workspaces',
      bgColor: 'from-blue-50 to-cyan-100',
      accentColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      videoUrl: 'acrylic-photo.mp4'
    },
    {
      id: 3,
      type: 'image',
      size: 'medium',
      category: 'FRIDGE MAGNETS',
      title: 'MINI MEMORIES',
      description: 'Tiny but impactful',
      bgColor: 'from-green-50 to-emerald-100',
      accentColor: 'text-green-600',
      borderColor: 'border-green-200',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'
    },
    {
      id: 4,
      type: 'video',
      size: 'small',
      category: 'KEYCHAINS',
      title: 'CARRY MEMORIES',
      description: 'Portable photo art',
      bgColor: 'from-amber-50 to-orange-100',
      accentColor: 'text-amber-600',
      borderColor: 'border-amber-200',
      videoUrl: 'acrylic-keychains.mp4'
    },
    {
      id: 5,
      type: 'image',
      size: 'medium',
      category: 'WALL ART',
      title: 'ACRYLIC CLOCK',
      description: 'Functional wall decor',
      bgColor: 'from-purple-50 to-violet-100',
      accentColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'
    },
    {
      id: 6,
      type: 'video',
      size: 'large',
      category: 'PREMIUM FRAMES',
      title: 'CRYSTAL CLEAR',
      description: 'Ultra-transparent HD quality',
      bgColor: 'from-pink-50 to-rose-100',
      accentColor: 'text-pink-600',
      borderColor: 'border-pink-200',
      videoUrl: 'clear-acrylic-photo.mp4'
    },
    {
      id: 7,
      type: 'image',
      size: 'small',
      category: 'MONOGRAM',
      title: 'STYLISH INITIALS',
      description: 'Personalized elegance',
      bgColor: 'from-teal-50 to-cyan-100',
      accentColor: 'text-teal-600',
      borderColor: 'border-teal-200',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80'
    },
    {
      id: 8,
      type: 'video',
      size: 'medium',
      category: 'NAMEPLATES',
      title: 'MODERN ENTRANCE',
      description: 'Premium door nameplates',
      bgColor: 'from-indigo-50 to-blue-100',
      accentColor: 'text-indigo-600',
      borderColor: 'border-indigo-200',
      videoUrl: 'acrylic-nameplate.mp4'
    },
    {
      id: 9,
      type: 'image',
      size: 'small',
      category: 'COLLAGE',
      title: 'MULTI-PHOTO',
      description: 'Many moments together',
      bgColor: 'from-yellow-50 to-amber-100',
      accentColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&q=80'
    },
    {
      id: 10,
      type: 'video',
      size: 'medium',
      category: 'FRAMED SERIES',
      title: 'CLASSIC FRAMING',
      description: 'Acrylic meets tradition',
      bgColor: 'from-slate-50 to-gray-100',
      accentColor: 'text-slate-600',
      borderColor: 'border-slate-200',
      videoUrl: 'framed-acrylic-photo.mp4'
    }
  ];

  // Desktop grid classes (unchanged)
  const getSizeClasses = (size) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div id='GallerySection' className="bg-linear-to-br from-gray-50 via-white to-amber-50/20 py-12 md:py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">

      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 md:w-[500px] h-80 md:h-[500px] bg-linear-to-br from-rose-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 md:w-[600px] h-96 md:h-[600px] bg-linear-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Enhanced Header Section - Mobile Optimized */}
        <div className="text-center mb-10 md:mb-16 space-y-4 md:space-y-6">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 md:gap-2.5 bg-linear-to-r from-amber-100 via-orange-50 to-amber-100 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-amber-300/50 shadow-lg backdrop-blur-sm">
            <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-amber-600 animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-amber-900 tracking-widest uppercase">Gallery Collection</span>
          </div>

          {/* Main Heading - Responsive text size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-4">
            Acrylic Photo <span className="bg-linear-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">Gallery</span>
          </h2>

          <p className="text-base md:text-xl lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed px-4">
            Explore our stunning collection of modern acrylic frames
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-2 md:gap-3 pt-2 md:pt-4">
            <div className="h-1 md:h-1.5 w-16 md:w-24 bg-linear-to-r from-amber-600 to-orange-500 rounded-full"></div>
            <div className="h-1.5 md:h-2 w-1.5 md:w-2 bg-amber-600 rounded-full animate-pulse"></div>
            <div className="h-1.5 md:h-2 w-1.5 md:w-2 bg-orange-500 rounded-full animate-pulse delay-300"></div>
            <div className="h-1.5 md:h-2 w-1.5 md:w-2 bg-rose-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Enhanced Gallery Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 md:auto-rows-[220px] mb-8 md:mb-12">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`${getSizeClasses(item.size)} group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl shadow-lg border-2 ${item.borderColor} bg-white backdrop-blur-sm min-h-[280px] sm:min-h-[300px] md:min-h-0`}
            >
              {/* Image or Video Content */}
              {item.type === 'image' ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <video
                  src={`/${item.videoUrl}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={`/${item.videoUrl}`} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Floating Action Buttons - Always visible on mobile, hover on desktop */}
              {/* <div className={`absolute top-3 md:top-4 right-3 md:right-4 flex gap-2 z-30 transition-all duration-300 ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-100 md:opacity-0 translate-y-0 md:-translate-y-4'}`}>
                <button className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/btn">
                  <Heart className="w-4 md:w-5 h-4 md:h-5 text-gray-700 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-colors" />
                </button>
                <button className="w-9 md:w-10 h-9 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/btn">
                  <Eye className="w-4 md:w-5 h-4 md:h-5 text-gray-700 group-hover/btn:text-blue-500 transition-colors" />
                </button>
              </div> */}

              {/* Enhanced Content Section - Mobile optimized padding */}
              <div className="absolute inset-0 p-5 md:p-6 lg:p-8 flex flex-col justify-end z-20 bg-linear-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500">

                {/* Category Badge */}
                <div className="mb-2 md:mb-3 flex items-center gap-2">
                  <div className="h-0.5 md:h-1 w-8 md:w-10 bg-linear-to-r from-amber-400 to-orange-400 rounded-full"></div>
                  <span className={`text-[10px] md:text-xs font-black tracking-widest uppercase ${item.accentColor} bg-white/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full backdrop-blur-sm shadow-lg`}>
                    {item.category}
                  </span>
                </div>

                {/* Title - Responsive text size */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-1 md:mb-2 drop-shadow-lg leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-white/90 text-xs sm:text-sm lg:text-base font-semibold mb-2 md:mb-4 drop-shadow-md">
                  {item.description}
                </p>
              </div>

              {/* Corner Accent Decoration - Smaller on mobile */}
              <div className="absolute top-0 left-0 w-16 md:w-24 h-16 md:h-24 bg-white/20 rounded-br-[3rem] md:rounded-br-[4rem] backdrop-blur-sm transition-all duration-500 group-hover:w-20 md:group-hover:w-32 group-hover:h-20 md:group-hover:h-32 z-10"></div>
              <div className="absolute bottom-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-linear-to-tl from-white/30 to-transparent rounded-tl-[3rem] md:rounded-tl-[4rem] backdrop-blur-sm z-10"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination Dots - Mobile optimized */}
        <div className="flex justify-center items-center gap-2 md:gap-3 mb-8 md:mb-12">
          {[0, 1, 2, 3].map((dot) => (
            <button
              key={dot}
              onClick={() => setActiveSlide(dot)}
              className={`rounded-full transition-all duration-300 ${activeSlide === dot
                  ? 'w-10 md:w-12 h-2.5 md:h-3 bg-linear-to-r from-amber-600 to-orange-500 shadow-lg'
                  : 'w-2.5 md:w-3 h-2.5 md:h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${dot + 1}`}
            />
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center space-y-4 md:space-y-6 pt-8 md:pt-12 border-t-2 border-gray-200">

        </div>
      </div>

      <style jsx>{`
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        .hover:shadow-3xl:hover {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default GallerySection;
