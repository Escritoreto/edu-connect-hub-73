import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Props {
  currentStep: number;
  steps: Step[];
}

export const ProgressSteps = ({ currentStep, steps }: Props) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${
                  currentStep > step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep === step.number
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="h-6 w-6" />
                ) : (
                  step.number
                )}
              </motion.div>
              <div className="text-center">
                <p className={`font-semibold text-sm ${
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 mx-4 rounded transition-all ${
                currentStep > step.number ? "bg-primary" : "bg-muted"
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
