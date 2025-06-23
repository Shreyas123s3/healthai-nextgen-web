
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Glassmorphic3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  glowColor?: 'sage' | 'spa-blue' | 'white';
}

export function Glassmorphic3DCard({ 
  children, 
  className = '', 
  intensity = 'medium',
  glowColor = 'sage'
}: Glassmorphic3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], intensity === 'subtle' ? [-5, 5] : intensity === 'medium' ? [-12, 12] : [-20, 20]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], intensity === 'subtle' ? [-5, 5] : intensity === 'medium' ? [-12, 12] : [-20, 20]);

  const glowColors = {
    sage: 'rgba(16, 185, 129, 0.15)',
    'spa-blue': 'rgba(59, 130, 246, 0.15)',
    white: 'rgba(255, 255, 255, 0.15)'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${glowColors[glowColor]}, transparent 70%)`,
            filter: 'blur(20px)',
            transform: 'translateZ(-10px) scale(1.1)',
          }}
        />
        
        {/* Main card */}
        <motion.div
          className="relative w-full h-full backdrop-blur-xl bg-white/60 dark:bg-white/5 border border-white/30 rounded-3xl shadow-2xl shadow-black/5 overflow-hidden"
          style={{
            transform: 'translateZ(0px)',
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none" />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"
            style={{ transform: 'skewX(-20deg)' }}
          />
          
          {/* Content */}
          <div className="relative z-10 w-full h-full">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
