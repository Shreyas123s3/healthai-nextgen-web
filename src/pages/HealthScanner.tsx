
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Activity, TrendingUp, Upload } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HealthScanProgress } from '@/components/ui/health-scan-progress';
import { HealthScanResults } from '@/components/ui/health-scan-results';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const HealthScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png,.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
        startHealthScan(file);
      }
    };
    input.click();
  };

  const startHealthScan = async (file: File) => {
    try {
      setIsScanning(true);
      setScanProgress(0);
      setScanResults(null);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Upload file to Supabase storage
      const fileName = `${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('health_scans')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create initial database record
      const { data: recordData, error: recordError } = await (supabase as any)
        .from('health_scan_results')
        .insert({
          file_id: fileName,
          status: 'processing',
          risks_detected: [],
          confidence_scores: [],
          ai_summary: '',
          recommendations: ''
        })
        .select()
        .single();

      if (recordError) throw recordError;

      // Call edge function to process the scan
      const { error: functionError } = await supabase.functions.invoke('process-health-scan', {
        body: { file_id: fileName, file_path: fileName }
      });

      if (functionError) throw functionError;

      // Subscribe to real-time updates
      const subscription = supabase
        .channel('health_scan_results')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'health_scan_results',
            filter: `file_id=eq.${fileName}`
          },
          (payload) => {
            if (payload.new.status === 'completed') {
              clearInterval(progressInterval);
              setScanProgress(100);
              setTimeout(() => {
                setIsScanning(false);
                setScanResults(payload.new);
              }, 1000);
            }
          }
        )
        .subscribe();

      // Cleanup subscription after 5 minutes
      setTimeout(() => {
        subscription.unsubscribe();
      }, 300000);

    } catch (error) {
      console.error('Error starting health scan:', error);
      setIsScanning(false);
      setScanProgress(0);
      toast({
        title: "Scan Failed",
        description: "There was an error processing your health scan. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadReport = async () => {
    if (!scanResults) return;
    
    try {
      // Generate PDF report using browser's print functionality
      const reportWindow = window.open('', '_blank');
      if (!reportWindow) return;

      const reportContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Health Scan Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4a7c59; padding-bottom: 20px; }
            .section { margin-bottom: 25px; }
            .risk-item { margin: 10px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #4a7c59; }
            .confidence { font-weight: bold; color: #4a7c59; }
            .disclaimer { background: #f0f0f0; padding: 15px; border-radius: 5px; font-size: 0.9em; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Health Scan Report</h1>
            <p>Generated on ${new Date(scanResults.created_at).toLocaleDateString()}</p>
          </div>
          
          <div class="section">
            <h2>Detected Findings</h2>
            ${scanResults.risks_detected.map((risk: string, index: number) => `
              <div class="risk-item">
                <strong>${risk}</strong>
                <div class="confidence">Confidence: ${Math.round((scanResults.confidence_scores[index] || 0) * 100)}%</div>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <h2>AI Analysis Summary</h2>
            <p>${scanResults.ai_summary}</p>
          </div>
          
          <div class="section">
            <h2>Recommendations</h2>
            <div>${scanResults.recommendations}</div>
          </div>
          
          <div class="disclaimer">
            <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical consultation. Always consult with qualified healthcare providers for medical decisions.
          </div>
        </body>
        </html>
      `;

      reportWindow.document.write(reportContent);
      reportWindow.document.close();
      setTimeout(() => {
        reportWindow.print();
      }, 500);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      });
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

          {!scanResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <Button 
                onClick={handleFileSelect}
                size="lg" 
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 text-lg"
                disabled={isScanning}
              >
                <Upload className="w-5 h-5 mr-2" />
                {isScanning ? 'Processing...' : 'Start Health Scan'}
              </Button>
              <p className="text-sm text-warm-neutral-500 mt-4">
                Upload X-ray, medical report (JPG, PNG, PDF) • AI analysis in real-time
              </p>
            </motion.div>
          ) : (
            <HealthScanResults 
              results={scanResults} 
              onDownloadReport={downloadReport}
            />
          )}
        </div>
      </div>

      {/* Health Scan Progress Modal */}
      <HealthScanProgress isScanning={isScanning} progress={scanProgress} />
    </div>
  );
};

export default HealthScanner;
