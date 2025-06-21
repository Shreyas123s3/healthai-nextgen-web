
"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, TrendingDown } from "lucide-react";

interface AnalysisResult {
  metric: string;
  value: string;
  status: 'normal' | 'high' | 'low';
  explanation: string;
}

export function MedicalUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      analyzeReport(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      analyzeReport(e.target.files[0]);
    }
  };

  const analyzeReport = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: AnalysisResult[] = [
        {
          metric: "White Blood Cells",
          value: "12,500 cells/μL",
          status: "high",
          explanation: "This is above the normal range (4,000-11,000). This can sometimes indicate an infection or immune response."
        },
        {
          metric: "Hemoglobin",
          value: "14.2 g/dL",
          status: "normal",
          explanation: "Your hemoglobin levels are within the healthy range, indicating good oxygen transport capacity."
        },
        {
          metric: "Cholesterol",
          value: "180 mg/dL",
          status: "normal",
          explanation: "Your total cholesterol is at a healthy level, reducing cardiovascular risk."
        },
        {
          metric: "Blood Sugar",
          value: "95 mg/dL",
          status: "normal",
          explanation: "Fasting glucose levels are optimal, indicating good metabolic health."
        }
      ];
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'high': return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'low': return <TrendingDown className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-200 bg-green-50';
      case 'high': return 'border-red-200 bg-red-50';
      case 'low': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Upload & Analyze Medical Reports
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            AI-powered analysis of your medical reports with human-friendly explanations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : uploadedFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-800">{uploadedFile.name}</h3>
                    <p className="text-sm text-slate-600">File uploaded successfully</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedFile(null);
                      setAnalysis([]);
                    }}
                  >
                    Upload Different File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">
                      Drop your medical reports here
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      Support for X-rays, blood reports, MRI scans, and more
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept=".pdf,.jpg,.jpeg,.png,.dcm"
                      />
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Analysis Results */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/30 shadow-xl">
            {analysis.length === 0 && !isAnalyzing ? (
              <div className="text-center text-slate-500 py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Upload a medical report to get AI-powered analysis</p>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">AI is analyzing your medical report...</p>
                <p className="text-sm text-slate-500 mt-2">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Analysis Results</h3>
                
                {analysis.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
                  >
                    <div className="flex items-start gap-3">
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800">{result.metric}</h4>
                          <span className="text-sm font-mono text-slate-600">{result.value}</span>
                        </div>
                        <p className="text-sm text-slate-700">{result.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> This AI analysis is for informational purposes only. 
                    Always consult with a healthcare professional for medical advice.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
