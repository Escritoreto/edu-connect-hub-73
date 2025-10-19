import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface Props {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export const TemplateGallery = ({ templates, selectedTemplate, onSelect }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary shadow-xl"
                : "hover:ring-1 hover:ring-primary/50"
            }`}
            onClick={() => onSelect(template.id)}
          >
            <div className="relative aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
              <img 
                src={template.preview} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2">
                  <Check className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
