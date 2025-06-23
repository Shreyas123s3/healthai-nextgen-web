
import React from 'react';
import { motion } from 'framer-motion';

interface Medical3DIllustrationsProps {
  type: 'dna' | 'heartbeat' | 'brain-scan' | 'molecules';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Medical3DIllustrations({ type, size = 'md', className = '' }: Medical3DIllustrationsProps) {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const DNAHelix = () => (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M20 10 Q30 30 20 50 Q10 70 20 90"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M80 10 Q70 30 80 50 Q90 70 80 90"
          stroke="url(#dnaGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={i}
            x1="20"
            y1={20 + i * 15}
            x2="80"
            y2={20 + i * 15}
            stroke="#10b981"
            strokeWidth="2"
            opacity="0.6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
      </svg>
    </motion.div>
  );

  const Heartbeat = () => (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M10 50 L20 50 L25 30 L30 70 L35 20 L40 80 L45 50 L90 50"
          stroke="url(#heartGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="25"
          cy="30"
          r="2"
          fill="#ef4444"
          animate={{ scale: [0, 1.5, 0] }}
          transition={{ duration: 0.3, delay: 0.8, repeat: Infinity, repeatDelay: 1.7 }}
        />
      </svg>
    </motion.div>
  );

  const BrainScan = () => (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      animate={{ rotateX: [0, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M30 20 Q50 10 70 20 Q80 30 75 50 Q70 70 50 75 Q30 70 25 50 Q20 30 30 20"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="rgba(139, 92, 246, 0.1)"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(3)].map((_, i) => (
          <motion.circle
            key={i}
            cx={35 + i * 15}
            cy={40 + i * 5}
            r="3"
            fill="#3b82f6"
            opacity="0.6"
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </svg>
    </motion.div>
  );

  const Molecules = () => (
    <motion.div
      className={`relative ${sizes[size]} ${className}`}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="moleculeGradient">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        {/* Central atom */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#moleculeGradient)"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Orbiting atoms */}
        {[...Array(4)].map((_, i) => (
          <motion.g key={i}>
            <motion.circle
              cx="50"
              cy="20"
              r="4"
              fill="#3b82f6"
              opacity="0.7"
              animate={{ rotate: [0, 360] }}
              style={{ originX: '50px', originY: '50px' }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            <motion.line
              x1="50"
              y1="50"
              x2="50"
              y2="20"
              stroke="#10b981"
              strokeWidth="1"
              opacity="0.3"
              animate={{ rotate: [0, 360] }}
              style={{ originX: '50px', originY: '50px' }}
              transition={{ 
                duration: 3 + i, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );

  const illustrations = {
    dna: DNAHelix,
    heartbeat: Heartbeat,
    'brain-scan': BrainScan,
    molecules: Molecules,
  };

  const IllustrationComponent = illustrations[type];

  return <IllustrationComponent />;
}
