import { CVData } from "@/types/cv";
import { CVPreview } from "./CVPreview";
import { useIsMobile } from "@/hooks/use-mobile";

interface PDFPreviewProps {
  data: CVData;
}

export const PDFPreview = ({ data }: PDFPreviewProps) => {
  const isMobile = useIsMobile();
  const scale = isMobile ? 0.45 : 0.7;
  const pageWidth = 794; // A4 width in px at 96dpi
  const pageHeight = 1123; // A4 height in px at 96dpi

  return (
    <div className="flex justify-center">
      <div
        className="bg-white shadow-xl rounded-lg overflow-hidden border"
        style={{
          width: `${pageWidth * scale}px`,
          height: `${pageHeight * scale}px`,
        }}
      >
        <div
          style={{
            width: `${pageWidth}px`,
            minHeight: `${pageHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <CVPreview data={data} />
        </div>
      </div>
    </div>
  );
};
