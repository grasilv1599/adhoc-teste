
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

export type ProcessingStage = "idle" | "processing" | "completed" | "error";

interface ProcessingStatusProps {
  stage: ProcessingStage;
  errorMessage?: string;
  onDownload: () => void;
  onReset: () => void;
  filename?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  stage,
  errorMessage,
  onDownload,
  onReset,
  filename,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Processing Status</CardTitle>
        <CardDescription>
          Status of your Excel file processing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stage === "idle" && (
          <div className="flex flex-col items-center py-6">
            <p className="text-muted-foreground">
              Upload a file and select a language to begin processing
            </p>
          </div>
        )}
        
        {stage === "processing" && (
          <div className="flex flex-col items-center py-6">
            <RefreshCw className="w-12 h-12 text-primary animate-spinner mb-4" />
            <p className="text-primary">Processing your file...</p>
            <p className="text-sm text-muted-foreground mt-2">
              This may take a few minutes depending on the file size
            </p>
          </div>
        )}
        
        {stage === "completed" && (
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-green-700 font-medium">Processing completed!</p>
            {filename && (
              <p className="text-sm text-muted-foreground mt-2">
                {filename} is ready for download
              </p>
            )}
          </div>
        )}
        
        {stage === "error" && (
          <div className="flex flex-col items-center py-6">
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <p className="text-destructive font-medium">Processing failed</p>
            {errorMessage && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {errorMessage}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {stage === "completed" && (
          <Button onClick={onDownload} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        )}
        
        {(stage === "completed" || stage === "error") && (
          <Button variant="outline" onClick={onReset}>
            Start Over
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProcessingStatus;
