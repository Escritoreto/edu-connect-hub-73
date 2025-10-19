import { CVData } from "@/types/cv";
import { ModernTemplate } from "./ModernTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { MinimalistTemplate } from "./MinimalistTemplate";

interface Props {
  data: CVData;
}

export const CVPreview = ({ data }: Props) => {
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "minimalist":
        return <MinimalistTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="w-full">
      {renderTemplate()}
    </div>
  );
};
