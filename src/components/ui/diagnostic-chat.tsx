
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, Zap } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export function DiagnosticChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      content: "Hello! I'm your AI health assistant. I can help analyze your symptoms and provide health insights. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const exampleQuestions = [
    "Why do I have chest pain when running?",
    "What could cause persistent headaches?",
    "Should I be worried about my joint pain?",
    "How can I improve my sleep quality?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        role: 'ai',
        content: `Based on your symptoms of "${input}", here are some possible considerations:\n\n• **Chest pain during exercise** could indicate cardiovascular stress or muscle strain\n• **Key factors to consider**: Your age, fitness level, and pain intensity\n• **Recommendation**: Consult with a healthcare provider for proper evaluation\n\nWould you like me to ask some follow-up questions to better understand your symptoms?`
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  return (
    <section className="py-24 px-6 bg-white/50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
            Smart Diagnostic Chat
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get instant, personalized health insights through our intelligent chat interface
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Example Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Try asking:</h3>
            {exampleQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleExampleClick(question)}
                className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors text-sm text-slate-700"
              >
                "{question}"
              </motion.button>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-96 flex flex-col bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="whitespace-pre-line text-sm">{message.content}</div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about your symptoms..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Zap className="w-4 h-4 mr-2" />
                Try MagicChat Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
