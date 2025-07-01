
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Tiles } from '@/components/ui/tiles';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MedicalReports = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'Blood_Test_Results_2024.pdf',
      status: 'analyzed',
      uploadDate: '2024-01-15',
      summary: 'All values within normal range. Cholesterol slightly elevated.'
    },
    {
      id: 2,
      name: 'X-Ray_Chest_2024.pdf',
      status: 'processing',
      uploadDate: '2024-01-10',
      summary: 'Analysis in progress...'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: uploadedFiles.length + index + 1,
        name: file.name,
        status: 'processing',
        uploadDate: new Date().toISOString().split('T')[0],
        summary: 'Analysis in progress...'
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
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

        {/* Medical Reports Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <FileText className="w-16 h-16 mx-auto mb-6 text-sage-600" />
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
              Medical Reports
            </h1>
            <p className="text-xl text-warm-neutral-600 max-w-2xl mx-auto">
              Upload and analyze your medical reports with AI-powered insights
            </p>
          </motion.div>

          {/* Upload Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-white/30 mb-8">
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-sage-300 rounded-lg p-8 text-center">
                <div className="relative inline-block">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-sage-400" />
                  {/* 3D Medical Cross Element Behind Upload Icon */}
                  <div className="absolute -inset-3 opacity-10">
                    <div className="relative w-8 h-8 mx-auto">
                      <div className="absolute inset-0 transform rotate-12">
                        <div className="w-full h-1.5 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-3 shadow-lg"></div>
                        <div className="w-1.5 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-3 shadow-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-sage-800">Upload Medical Reports</h3>
                <p className="text-warm-neutral-600 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button className="bg-sage-600 hover:bg-sage-700 cursor-pointer" asChild>
                    <span>Choose Files</span>
                  </Button>
                </label>
                <p className="text-xs text-warm-neutral-500 mt-2">
                  Supports PDF, JPG, PNG files up to 10MB each
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-sage-800 mb-4">Your Reports</h2>
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="bg-white/80 backdrop-blur-sm border-white/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative">
                        <FileText className="w-8 h-8 text-sage-600 mt-1" />
                        {/* Small 3D Medical Cross Element */}
                        <div className="absolute -inset-1 opacity-10">
                          <div className="relative w-4 h-4">
                            <div className="absolute inset-0 transform rotate-12">
                              <div className="w-full h-0.5 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transform translate-y-1.5"></div>
                              <div className="w-0.5 h-full bg-gradient-to-b from-sage-400 to-sage-600 rounded-full transform translate-x-1.5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sage-800 mb-1">{file.name}</h3>
                        <p className="text-sm text-warm-neutral-500 mb-2">
                          Uploaded on {file.uploadDate}
                        </p>
                        <p className="text-warm-neutral-700">{file.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'analyzed' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        file.status === 'analyzed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {file.status === 'analyzed' ? 'Analyzed' : 'Processing'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {uploadedFiles.length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-white/30">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-sage-300" />
                  {/* 3D Medical Cross Element Behind Empty State Icon */}
                  <div className="absolute -inset-3 opacity-10">
                    <div className="relative w-8 h-8 mx-auto">
                      <div className="absolute inset-0 transform rotate-12">
                        <div className="w-full h-1.5 bg-gradient-to-r from-sage-300 to-sage-500 rounded-full transform translate-y-3"></div>
                        <div className="w-1.5 h-full bg-gradient-to-b from-sage-300 to-sage-500 rounded-full transform translate-x-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-warm-neutral-500">No reports uploaded yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReports;
