import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

interface HealthScanProgressProps {
  isScanning: boolean;
  progress: number;
}

export function HealthScanProgress({ isScanning, progress }: HealthScanProgressProps) {
  if (!isScanning) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    >
      <div className="bg-white/90 backdrop-blur-sm border border-white/30 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              filter: [
                'drop-shadow(0 0 0px hsl(var(--sage-400)))',
                'drop-shadow(0 0 20px hsl(var(--sage-400)))',
                'drop-shadow(0 0 0px hsl(var(--sage-400)))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative inline-block"
          >
            <Brain className="w-16 h-16 mx-auto mb-6 text-sage-600" />
            <div className="absolute inset-0 rounded-full bg-sage-400/20 animate-ping" />
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2 text-sage-800">
            Analyzing Health Scan
          </h3>
          <p className="text-warm-neutral-600 mb-6">
            AI is processing your medical data using advanced algorithms
          </p>
          
          <div className="space-y-4">
            <Progress value={progress} className="w-full h-3" />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-sm text-sage-600"
            >
              {progress < 30 && "Uploading and analyzing file..."}
              {progress >= 30 && progress < 60 && "Processing medical data..."}
              {progress >= 60 && progress < 90 && "Generating AI insights..."}
              {progress >= 90 && "Finalizing results..."}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}