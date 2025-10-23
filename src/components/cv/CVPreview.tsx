import { CVData } from "@/types/cv";
import { ModernTemplate } from "./ModernTemplate";
import { ModernTemplate2 } from "./ModernTemplate2";
import { ModernTemplate3 } from "./ModernTemplate3";
import { ModernTemplate4 } from "./ModernTemplate4";
import { ClassicTemplate } from "./ClassicTemplate";
import { ClassicTemplate2 } from "./ClassicTemplate2";
import { ClassicTemplate3 } from "./ClassicTemplate3";
import { ClassicTemplate4 } from "./ClassicTemplate4";
import { MinimalistTemplate } from "./MinimalistTemplate";
import { MinimalistTemplate2 } from "./MinimalistTemplate2";
import { MinimalistTemplate3 } from "./MinimalistTemplate3";
import { MinimalistTemplate4 } from "./MinimalistTemplate4";

interface Props {
  data: CVData;
}

export const CVPreview = ({ data }: Props) => {
  const renderTemplate = () => {
    switch (data.selectedTemplate) {
      case "modern":
        return <ModernTemplate data={data} />;
      case "modern2":
        return <ModernTemplate2 data={data} />;
      case "modern3":
        return <ModernTemplate3 data={data} />;
      case "modern4":
        return <ModernTemplate4 data={data} />;
      case "classic":
        return <ClassicTemplate data={data} />;
      case "classic2":
        return <ClassicTemplate2 data={data} />;
      case "classic3":
        return <ClassicTemplate3 data={data} />;
      case "classic4":
        return <ClassicTemplate4 data={data} />;
      case "minimalist":
        return <MinimalistTemplate data={data} />;
      case "minimalist2":
        return <MinimalistTemplate2 data={data} />;
      case "minimalist3":
        return <MinimalistTemplate3 data={data} />;
      case "minimalist4":
        return <MinimalistTemplate4 data={data} />;
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