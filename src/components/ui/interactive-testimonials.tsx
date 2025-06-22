
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './button';

const testimonials = [
  {
    id: 1,
    quote: "This AI healthcare platform has revolutionized how we diagnose and treat patients. The accuracy is incredible.",
    author: "Dr. Sarah Chen",
    role: "Chief Medical Officer",
    hospital: "Metro General Hospital",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    quote: "The predictive analytics have helped us prevent complications before they occur. It's truly the future of medicine.",
    author: "Dr. Michael Rodriguez",
    role: "Emergency Department Director",
    hospital: "City Medical Center",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    quote: "Our patient outcomes have improved by 40% since implementing this system. The ROI speaks for itself.",
    author: "Dr. Emily Watson",
    role: "Head of Cardiology",
    hospital: "Heart Institute",
    avatar: "https://images.unsplash.com/photo-1594824723552-cfe25d0e5b12?w=100&h=100&fit=crop&crop=face"
  }
];

export function InteractiveTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto px-6">
      <div className="relative h-80 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -300, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/30 max-w-2xl">
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              <blockquote className="text-lg md:text-xl text-slate-700 mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-800">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-sm text-slate-600">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-sm text-blue-600">
                    {testimonials[currentIndex].hospital}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 border-white/30"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 border-white/30"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
