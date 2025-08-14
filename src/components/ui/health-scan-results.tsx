import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Download, FileText } from 'lucide-react';

interface HealthScanResultsProps {
  results: {
    risks_detected: string[];
    confidence_scores: number[];
    ai_summary: string;
    recommendations: string;
    created_at: string;
  };
  onDownloadReport: () => void;
}

export function HealthScanResults({ results, onDownloadReport }: HealthScanResultsProps) {
  const getRiskColor = (confidence: number) => {
    if (confidence >= 0.8) return 'destructive';
    if (confidence >= 0.6) return 'default';
    return 'secondary';
  };

  const getRiskIcon = (confidence: number) => {
    if (confidence >= 0.7) return <AlertTriangle className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Results Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-4 bg-sage-100 rounded-full flex items-center justify-center"
        >
          <FileText className="w-8 h-8 text-sage-600" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2 text-sage-800">Scan Results Ready</h3>
        <p className="text-warm-neutral-600">
          AI analysis completed on {new Date(results.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Risk Detection */}
      {results.risks_detected && results.risks_detected.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-white/30">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4 text-sage-800">Detected Findings</h4>
            <div className="space-y-3">
              {results.risks_detected.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getRiskIcon(results.confidence_scores[index] || 0)}
                    <span className="font-medium">{risk}</span>
                  </div>
                  <Badge variant={getRiskColor(results.confidence_scores[index] || 0)}>
                    {Math.round((results.confidence_scores[index] || 0) * 100)}% confidence
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Summary */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 text-sage-800">AI Analysis Summary</h4>
          <div className="prose prose-sm max-w-none">
            <p className="text-warm-neutral-700 leading-relaxed whitespace-pre-wrap">
              {results.ai_summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/30">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-4 text-sage-800">Recommendations</h4>
          <div className="prose prose-sm max-w-none">
            <div className="text-warm-neutral-700 leading-relaxed whitespace-pre-wrap">
              {results.recommendations}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center pt-4">
        <Button 
          onClick={onDownloadReport}
          size="lg" 
          className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 text-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download PDF Report
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-sm text-warm-neutral-500 bg-warm-neutral-50/50 p-4 rounded-lg">
        <p>
          <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical consultation. 
          Always consult with qualified healthcare providers for medical decisions.
        </p>
      </div>
    </motion.div>
  );
}