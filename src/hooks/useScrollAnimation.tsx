
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollAnimation(threshold = 0.1, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    margin: `${-threshold * 100}% 0px ${-threshold * 100}% 0px`
  });
  
  return { ref, isInView };
}

export function useStaggeredAnimation(itemsCount: number, baseDelay = 0.1) {
  return Array.from({ length: itemsCount }, (_, index) => ({
    delay: baseDelay * index
  }));
}

// Enhanced scroll animation variants for healthcare-appropriate motion
export const scrollAnimationVariants = {
  // Gentle slide from left for headings
  slideFromLeft: {
    hidden: { 
      opacity: 0, 
      x: -60,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
        staggerChildren: 0.1
      }
    }
  },

  // Gentle slide from right for supporting content
  slideFromRight: {
    hidden: { 
      opacity: 0, 
      x: 60,
      filter: 'blur(4px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
        staggerChildren: 0.15
      }
    }
  },

  // Gentle fade up for text blocks
  fadeUp: {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(2px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1] as any,
        staggerChildren: 0.08
      }
    }
  },

  // Gentle scale for cards and images
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      filter: 'blur(3px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as any,
        staggerChildren: 0.12
      }
    }
  },

  // Staggered container for multiple items
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Individual stagger item
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(2px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any
      }
    }
  }
};
