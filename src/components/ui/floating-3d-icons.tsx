
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Shield, Brain, Stethoscope, FileText } from 'lucide-react';

const icons = [
  { Icon: Heart, color: 'text-red-400', delay: 0 },
  { Icon: Activity, color: 'text-green-400', delay: 0.5 },
  { Icon: Shield, color: 'text-blue-400', delay: 1 },
  { Icon: Brain, color: 'text-purple-400', delay: 1.5 },
  { Icon: Stethoscope, color: 'text-teal-400', delay: 2 },
  { Icon: FileText, color: 'text-indigo-400', delay: 2.5 }
];

export function Floating3DIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            y: -100,
            rotate: 360,
            scale: [0.5, 0.8, 0.5],
            x: Math.random() * window.innerWidth
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            filter: 'blur(0.5px)'
          }}
        >
          <motion.div
            animate={{
              rotateY: [0, 180, 360],
              rotateX: [0, 90, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon size={24} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
