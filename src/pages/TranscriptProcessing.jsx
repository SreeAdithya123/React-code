import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, FileText, Loader2, Video } from "lucide-react";

import { Progress } from "@/components/ui/progress";

const processingSteps = [
    { icon: Video, label: "Processing video recording...", duration: 2000 },
    { icon: FileText, label: "Generating transcript...", duration: 3000 },
    { icon: BarChart3, label: "Analyzing performance...", duration: 2000 },
];

export default function TranscriptProcessing() {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const totalDuration = processingSteps.reduce((sum, step) => sum + step.duration, 0);
        let elapsed = 0;

        const interval = setInterval(() => {
            elapsed += 100;
            const newProgress = (elapsed / totalDuration) * 100;
            setProgress(Math.min(newProgress, 100));

            // Update current step
            let accumulated = 0;
            for (let i = 0; i < processingSteps.length; i++) {
                accumulated += processingSteps[i].duration;
                if (elapsed < accumulated) {
                    setCurrentStep(i);
                    break;
                }
            }

            if (elapsed >= totalDuration) {
                clearInterval(interval);
                setTimeout(() => {
                    navigate("/interview/new/player");
                }, 500);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [navigate]);

    const CurrentIcon = processingSteps[currentStep]?.icon || Loader2;

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="max-w-md text-center">
                <div className="shadow-glow mx-auto mb-8 flex h-24 w-24 animate-pulse items-center justify-center rounded-2xl gradient-bg">
                    <CurrentIcon className="h-12 w-12 text-primary-foreground" />
                </div>

                <h1 className="mb-2 text-2xl font-bold text-foreground">Processing Your Interview</h1>
                <p className="mb-8 text-muted-foreground">{processingSteps[currentStep]?.label || "Almost done..."}</p>

                <div className="space-y-4">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{Math.round(progress)}% complete</span>
                        <span>
                            Step {currentStep + 1} of {processingSteps.length}
                        </span>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-4">
                    {processingSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`rounded-xl border p-4 transition-all duration-300 ${index === currentStep
                                    ? "border-primary bg-primary/5 shadow-soft"
                                    : index < currentStep
                                        ? "border-success/50 bg-success/5"
                                        : "border-border bg-card"
                                }`}
                        >
                            <step.icon
                                className={`mx-auto mb-2 h-6 w-6 ${index === currentStep
                                        ? "text-primary"
                                        : index < currentStep
                                            ? "text-success"
                                            : "text-muted-foreground"
                                    }`}
                            />
                            <p
                                className={`text-xs ${index === currentStep
                                        ? "font-medium text-primary"
                                        : index < currentStep
                                            ? "text-success"
                                            : "text-muted-foreground"
                                    }`}
                            >
                                {index < currentStep ? "Done" : index === currentStep ? "In Progress" : "Pending"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
