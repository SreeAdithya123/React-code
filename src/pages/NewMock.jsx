import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Briefcase,
    Building2,
    Clock,
    FileText,
    Gauge,
    Layers,
    Mic,
    MicOff,
    Play,
    Save,
    Video,
    X,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const roles = [
    "Software Engineer",
    "Senior Software Engineer",
    "Staff Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
];

const interviewTypes = [
    { value: "behavioral", label: "Behavioral", description: "STAR method questions" },
    { value: "technical", label: "Technical", description: "Coding & system design" },
    { value: "system-design", label: "System Design", description: "Architecture focused" },
    { value: "mixed", label: "Mixed", description: "Combination of all types" },
];

const recordingModes = [
    { value: "video-audio", label: "Video + Audio", icon: Video },
    { value: "audio-only", label: "Audio Only", icon: Mic },
    { value: "practice", label: "Practice Mode", icon: MicOff },
];

const templates = [
    { id: "1", name: "FAANG Behavioral", company: "General", questions: 12 },
    { id: "2", name: "Google SWE", company: "Google", questions: 8 },
    { id: "3", name: "Amazon Leadership", company: "Amazon", questions: 14 },
    { id: "4", name: "Meta Product Sense", company: "Meta", questions: 10 },
];

export default function NewMock() {
    const [title, setTitle] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [interviewType, setInterviewType] = useState("behavioral");
    const [difficulty, setDifficulty] = useState("medium");
    const [duration, setDuration] = useState([30]);
    const [recordingMode, setRecordingMode] = useState("video-audio");
    const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleStartMock = () => {
        if (!role) {
            toast({
                title: "Role required",
                description: "Please select a role to continue.",
                variant: "destructive",
            });
            return;
        }

        if (duration[0] < 5) {
            toast({
                title: "Duration too short",
                description: "Please select a duration of at least 5 minutes.",
                variant: "destructive",
            });
            return;
        }

        navigate("/interview/new/device-test");
    };

    const handleSaveDraft = () => {
        toast({
            title: "Draft saved",
            description: "You can continue this mock interview later.",
        });
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-2xl font-bold text-foreground">New Mock Interview</h1>
                    <p className="text-muted-foreground">Configure your mock interview settings and get started</p>
                </div>

                <div className="space-y-8">
                    {/* Basic Info */}
                    <section className="shadow-card rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Basic Information
                        </h2>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Mock Title (optional)</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Google SWE Practice #1"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role Applying For *</Label>
                                    <Select value={role} onValueChange={setRole}>
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((r) => (
                                                <SelectItem key={r} value={r}>
                                                    {r}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Company (optional)</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="company"
                                            placeholder="e.g., Google, Amazon..."
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interview Type */}
                    <section className="shadow-card rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Layers className="h-5 w-5 text-primary" />
                            Interview Type
                        </h2>
                        <RadioGroup
                            value={interviewType}
                            onValueChange={setInterviewType}
                            className="grid gap-3 sm:grid-cols-2"
                        >
                            {interviewTypes.map((type) => (
                                <Label
                                    key={type.value}
                                    htmlFor={type.value}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all",
                                        interviewType === type.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50",
                                    )}
                                >
                                    <RadioGroupItem value={type.value} id={type.value} />
                                    <div>
                                        <p className="font-medium text-foreground">{type.label}</p>
                                        <p className="text-sm text-muted-foreground">{type.description}</p>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    </section>

                    {/* Difficulty & Duration */}
                    <section className="shadow-card rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Gauge className="h-5 w-5 text-primary" />
                            Difficulty & Duration
                        </h2>
                        <div className="grid gap-6">
                            <div className="space-y-3">
                                <Label>Difficulty Level</Label>
                                <div className="flex gap-3">
                                    {["easy", "medium", "hard"].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setDifficulty(level)}
                                            className={cn(
                                                "flex-1 rounded-lg py-3 text-sm font-medium capitalize transition-all",
                                                difficulty === level
                                                    ? level === "easy"
                                                        ? "border-2 border-success bg-success/10 text-success"
                                                        : level === "medium"
                                                            ? "border-2 border-warning bg-warning/10 text-warning"
                                                            : "border-2 border-destructive bg-destructive/10 text-destructive"
                                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                            )}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Duration</Label>
                                    <span className="text-sm font-medium text-primary">{duration[0]} minutes</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <Slider
                                        value={duration}
                                        onValueChange={setDuration}
                                        min={5}
                                        max={90}
                                        step={5}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recording Mode */}
                    <section className="shadow-card rounded-xl border border-border bg-card p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Video className="h-5 w-5 text-primary" />
                            Recording Mode
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {recordingModes.map((mode) => (
                                <button
                                    key={mode.value}
                                    onClick={() => setRecordingMode(mode.value)}
                                    className={cn(
                                        "rounded-lg border-2 p-4 text-center transition-all",
                                        recordingMode === mode.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50",
                                    )}
                                >
                                    <mode.icon
                                        className={cn(
                                            "mx-auto mb-2 h-6 w-6",
                                            recordingMode === mode.value ? "text-primary" : "text-muted-foreground",
                                        )}
                                    />
                                    <p className="font-medium text-foreground">{mode.label}</p>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Template Selector */}
                    <section className="shadow-card rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                <FileText className="h-5 w-5 text-primary" />
                                Use Template (optional)
                            </h2>
                            <Button variant="outline" size="sm" onClick={() => setTemplateDialogOpen(true)}>
                                Browse Templates
                            </Button>
                        </div>
                        {selectedTemplate ? (
                            <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-4">
                                <div>
                                    <p className="font-medium text-foreground">
                                        {templates.find((t) => t.id === selectedTemplate)?.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {templates.find((t) => t.id === selectedTemplate)?.questions} questions
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
                                    Remove
                                </Button>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No template selected. Questions will be generated based on your settings.
                            </p>
                        )}
                    </section>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4">
                        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={handleSaveDraft}>
                                <Save className="mr-2 h-4 w-4" />
                                Save Draft
                            </Button>
                            <Button variant="hero" onClick={handleStartMock}>
                                <Play className="mr-2 h-4 w-4" />
                                Start Mock Interview
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Dialog */}
            <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Select a Template</DialogTitle>
                        <DialogDescription>Choose a pre-built template or create your own question set.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-3">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => {
                                    setSelectedTemplate(template.id);
                                    setTemplateDialogOpen(false);
                                }}
                                className={cn(
                                    "w-full rounded-lg border-2 p-4 text-left transition-all",
                                    selectedTemplate === template.id
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50",
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">{template.name}</p>
                                        <p className="text-sm text-muted-foreground">{template.company}</p>
                                    </div>
                                    <span className="text-sm font-medium text-primary">{template.questions} questions</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
