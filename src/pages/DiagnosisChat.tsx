
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Send, Bot, User } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const DiagnosisChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI medical assistant. I can help you understand symptoms, provide health information, and guide you on when to seek medical care. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage
      }]);
      setInputMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          type: 'bot',
          content: "Thank you for your message. This is a demo response. In a real implementation, this would connect to our AI diagnostic system to provide personalized health insights."
        }]);
      }, 1000);
    }
  };

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

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <MessageCircle className="w-16 h-16 mx-auto mb-6 text-sage-600" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sage-800">
              AI Diagnosis Chat
            </h1>
            <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto">
              Chat with our AI medical assistant for symptom analysis and health guidance
            </p>
          </motion.div>

          <Card className="bg-white/80 backdrop-blur-sm border-white/30 h-96 flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'bot' 
                        ? 'bg-sage-100 text-sage-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'bot'
                        ? 'bg-sage-50 text-sage-800'
                        : 'bg-blue-500 text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe your symptoms or ask a health question..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-sage-600 hover:bg-sage-700"
                >
                  <Send size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-warm-neutral-500 mt-4">
            This AI assistant provides information only and should not replace professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisChat;
