
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Send, Bot, User } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
}

const DiagnosisChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI medical assistant. I can help you understand symptoms, provide health information, and guide you on when to seek medical care. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendClicked, setSendClicked] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      setIsLoading(true);
      setSendClicked(true);
      
      // Reset send animation after brief delay
      setTimeout(() => setSendClicked(false), 200);
      
      try {
        console.log('Sending request to OpenAI with message:', currentInput);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer sk-svcacct-WKZLW7PzN-2X16W50LFAiH6BqdN6XAwv2Lxg3nuoozQqyYF3pEpEAgLNQfHqo9h215werT3BlbkFJTwrkg2UvBfkTqjfJE0SzPyC0C7lZEN9G4giikVSkg2Kco4s5J6TMH7sm0gJEkj6aC7LCAA',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful AI medical assistant. Provide informative health guidance while always reminding users to consult healthcare professionals for serious concerns. Keep responses concise and helpful. Always end your responses by advising users to consult with healthcare professionals for proper diagnosis and treatment.'
              },
              {
                role: 'user',
                content: currentInput
              }
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          
          let errorMessage = "Sorry, something went wrong. Please try again.";
          
          if (errorData.error?.code === 'insufficient_quota') {
            errorMessage = "The API quota has been exceeded. Please check your OpenAI billing details or try again later.";
          } else if (errorData.error?.message) {
            errorMessage = `Error: ${errorData.error.message}`;
          }
          
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request right now. Please try again.";
        
        // Add typing delay for realism
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            type: 'bot',
            content: aiResponse
          }]);
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error calling OpenAI API:', error);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            type: 'bot',
            content: error instanceof Error ? error.message : "Sorry, something went wrong. Please try again."
          }]);
          setIsLoading(false);
        }, 1000);
      }
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

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <MessageCircle className="w-16 h-16 mx-auto mb-6 text-sage-600" />
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
              AI Diagnosis Chat
            </h1>
            <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto">
              Chat with our AI medical assistant for symptom analysis and health guidance
            </p>
          </motion.div>

          {/* Enhanced Chat Card with Glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-300/30 to-emerald-400/20 rounded-lg blur-xl animate-glow-pulse opacity-60" />
            <Card className="relative bg-white/85 backdrop-blur-sm border-white/40 h-96 flex flex-col shadow-2xl shadow-sage-200/50 chat-glow">
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
                      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm chat-bubble ${
                        message.type === 'bot'
                          ? 'bg-sage-50 text-sage-800 shadow-sage-100/50'
                          : 'bg-blue-500 text-white shadow-blue-200/50'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sage-100 text-sage-600">
                        <Bot size={16} />
                      </div>
                      <div className="bg-sage-50 px-4 py-3 rounded-2xl shadow-sm shadow-sage-100/50">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-sage-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Describe your symptoms or ask a health question..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border-sage-200 focus:border-sage-400 focus:ring-sage-400/20"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                    className={`bg-sage-600 hover:bg-sage-700 transition-all duration-200 send-button ${
                      sendClicked ? 'scale-95 bg-sage-700' : ''
                    }`}
                  >
                    <motion.div
                      animate={sendClicked ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.2 }}
                    >
                      <Send size={16} />
                    </motion.div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-sm text-warm-neutral-500 mt-4">
            This AI assistant provides information only and should not replace professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisChat;
