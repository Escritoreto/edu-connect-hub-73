import { useState, useEffect, useMemo } from "react";
import { CVData } from "@/types/cv";
import { PDFModernTemplate } from "./PDFModernTemplate";
import { PDFModernTemplate2 } from "./PDFModernTemplate2";
import { PDFModernTemplate3 } from "./PDFModernTemplate3";
import { PDFModernTemplate4 } from "./PDFModernTemplate4";
import { PDFClassicTemplate } from "./PDFClassicTemplate";
import { PDFClassicTemplate2 } from "./PDFClassicTemplate2";
import { PDFClassicTemplate3 } from "./PDFClassicTemplate3";
import { PDFClassicTemplate4 } from "./PDFClassicTemplate4";
import { PDFMinimalistTemplate } from "./PDFMinimalistTemplate";
import { PDFMinimalistTemplate2 } from "./PDFMinimalistTemplate2";
import { PDFMinimalistTemplate3 } from "./PDFMinimalistTemplate3";
import { PDFMinimalistTemplate4 } from "./PDFMinimalistTemplate4";
import { pdf } from "@react-pdf/renderer";
import { Loader2, FileText, RefreshCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFPreviewProps {
  data: CVData;
}

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const pdfComponent = useMemo(() => {
    const templateId = data.selectedTemplate;
    
    // Modern templates
    if (templateId === "modern") {
      return <PDFModernTemplate data={data} templateId={templateId} />;
    } else if (templateId === "modern2") {
      return <PDFModernTemplate2 data={data} />;
    } else if (templateId === "modern3") {
      return <PDFModernTemplate3 data={data} />;
    } else if (templateId === "modern4") {
      return <PDFModernTemplate4 data={data} />;
    }
    // Classic templates
    else if (templateId === "classic") {
      return <PDFClassicTemplate data={data} templateId={templateId} />;
    } else if (templateId === "classic2") {
      return <PDFClassicTemplate2 data={data} />;
    } else if (templateId === "classic3") {
      return <PDFClassicTemplate3 data={data} />;
    } else if (templateId === "classic4") {
      return <PDFClassicTemplate4 data={data} />;
    }
    // Minimalist templates
    else if (templateId === "minimalist") {
      return <PDFMinimalistTemplate data={data} templateId={templateId} />;
    } else if (templateId === "minimalist2") {
      return <PDFMinimalistTemplate2 data={data} />;
    } else if (templateId === "minimalist3") {
      return <PDFMinimalistTemplate3 data={data} />;
    } else if (templateId === "minimalist4") {
      return <PDFMinimalistTemplate4 data={data} />;
    }
    
    // Default to modern
    return <PDFModernTemplate data={data} templateId="modern" />;
  }, [data]);

  const generatePdf = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const blob = await pdf(pdfComponent).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Revoke previous URL to avoid memory leaks
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      
      setPdfUrl(url);
    } catch (err) {
      console.error("Error generating PDF preview:", err);
      setError("Erro ao gerar preview do PDF. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce PDF generation to avoid too many re-renders
    const timeoutId = setTimeout(() => {
      generatePdf();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pdfComponent]);

  // Cleanup URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, []);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-xl min-h-[600px]">
        <FileText className="h-16 w-16 text-muted-foreground mb-4" />
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={generatePdf} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Preview do PDF em tempo real</span>
          {isLoading && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomOut}
            disabled={zoom <= 50}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleZoomIn}
            disabled={zoom >= 200}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={generatePdf}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="bg-muted/30 rounded-xl overflow-hidden">
        {isLoading && !pdfUrl ? (
          <div className="flex flex-col items-center justify-center min-h-[700px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Gerando preview do PDF...</p>
          </div>
        ) : pdfUrl ? (
          <div 
            className="flex justify-center overflow-auto p-4"
            style={{ maxHeight: '800px' }}
          >
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              title="PDF Preview"
              className="border-0 shadow-xl rounded-lg bg-white"
              style={{
                width: `${595 * (zoom / 100)}px`,
                height: `${842 * (zoom / 100)}px`,
                minHeight: '600px'
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
