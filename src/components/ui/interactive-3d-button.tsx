
"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Interactive3DButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  icon?: React.ReactNode;
  shimmer?: boolean;
}

export function Interactive3DButton({ 
  children, 
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
  icon,
  shimmer = true
}: Interactive3DButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-sage-500 to-spa-blue-500 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white/90 text-sage-700 border border-sage-200 shadow-md hover:shadow-lg',
    outline: 'border-2 border-sage-300 text-sage-700 bg-white/50 hover:bg-white/80'
  };

  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-12 py-6 text-lg'
  };

  return (
    <motion.button
      className={cn(
        "relative overflow-hidden rounded-2xl font-semibold transition-all duration-300",
        "transform-gpu perspective-1000",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        rotateX: -5,
        rotateY: 2,
        z: 10
      }}
      whileTap={{ 
        scale: 0.98,
        rotateX: 0,
        rotateY: 0
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Shimmer effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%', skewX: -15 }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0"
        style={{
          background: variant === 'primary' 
            ? 'linear-gradient(45deg, rgba(16, 185, 129, 0.3), rgba(6, 182, 212, 0.3))'
            : 'rgba(16, 185, 129, 0.1)',
          filter: 'blur(20px)',
          transform: 'translateZ(-1px)'
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon || <ArrowRight size={20} className={cn("transition-transform duration-300", isHovered && "translate-x-1")} />}
      </span>

      {/* Floating sparkles */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/60"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                scale: 0,
                rotate: 0
              }}
              animate={{ 
                scale: [0, 1, 0],
                rotate: 360,
                y: '-20px'
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <Sparkles size={12} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.button>
  );
}
