
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export function useScrollAnimation(threshold = 0.1, once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const marginValue = `-${threshold * 100}% 0px -${threshold * 100}% 0px`;
  const isInView = useInView(ref, { 
    once, 
    margin: marginValue
  });
  
  return { ref, isInView };
}

export function useStaggeredAnimation(itemsCount: number, baseDelay = 0.1) {
  return Array.from({ length: itemsCount }, (_, index) => ({
    delay: baseDelay * index
  }));
}
