
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Premium3DButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  icon?: boolean;
  sparkle?: boolean;
}

export function Premium3DButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className = '',
  icon = false,
  sparkle = false
}: Premium3DButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-sage-500 to-spa-blue-500 text-white shadow-lg shadow-sage-500/25',
    secondary: 'bg-white/80 backdrop-blur-sm text-sage-700 border border-white/30 shadow-lg',
    outline: 'bg-transparent border-2 border-sage-500 text-sage-600 hover:bg-sage-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`relative group overflow-hidden rounded-full font-semibold transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        rotateY: 2,
        z: 10
      }}
      whileTap={{ 
        scale: 0.98,
        rotateY: 0
      }}
      initial={{ rotateY: 0, z: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Sparkle effect */}
      {sparkle && (
        <motion.div
          className="absolute top-1 right-1 text-yellow-300"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles size={12} />
        </motion.div>
      )}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{ transform: 'skewX(-20deg)' }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight size={16} />
          </motion.div>
        )}
      </span>

      {/* 3D depth effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10 group-hover:to-black/5 transition-all duration-300" />
    </motion.button>
  );
}
