
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, scrollAnimationVariants } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'slideFromLeft' | 'slideFromRight' | 'fadeUp' | 'scaleIn' | 'staggerContainer';
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  once = true
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation(threshold, once);
  
  const variants = scrollAnimationVariants[variant];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        ...variants.visible.transition,
        delay 
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

// Component for individual items within staggered containers
export function AnimatedItem({ 
  children, 
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={scrollAnimationVariants.staggerItem}
      transition={{ delay }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

// Component for parallax background effects
export function ParallaxContainer({ 
  children, 
  className = "",
  intensity = 0.5
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const { ref, isInView } = useScrollAnimation(0.2, false);
  
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        transform: isInView ? `translateY(${intensity * -20}px)` : 'translateY(0px)'
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
}
