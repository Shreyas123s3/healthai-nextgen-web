
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Activity, TrendingUp } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HealthScanner = () => {
  return (
    <div className="min-h-screen relative">
      {/* Fixed Tiles Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          initial={{ opacity: 0.2, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <Tiles 
            rows={120} 
            cols={20}
            tileSize="md"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Subtle background enhancement */}
      <div className="fixed inset-0 z-5 bg-gradient-radial from-sage-50/30 via-transparent to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 premium-bg pt-20">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 text-sage-700 hover:bg-white/90 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* Health Scanner Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <Brain className="w-16 h-16 mx-auto mb-6 text-sage-600" />
              {/* 3D Medical Cross Element Behind Icon */}
              <div className="absolute -inset-4 opacity-15">
                <div className="relative w-12 h-12 mx-auto">
                  <div className="absolute inset-0 transform rotate-12">
                    <div className="w-full h-2 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-5 shadow-lg"></div>
                    <div className="w-2 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-5 shadow-lg"></div>
                  </div>
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-sage-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-spa-blue-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sage-800">
              Health Risk Scanner
            </h1>
            <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto">
              Advanced AI analysis to identify potential health risks and provide personalized recommendations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-sage-600" />
                  {/* Small 3D Medical Cross Element */}
                  <div className="absolute -inset-2 opacity-10">
                    <div className="relative w-6 h-6 mx-auto">
                      <div className="absolute inset-0 transform rotate-12">
                        <div className="w-full h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-2.5"></div>
                        <div className="w-1 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-2.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Vital Signs Analysis</h3>
                <p className="text-warm-neutral-600">Real-time monitoring and analysis of your vital health metrics</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-sage-600" />
                  {/* Small 3D Medical Cross Element */}
                  <div className="absolute -inset-2 opacity-10">
                    <div className="relative w-6 h-6 mx-auto">
                      <div className="absolute inset-0 transform rotate-12">
                        <div className="w-full h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-2.5"></div>
                        <div className="w-1 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-2.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Risk Assessment</h3>
                <p className="text-warm-neutral-600">Machine learning algorithms predict potential health risks</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-sage-600" />
                  {/* Small 3D Medical Cross Element */}
                  <div className="absolute -inset-2 opacity-10">
                    <div className="relative w-6 h-6 mx-auto">
                      <div className="absolute inset-0 transform rotate-12">
                        <div className="w-full h-1 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-2.5"></div>
                        <div className="w-1 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-2.5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trend Analysis</h3>
                <p className="text-warm-neutral-600">Track health patterns and improvements over time</p>
              </CardContent>
            </Card>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Button 
              size="lg" 
              className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-lg"
            >
              Start Health Scan
            </Button>
            <p className="text-sm text-warm-neutral-500 mt-4">
              Scan takes 2-3 minutes • Results available instantly
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HealthScanner;
