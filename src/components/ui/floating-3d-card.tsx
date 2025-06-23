
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Floating3DCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: 'shallow' | 'medium' | 'deep';
  glowColor?: string;
  floatIntensity?: number;
}

export function Floating3DCard({ 
  children, 
  className = '',
  depth = 'medium',
  glowColor = 'rgba(16, 185, 129, 0.15)',
  floatIntensity = 1
}: Floating3DCardProps) {
  const depthStyles = {
    shallow: 'shadow-lg hover:shadow-xl',
    medium: 'shadow-xl hover:shadow-2xl',
    deep: 'shadow-2xl hover:shadow-3xl'
  };

  return (
    <motion.div
      className={cn(
        "relative backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl overflow-hidden",
        "transform-gpu transition-all duration-500",
        depthStyles[depth],
        className
      )}
      initial={{ opacity: 0, y: 20, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        y: -8 * floatIntensity,
        rotateX: 2,
        rotateY: 1,
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'translateZ(-1px)'
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glass surface */}
      <div className="relative z-10 p-6 h-full">
        {/* Subtle top highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        {children}
      </div>
      
      {/* 3D depth border */}
      <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
    </motion.div>
  );
}
