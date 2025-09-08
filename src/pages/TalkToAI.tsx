import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mic } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

declare global {
  interface Window {
    ElevenLabsConvAI?: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
      }, HTMLElement>;
    }
  }
}

const TalkToAI = () => {
  useEffect(() => {
    // Load the ElevenLabs script if not already loaded
    if (!window.ElevenLabsConvAI) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }, []);

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
      
      {/* Subtle radial gradient enhancement for chat area */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-sage-100/20 via-transparent to-transparent opacity-60" />
      </div>

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

        {/* Talk to AI Interface */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <Mic className="w-16 h-16 mx-auto mb-6 text-sage-600" />
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
              Talk to AI
            </h1>
            <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto">
              Have a natural voice conversation with our AI medical assistant
            </p>
          </motion.div>

          {/* Enhanced Voice Chat Card with Glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-300/30 to-emerald-400/20 rounded-lg blur-xl animate-glow-pulse opacity-60" />
            <Card className="relative bg-white/85 backdrop-blur-sm border-white/40 min-h-96 flex flex-col shadow-2xl shadow-sage-200/50 chat-glow">
              <CardContent className="p-8 flex-1 flex flex-col items-center justify-center">
                {/* ElevenLabs Conversational AI Widget */}
                <div className="w-full max-w-lg">
                  <elevenlabs-convai agent-id="agent_0201k4n1d6z2ez7s014j2b8n8cys"></elevenlabs-convai>
                </div>
                
                {/* Instructions */}
                <div className="mt-8 text-center">
                  <p className="text-warm-neutral-600 mb-4">
                    Click the microphone to start a voice conversation with our AI assistant
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-warm-neutral-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Voice-enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                      <span>Real-time responses</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-warm-neutral-500 mt-4">
            This AI voice assistant provides information only and should not replace professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default TalkToAI;