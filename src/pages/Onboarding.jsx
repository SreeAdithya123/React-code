import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Briefcase, Building2, Check, Clock, Video } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const experienceLevels = [
    { value: "0-1", label: "0-1 years", description: "Entry level / Fresh graduate" },
    { value: "2-4", label: "2-4 years", description: "Early career professional" },
    { value: "5-8", label: "5-8 years", description: "Mid-level professional" },
    { value: "9+", label: "9+ years", description: "Senior / Leadership" },
];

const roles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Data Analyst",
    "QA Engineer",
    "Technical Writer",
];

const companies = [
    "Google",
    "Meta",
    "Amazon",
    "Apple",
    "Microsoft",
    "Netflix",
    "Stripe",
    "Airbnb",
    "Uber",
    "LinkedIn",
    "Salesforce",
    "Adobe",
];

export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [experience, setExperience] = useState("");
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [customCompany, setCustomCompany] = useState("");
    const navigate = useNavigate();
    const { toast } = useToast();

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const toggleRole = (role) => {
        setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
    };

    const toggleCompany = (company) => {
        setSelectedCompanies((prev) => (prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]));
    };

    const handleNext = () => {
        if (step === 1 && !experience) {
            toast({
                title: "Please select your experience level",
                variant: "destructive",
            });
            return;
        }
        if (step === 2 && selectedRoles.length === 0) {
            toast({
                title: "Please select at least one role",
                variant: "destructive",
            });
            return;
        }
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleFinish = () => {
        toast({
            title: "Profile setup complete!",
            description: "Welcome to MockMaster. Let's ace those interviews!",
        });
        navigate("/dashboard");
    };

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="border-b border-border px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg">
                            <Video className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground">MockMaster</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            Step {step} of {totalSteps}
                        </span>
                        <Progress value={progress} className="h-2 w-24" />
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto max-w-2xl flex-1 px-6 py-12">
                {/* Step 1: Experience */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground">What's your experience level?</h1>
                        </div>
                        <p className="ml-13 mb-8 text-muted-foreground">This helps us personalize your interview questions.</p>

                        <div className="grid gap-3">
                            {experienceLevels.map((level) => (
                                <button
                                    key={level.value}
                                    onClick={() => setExperience(level.value)}
                                    className={cn(
                                        "p-4 rounded-xl border-2 text-left transition-all duration-200",
                                        experience === level.value
                                            ? "border-primary bg-primary/5 shadow-soft"
                                            : "border-border hover:border-primary/50 hover:bg-accent",
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-foreground">{level.label}</p>
                                            <p className="text-sm text-muted-foreground">{level.description}</p>
                                        </div>
                                        {experience === level.value && (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full gradient-bg">
                                                <Check className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Roles */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground">What roles are you interested in?</h1>
                        </div>
                        <p className="ml-13 mb-8 text-muted-foreground">
                            Select all that apply. We'll tailor questions accordingly.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {roles.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => toggleRole(role)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        selectedRoles.includes(role)
                                            ? "gradient-bg text-primary-foreground shadow-soft"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                    )}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>

                        {selectedRoles.length > 0 && (
                            <p className="mt-4 text-sm text-muted-foreground">
                                {selectedRoles.length} role{selectedRoles.length > 1 ? "s" : ""} selected
                            </p>
                        )}
                    </div>
                )}

                {/* Step 3: Companies */}
                {step === 3 && (
                    <div className="animate-fade-in">
                        <div className="mb-2 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                <Building2 className="h-5 w-5 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground">Target companies (optional)</h1>
                        </div>
                        <p className="ml-13 mb-8 text-muted-foreground">We'll include company-specific questions when available.</p>

                        <div className="mb-6 flex flex-wrap gap-2">
                            {companies.map((company) => (
                                <button
                                    key={company}
                                    onClick={() => toggleCompany(company)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        selectedCompanies.includes(company)
                                            ? "gradient-bg text-primary-foreground shadow-soft"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                    )}
                                >
                                    {company}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="customCompany">Add other companies</Label>
                            <Input
                                id="customCompany"
                                placeholder="e.g., Spotify, Shopify..."
                                value={customCompany}
                                onChange={(e) => setCustomCompany(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-4">
                <div className="container mx-auto flex max-w-2xl items-center justify-between">
                    <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>

                    {step < totalSteps ? (
                        <Button variant="hero" onClick={handleNext} className="gap-2">
                            Next
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button variant="hero" onClick={handleFinish} className="gap-2">
                            Finish Setup
                            <Check className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}
