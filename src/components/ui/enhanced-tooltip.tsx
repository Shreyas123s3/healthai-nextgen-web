
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EnhancedTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function EnhancedTooltip({ 
  children, 
  content, 
  position = 'top',
  className = ''
}: EnhancedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              "absolute z-50 px-3 py-2 text-sm text-white rounded-lg pointer-events-none",
              "bg-slate-800/90 backdrop-blur-sm border border-white/10",
              "shadow-xl",
              positionStyles[position],
              className
            )}
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {content}
            
            {/* Arrow */}
            <div 
              className={cn(
                "absolute w-2 h-2 bg-slate-800/90 border border-white/10 rotate-45",
                position === 'top' && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-t-transparent border-l-transparent",
                position === 'bottom' && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-b-transparent border-r-transparent",
                position === 'left' && "left-full top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-transparent border-b-transparent",
                position === 'right' && "right-full top-1/2 translate-x-1/2 -translate-y-1/2 border-r-transparent border-t-transparent"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
