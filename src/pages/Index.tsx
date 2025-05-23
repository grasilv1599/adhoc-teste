
import React, { useState } from "react";
import FileUpload from "@/components/FileUpload";
import LanguageSelector, { Language } from "@/components/LanguageSelector";
import ProcessingStatus, { ProcessingStage } from "@/components/ProcessingStatus";
import { processExcelFile, ProcessingResult } from "@/services/pythonService";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>("idle");
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    toast.success("File uploaded successfully");
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedLanguage(null);
    setProcessingStage("idle");
    setProcessingResult(null);
    
    // Clear any created object URLs to prevent memory leaks
    if (processingResult?.documentUrl) {
      URL.revokeObjectURL(processingResult.documentUrl);
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile || !selectedLanguage) {
      toast.error("Please select both a file and language");
      return;
    }
    
    setProcessingStage("processing");
    
    try {
      const result = await processExcelFile(selectedFile, selectedLanguage);
      setProcessingResult(result);
      setProcessingStage(result.success ? "completed" : "error");
      
      if (result.success) {
        toast.success("File processing completed");
      }
    } catch (error) {
      setProcessingStage("error");
      setProcessingResult({
        success: false,
        errorMessage: "An unexpected error occurred during processing"
      });
      toast.error("Processing failed");
    }
  };

  const handleDownload = () => {
    if (processingResult?.documentUrl) {
      const link = document.createElement("a");
      link.href = processingResult.documentUrl;
      link.download = processingResult.filename || "processed-document.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download started");
    }
  };

  const isReadyToProcess = !!selectedFile && !!selectedLanguage && processingStage === "idle";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Excel Processor</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FileUpload
              onFileUpload={handleFileUpload}
              isProcessing={processingStage === "processing"}
            />
            
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
              isDisabled={processingStage === "processing"}
            />
            
            {isReadyToProcess && (
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleProcessFile}
                  className="px-6 py-3 bg-primary text-white rounded-md shadow-md hover:bg-primary/90 transition-colors"
                >
                  Process File
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-start justify-center md:justify-end">
            <ProcessingStatus
              stage={processingStage}
              errorMessage={processingResult?.errorMessage}
              onDownload={handleDownload}
              onReset={handleReset}
              filename={processingResult?.filename}
            />
          </div>
        </div>
        
        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-700">
            <li>Upload an Excel file (.xlsx or .xls format)</li>
            <li>Select the language for processing (Brazilian Portuguese, English, or Spanish)</li>
            <li>Click "Process File" to start the analysis</li>
            <li>The system will run the appropriate Python script based on your language selection:
              <ul className="pl-6 mt-2 list-disc list-inside">
                <li>Brazilian Portuguese: PT-Ad_hoc</li>
                <li>English: EN-Ad_hoc</li>
                <li>Spanish: ES-Ad_hoc</li>
              </ul>
            </li>
            <li>Once processing is complete, download your analysis document (.docx format)</li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Note:</h3>
            <p className="text-blue-700 text-sm">
              This is a front-end demonstration. In a production environment, this would connect to a backend service 
              that runs the Python scripts with the required dependencies.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
