
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Brain, MessageCircle, Upload } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/health-scanner', label: 'Health Risk Scanner', icon: Brain },
    { path: '/diagnosis-chat', label: 'Diagnosis Chat', icon: MessageCircle },
    { path: '/medical-reports', label: 'Medical Reports', icon: Upload },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-sage-200/30">
      <div className="max-w-3xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="relative text-xl font-bold text-sage-800 group">
            {/* 3D Medical Cross Element Behind Text */}
            <div className="absolute -inset-2 opacity-20 group-hover:opacity-30 transition-all duration-500">
              <div className="relative w-8 h-8">
                {/* Medical Cross 3D Effect */}
                <div className="absolute inset-0 transform rotate-12">
                  <div className="w-full h-1.5 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-3 shadow-lg"></div>
                  <div className="w-1.5 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-3 shadow-lg"></div>
                </div>
                {/* Floating particles */}
                <div className="absolute top-0 right-0 w-1 h-1 bg-sage-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-spa-blue-400 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-sage-300/20 to-spa-blue-300/20 blur-sm rounded-lg group-hover:blur-md transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
            <span className="relative z-10">HealthAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm ${
                    isActive 
                      ? 'text-sage-700 bg-sage-100/50 font-semibold' 
                      : 'text-warm-neutral-600 hover:text-sage-700 hover:bg-sage-50/50'
                  }`}
                >
                  <item.icon size={14} />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sage-500 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-1.5 text-sage-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
