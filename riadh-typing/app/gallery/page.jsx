"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Sample high-quality lobby/interior images for UAE luxury theme
const SAMPLE_IMAGES = [
  {
    id: 1,
    image_url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Grand Lobby Entrance",
    description: "Elegant marble flooring with contemporary design",
    category: "lobby"
  },
  {
    id: 2,
    image_url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    title: "Premium Reception Area",
    description: "Sophisticated welcome area with gold accents",
    category: "reception"
  },
  {
    id: 3,
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Executive Office Suite",
    description: "Modern workspace with panoramic city views",
    category: "office"
  },
  {
    id: 4,
    image_url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
    title: "Luxury Meeting Room",
    description: "State-of-the-art meeting facilities",
    category: "meeting"
  },
  {
    id: 5,
    image_url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    title: "VIP Customer Lounge",
    description: "Exclusive waiting area with premium amenities",
    category: "lounge"
  },
  {
    id: 6,
    image_url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    title: "Corporate Atrium",
    description: "Stunning architectural centerpiece",
    category: "atrium"
  },
  {
    id: 7,
    image_url: "https://images.unsplash.com/photo-1600573472591-ee6981cf35de?w=800&q=80",
    title: "Business Center",
    description: "Full-service business facilities",
    category: "business"
  },
  {
    id: 8,
    image_url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
    title: "Conference Hall",
    description: "Large-scale event venue",
    category: "conference"
  },
  {
    id: 9,
    image_url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    title: "Reception Desk",
    description: "Professional front desk service",
    category: "reception"
  },
  {
    id: 10,
    image_url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    title: "Executive Suite",
    description: "Premium private office space",
    category: "office"
  },
  {
    id: 11,
    image_url: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    title: "Modern Interior",
    description: "Contemporary design excellence",
    category: "interior"
  },
  {
    id: 12,
    image_url: "https://images.unsplash.com/photo-1600607688066-890987f18a86?w=800&q=80",
    title: "Corporate Interior",
    description: "Professional environment",
    category: "interior"
  }
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchGallery();
    // Check if user is admin
    const auth = localStorage.getItem("admin-auth");
    setIsAdmin(!!auth);
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      
      if (data && data.length > 0) {
        setImages(data);
      } else {
        // Use sample images if no database images exist
        setImages(SAMPLE_IMAGES);
      }
    } catch (error) {
      // Fallback to sample images
      setImages(SAMPLE_IMAGES);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ["all", ...new Set(images.map((img) => img.category))];

  // Filter images
  const filteredImages = filter === "all" 
    ? images 
    : images.filter((img) => img.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-amber-100/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-50/20 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-amber-100/80 to-yellow-100/80 rounded-full border border-amber-200/50"
            >
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-amber-800 tracking-wide">
                Premium Collection
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Our Gallery
              </span>
            </h1>

            <div className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full" />

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
             Showcasing our professional workspaces and people: organized office interiors, accessible exterior locations, and dedicated teams who deliver reliable, affordable business services across the UAE. This gallery highlights efficiency, collaboration, and regulatory-savvy support that help clients focus on growth and success.
            </p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === category
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 shadow-lg shadow-amber-500/25"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-amber-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
            </div>
          )}

          {/* Image Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image */}
                  <Image
                    src={image.image_url}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">
                      {image.category}
                    </span>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    <p className="text-slate-300 text-sm line-clamp-2">
                      {image.description}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div className="absolute top-2 right-2 w-8 h-8 bg-amber-400/20 rounded-bl-full" />
                  </div>

                  {/* Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/50 rounded-2xl transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No images found</h3>
              <p className="text-slate-500">No images match the selected category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "50K+", label: "Happy Clients" },
              { number: "100+", label: "Professional Staff" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-1 mb-3 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-slate-400 max-w-xl mx-auto">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
                setSelectedImage(filteredImages[prevIndex]);
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
                const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
                setSelectedImage(filteredImages[nextIndex]);
              }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
