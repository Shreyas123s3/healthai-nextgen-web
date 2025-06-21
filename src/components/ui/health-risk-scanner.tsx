
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface RiskResult {
  condition: string;
  confidence: number;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export function HealthRiskScanner() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    symptoms: ''
  });
  const [results, setResults] = useState<RiskResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: RiskResult[] = [
        {
          condition: "Common Cold",
          confidence: 85,
          description: "Your symptoms align with typical cold symptoms. Rest and hydration recommended.",
          severity: 'low'
        },
        {
          condition: "Seasonal Allergies",
          confidence: 65,
          description: "Consider environmental factors and allergy testing if symptoms persist.",
          severity: 'low'
        },
        {
          condition: "Viral Infection",
          confidence: 45,
          description: "Monitor symptoms and consult healthcare provider if they worsen.",
          severity: 'medium'
        }
      ];
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-blue-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Instant AI Health Risk Scanner
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get personalized health insights in seconds with our advanced AI analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your age"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Symptoms</label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                  placeholder="Describe your symptoms in detail..."
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Health Risk'}
              </Button>
            </form>
          </Card>

          {/* Results */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            {results.length === 0 && !isAnalyzing ? (
              <div className="text-center text-slate-500 py-12">
                <Activity className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Enter your information to get AI-powered health insights</p>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">AI is analyzing your health data...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-800">Analysis Results</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
                
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-slate-200 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getSeverityIcon(result.severity)}
                        <h4 className="font-medium text-slate-800">{result.condition}</h4>
                      </div>
                      <span className="text-sm text-slate-500">{result.confidence}% confidence</span>
                    </div>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(result.confidence)}`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    
                    <p className="text-sm text-slate-600">{result.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
