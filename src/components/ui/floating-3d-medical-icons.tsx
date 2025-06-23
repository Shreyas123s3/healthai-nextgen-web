
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Stethoscope, Heart, Zap, Shield } from 'lucide-react';

interface Floating3DMedicalIconsProps {
  className?: string;
  variant?: 'diagnostic' | 'analysis' | 'monitoring' | 'security';
}

export function Floating3DMedicalIcons({ className = '', variant = 'diagnostic' }: Floating3DMedicalIconsProps) {
  const iconSets = {
    diagnostic: [
      { Icon: Stethoscope, position: { x: '15%', y: '20%' }, delay: 0, color: 'text-sage-500' },
      { Icon: Brain, position: { x: '80%', y: '35%' }, delay: 1.2, color: 'text-spa-blue-500' },
      { Icon: Activity, position: { x: '25%', y: '70%' }, delay: 2.4, color: 'text-sage-400' },
    ],
    analysis: [
      { Icon: Brain, position: { x: '10%', y: '25%' }, delay: 0, color: 'text-spa-blue-500' },
      { Icon: Zap, position: { x: '85%', y: '40%' }, delay: 1.5, color: 'text-sage-500' },
      { Icon: Activity, position: { x: '20%', y: '75%' }, delay: 3, color: 'text-sage-400' },
    ],
    monitoring: [
      { Icon: Heart, position: { x: '12%', y: '30%' }, delay: 0, color: 'text-red-400' },
      { Icon: Activity, position: { x: '75%', y: '25%' }, delay: 1.8, color: 'text-sage-500' },
      { Icon: Stethoscope, position: { x: '30%', y: '80%' }, delay: 2.7, color: 'text-spa-blue-500' },
    ],
    security: [
      { Icon: Shield, position: { x: '20%', y: '15%' }, delay: 0, color: 'text-sage-600' },
      { Icon: Brain, position: { x: '70%', y: '45%' }, delay: 1.3, color: 'text-spa-blue-500' },
      { Icon: Heart, position: { x: '35%', y: '75%' }, delay: 2.6, color: 'text-red-400' },
    ],
  };

  const icons = iconSets[variant];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: item.position.x,
            top: item.position.y,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            rotateX: -45,
            z: -50
          }}
          animate={{ 
            opacity: 0.6, 
            scale: 1, 
            rotateX: 0,
            z: 0,
            rotateY: [0, 15, -15, 0],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
            rotateY: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
          whileHover={{
            scale: 1.2,
            rotateY: 20,
            z: 20,
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" />
            <motion.div
              className={`relative p-4 rounded-2xl backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl ${item.color}`}
              animate={{
                boxShadow: [
                  '0 10px 40px rgba(16, 185, 129, 0.1)',
                  '0 15px 60px rgba(16, 185, 129, 0.2)',
                  '0 10px 40px rgba(16, 185, 129, 0.1)',
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <item.Icon size={24} strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
