
"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
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
  threshold = 0.15,
  once = true
}: AnimatedSectionProps) {
  const { ref, isInView } = useScrollAnimation(threshold, once);
  
  const variants = scrollAnimationVariants[variant] as Variants;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 1.2,
        delay,
        ease: "easeOut"
      }}
      className={cn("will-change-transform", className)}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced component for individual items within staggered containers
export function AnimatedItem({ 
  children, 
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: 'blur(4px)',
      scale: 0.9,
      rotateX: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn("will-change-transform", className)}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced parallax container with depth effects
export function ParallaxContainer({ 
  children, 
  className = "",
  intensity = 0.6,
  scale = 1.1
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  scale?: number;
}) {
  const { ref, isInView } = useScrollAnimation(0.2, false);
  
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ 
        y: intensity * 30, 
        scale: scale,
        opacity: 0.8 
      }}
      animate={{
        y: isInView ? 0 : intensity * 30,
        scale: isInView ? 1 : scale,
        opacity: isInView ? 1 : 0.8
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut"
      }}
      style={{ perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

// Cinematic text reveal component
export function TextReveal({
  children,
  className = "",
  direction = 'up',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}) {
  const { ref, isInView } = useScrollAnimation(0.1, true);

  const variants = {
    up: { y: 40, opacity: 0, filter: 'blur(3px)' },
    left: { x: -40, opacity: 0, filter: 'blur(3px)' },
    right: { x: 40, opacity: 0, filter: 'blur(3px)' }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1, filter: 'blur(0px)' } : variants[direction]}
      transition={{
        duration: 1,
        delay,
        ease: "easeOut"
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

// Background image with parallax effect
export function ParallaxBackground({
  imageUrl,
  className = "",
  intensity = 0.5,
  children
}: {
  imageUrl: string;
  className?: string;
  intensity?: number;
  children?: React.ReactNode;
}) {
  const { ref, isInView } = useScrollAnimation(0.3, false);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2, y: 50 }}
        animate={{
          scale: isInView ? 1 : 1.2,
          y: isInView ? 0 : 50
        }}
        transition={{
          duration: 2,
          ease: "easeOut"
        }}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </motion.div>
  );
}
