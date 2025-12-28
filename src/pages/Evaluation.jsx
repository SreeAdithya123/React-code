import {
    BarChart,
    Brain,
    CheckCircle,
    Download,
    Lightbulb,
    MessageSquare,
    Share2,
    TrendingUp,
    XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const overallScore = 85;
const metrics = [
    { label: "Technical Accuracy", score: 90, color: "bg-success" },
    { label: "Communication", score: 85, color: "bg-primary" },
    { label: "Structure", score: 80, color: "bg-warning" },
    { label: "Body Language", score: 88, color: "bg-secondary" },
];

const feedback = [
    {
        type: "strength",
        icon: CheckCircle,
        color: "text-success",
        title: "Strong Technical Depth",
        description: "You demonstrated deep knowledge of React hooks and performance optimization strategies.",
    },
    {
        type: "strength",
        icon: CheckCircle,
        color: "text-success",
        title: "Clear Communication",
        description: "Your explanations were well-structured and easy to follow.",
    },
    {
        type: "improvement",
        icon: Lightbulb,
        color: "text-warning",
        title: "Elaborate on System Design",
        description: "Consider discussing scalability trade-offs in more detail next time.",
    },
    {
        type: "weakness",
        icon: XCircle,
        color: "text-destructive",
        title: "Pacing",
        description: "You spoke a bit too fast during the technical implementation section.",
    },
];

const detailedAnalysis = [
    {
        category: "Technical Skills",
        items: [
            { label: "Language Proficiency", score: "9/10" },
            { label: "Problem Solving", score: "8.5/10" },
            { label: "Code Quality", score: "9/10" },
        ],
    },
    {
        category: "Soft Skills",
        items: [
            { label: "Confidence", score: "8/10" },
            { label: "Clarity", score: "9/10" },
            { label: "Engagement", score: "8.5/10" },
        ],
    },
];

export default function Evaluation() {
    return (
        <DashboardLayout>
            <div className="mx-auto max-w-5xl space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Interview Evaluation</h1>
                        <p className="text-muted-foreground">Performance analysis for "Frontend Developer Interview"</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download Report
                        </Button>
                        <Button variant="hero" asChild>
                            <Link to="/dashboard">Back to Dashboard</Link>
                        </Button>
                    </div>
                </div>

                {/* Overall Score & Key Metrics */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Main Score Card */}
                    <div className="shadow-elevated relative overflow-hidden rounded-2xl border border-border bg-card p-6">
                        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                        <h2 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
                            <BarChart className="h-5 w-5 text-primary" />
                            Overall Score
                        </h2>

                        <div className="flex flex-col items-center justify-center p-4">
                            <div className="relative mb-4 flex h-40 w-40 items-center justify-center rounded-full border-[6px] border-primary/20 bg-card shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)]">
                                <svg className="absolute inset-0 h-full w-full -rotate-90">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="74"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="6"
                                        className="text-primary"
                                        strokeDasharray={`${2 * Math.PI * 74}`}
                                        strokeDashoffset={`${2 * Math.PI * 74 * (1 - overallScore / 100)}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="text-center">
                                    <span className="text-5xl font-bold text-foreground">{overallScore}</span>
                                    <span className="block text-sm font-medium text-muted-foreground">/ 100</span>
                                </div>
                            </div>
                            <p className="text-center font-medium text-success">Excellent Performance!</p>
                            <p className="text-center text-sm text-muted-foreground">Top 15% of candidates</p>
                        </div>
                    </div>

                    {/* Metrics Breakdown */}
                    <div className="shadow-card flex flex-col justify-between rounded-2xl border border-border bg-card p-6 lg:col-span-2">
                        <h2 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Performance Metrics
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {metrics.map((metric) => (
                                <div key={metric.label} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-foreground">{metric.label}</span>
                                        <span className="text-muted-foreground">{metric.score}/100</span>
                                    </div>
                                    <Progress value={metric.score} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Feedback */}
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <h2 className="mb-4 text-xl font-bold text-foreground">Detailed Feedback</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {feedback.map((item, index) => (
                                <Card key={index} className="border-border bg-card shadow-sm transition-all hover:shadow-md">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                        <div className={cn("rounded-full bg-background p-2 ring-1 ring-border", item.color)}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-border bg-card shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    AI Analysis
                                </CardTitle>
                                <CardDescription>Breakdown by category</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {detailedAnalysis.map((group) => (
                                    <div key={group.category}>
                                        <h4 className="mb-3 text-sm font-medium text-foreground">{group.category}</h4>
                                        <div className="space-y-3">
                                            {group.items.map((item) => (
                                                <div key={item.label} className="flex items-center justify-between rounded-lg bg-secondary/50 p-2">
                                                    <span className="text-sm text-muted-foreground">{item.label}</span>
                                                    <span className="font-medium text-foreground">{item.score}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-primary/20 bg-primary/5 shadow-none">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-primary">
                                    <MessageSquare className="h-5 w-5" />
                                    AI Recommendation
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed text-foreground">
                                    "You showed great potential in this interview. To improve your score, focus on structuring your system design answers more clearly and managing your speaking pace. Practice with the 'System Design Architecture' module."
                                </p>
                                <Button className="mt-4 w-full" variant="outline">
                                    Practice Recommended Module
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
