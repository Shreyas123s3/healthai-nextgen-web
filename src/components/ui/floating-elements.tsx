
import React from 'react';
import { motion } from 'framer-motion';

export function FloatingElements() {
  const floatingShapes = [
    { id: 1, size: 60, delay: 0, duration: 20, x: '10%', y: '20%' },
    { id: 2, size: 40, delay: 2, duration: 25, x: '80%', y: '30%' },
    { id: 3, size: 80, delay: 4, duration: 18, x: '20%', y: '70%' },
    { id: 4, size: 35, delay: 1, duration: 22, x: '70%', y: '80%' },
    { id: 5, size: 50, delay: 3, duration: 28, x: '90%', y: '15%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-200/20 to-cyan-200/20 backdrop-blur-sm"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}
