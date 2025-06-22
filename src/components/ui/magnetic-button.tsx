
"use client"

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function MagneticButton({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  type = 'button'
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps: HTMLMotionProps<"button"> = {
    ref,
    animate: { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
    onMouseMove: handleMouse,
    onMouseLeave: reset,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  return (
    <motion.button
      {...motionProps}
      className={`relative transform transition-all duration-300 ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
}
