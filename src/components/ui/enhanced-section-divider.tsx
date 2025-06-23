
import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedSectionDividerProps {
  variant?: 'default' | 'glow' | 'particle';
  className?: string;
}

export function EnhancedSectionDivider({ variant = 'default', className = '' }: EnhancedSectionDividerProps) {
  if (variant === 'glow') {
    return (
      <div className={`relative py-8 ${className}`}>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent relative"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-sage-400 to-transparent"
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scaleY: [1, 2, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ filter: 'blur(2px)' }}
          />
        </motion.div>
      </div>
    );
  }

  if (variant === 'particle') {
    return (
      <div className={`relative py-12 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sage-200 to-transparent" />
        </div>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sage-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    />
  );
}
