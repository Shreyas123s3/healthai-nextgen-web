
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    hospital: "Metropolitan General Hospital",
    content: "This AI platform has revolutionized our diagnostic process. The accuracy and speed of analysis have improved patient outcomes significantly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Emergency Department Director",
    hospital: "City Medical Center",
    content: "The real-time monitoring capabilities have been game-changing for our emergency department. We can now detect critical conditions much earlier.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Head of Cardiology",
    hospital: "Heart Institute",
    content: "The AI's ability to analyze complex cardiac data has enhanced our treatment planning. It's become an indispensable tool in our practice.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1594824363078-891fbd8eb5e6?w=150&h=150&fit=crop&crop=face"
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
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-xl text-slate-600">
            See what medical professionals are saying about our AI platform
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
                <div className="flex items-start gap-6">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <blockquote className="text-lg text-slate-700 mb-4 italic">
                      "{testimonials[currentIndex].content}"
                    </blockquote>
                    <div>
                      <cite className="font-semibold text-slate-800">
                        {testimonials[currentIndex].name}
                      </cite>
                      <p className="text-slate-600 text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {testimonials[currentIndex].hospital}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </motion.div>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
