
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollAnimation(threshold = 0.1, once = true, margin?: string) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    margin: margin as any || "0px 0px -10% 0px"
  });
  
  return { ref, isInView };
}

export function useStaggeredAnimation(itemsCount: number, baseDelay = 0.1) {
  return Array.from({ length: itemsCount }, (_, index) => ({
    delay: baseDelay * index
  }));
}

// Enhanced scroll animation variants for premium cinematic effects
export const scrollAnimationVariants = {
  // Cinematic slide from left with blur effect
  slideFromLeft: {
    hidden: { 
      opacity: 0, 
      x: -80,
      filter: 'blur(6px)',
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    }
  },

  // Cinematic slide from right with depth
  slideFromRight: {
    hidden: { 
      opacity: 0, 
      x: 80,
      filter: 'blur(6px)',
      scale: 0.95,
      rotateY: 15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  },

  // Premium fade up with elastic spring
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 60,
      filter: 'blur(4px)',
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.12
      }
    }
  },

  // Luxurious scale with rotation hint
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(8px)',
      rotateX: 15,
      y: 40
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      rotateX: 0,
      y: 0,
      transition: {
        duration: 1.4,
        ease: "easeOut",
        staggerChildren: 0.18
      }
    }
  },

  // Sophisticated staggered container
  staggerContainer: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6
      }
    }
  },

  // Individual stagger item with cinematic entry
  staggerItem: {
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
        ease: "easeOut"
      }
    }
  },

  // Parallax background effect
  parallax: {
    hidden: { 
      y: 100,
      scale: 1.2,
      opacity: 0.7
    },
    visible: { 
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  }
};
