
"use client"

import React from 'react';
import { motion } from 'framer-motion';

export function FloatingElements() {
  const floatingShapes = [
    { id: 1, size: 'w-4 h-4', color: 'bg-blue-200/30', delay: 0, x: '10%', y: '20%' },
    { id: 2, size: 'w-6 h-6', color: 'bg-cyan-200/20', delay: 2, x: '80%', y: '10%' },
    { id: 3, size: 'w-3 h-3', color: 'bg-blue-300/40', delay: 4, x: '70%', y: '60%' },
    { id: 4, size: 'w-5 h-5', color: 'bg-cyan-300/25', delay: 1, x: '20%', y: '70%' },
    { id: 5, size: 'w-2 h-2', color: 'bg-blue-400/35', delay: 3, x: '90%', y: '80%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full ${shape.size} ${shape.color}`}
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + shape.delay,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
