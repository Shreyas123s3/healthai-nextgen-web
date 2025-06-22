
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1, triggerOnce = true) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce && !hasTriggered) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, hasTriggered]);

  return [ref, isVisible] as const;
}

export function useStaggeredAnimation(delay = 0.1) {
  const [staggeredItems, setStaggeredItems] = useState<boolean[]>([]);
  
  const triggerStagger = (count: number) => {
    const items = new Array(count).fill(false);
    setStaggeredItems(items);
    
    items.forEach((_, index) => {
      setTimeout(() => {
        setStaggeredItems(prev => {
          const newItems = [...prev];
          newItems[index] = true;
          return newItems;
        });
      }, index * delay * 1000);
    });
  };

  return [staggeredItems, triggerStagger] as const;
}
