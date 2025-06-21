
"use client";

import { motion } from "framer-motion";

export function PremiumBackground() {
  return (
    <>
      <div className="premium-bg-layer" />
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </>
  );
}
