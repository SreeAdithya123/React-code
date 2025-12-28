import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageCircle, Mic, MicOff, PhoneOff, RotateCcw, Settings, Video, VideoOff } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockQuestions = [
    { text: "What job ", highlight: "experience level", suffix: " are you targeting?" },
    { text: "Tell me about a time when you ", highlight: "led a team", suffix: " through a difficult project." },
    { text: "How do you approach ", highlight: "problem solving", suffix: " in complex situations?" },
    { text: "What makes you ", highlight: "passionate", suffix: " about this role?" },
    { text: "Describe your ", highlight: "biggest achievement", suffix: " in your career so far." },
];

export default function InterviewRoom() {
    const [currentQuestion] = useState(0);
    const [isAISpeaking, setIsAISpeaking] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const { id } = useParams();

    // Simulate AI speaking animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAISpeaking((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const repeatQuestion = () => {
        toast({
            title: "Repeating question",
            description: "The AI interviewer will repeat the current question.",
        });
    };

    const leaveInterview = () => {
        setLeaveDialogOpen(false);
        navigate(`/interview/${id || "new"}/processing`);
    };

    const currentQ = mockQuestions[currentQuestion];

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-4">
                    {/* Logo/Title */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
                            <span className="text-lg font-bold text-primary-foreground">M</span>
                        </div>
                        <h1 className="text-xl font-bold text-foreground md:text-2xl">Frontend Developer Interview</h1>
                    </div>

                    {/* Tech Icons */}
                    <div className="ml-2 hidden items-center gap-2 md:flex">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="currentColor">
                                <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
                                <path d="M12 21.35c-1.37 0-2.63-.15-3.73-.43-.93-.24-1.73-.55-2.38-.93-.68-.4-1.18-.86-1.5-1.37-.32-.52-.47-1.08-.47-1.62 0-.54.15-1.1.47-1.62.32-.51.82-.97 1.5-1.37.65-.38 1.45-.69 2.38-.93 1.1-.28 2.36-.43 3.73-.43 1.37 0 2.63.15 3.73.43.93.24 1.73.55 2.38.93.68.4 1.18.86 1.5 1.37.32.52.47 1.08.47 1.62 0 .54-.15 1.1-.47 1.62-.32.51-.82.97-1.5 1.37-.65.38-1.45.69-2.38.93-1.1.28-2.36.43-3.73.43Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <Badge variant="outline" className="border-primary/30 bg-secondary px-4 py-1.5 text-sm text-foreground">
                    Technical Interview
                </Badge>
            </header>

            {/* Main Content - Interview Cards */}
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-6">
                <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* AI Interviewer Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-60 blur-sm transition-opacity group-hover:opacity-80" />
                        <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-8 lg:min-h-[380px]">
                            {/* AI Avatar with Speaking Animation */}
                            <div className="relative mb-6">
                                {/* Outer Ring Animation */}
                                <div
                                    className={cn(
                                        "absolute inset-0 scale-[1.5] rounded-full border-2 border-primary/30 transition-all duration-700",
                                        isAISpeaking && "animate-ping opacity-40",
                                    )}
                                />
                                <div
                                    className={cn(
                                        "absolute inset-0 scale-[1.25] rounded-full border-2 border-primary/40 transition-all duration-500",
                                        isAISpeaking && "animate-pulse",
                                    )}
                                />

                                {/* Avatar Container */}
                                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/20 to-accent/20 md:h-40 md:w-40">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-card shadow-xl md:h-28 md:w-28">
                                        <MessageCircle
                                            className={cn(
                                                "h-12 w-12 text-primary transition-transform duration-300 md:h-14 md:w-14",
                                                isAISpeaking && "scale-110",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">AI Interviewer</h2>

                            {/* Speaking Indicator */}
                            <div
                                className={cn(
                                    "mt-4 flex items-center gap-2 transition-opacity duration-300",
                                    isAISpeaking ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <span
                                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "0ms" }}
                                />
                                <span
                                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "150ms" }}
                                />
                                <span
                                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "300ms" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/30 to-primary/30 opacity-40 blur-sm transition-opacity group-hover:opacity-60" />
                        <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-8 lg:min-h-[380px]">
                            {/* User Avatar */}
                            <div className="relative mb-6">
                                <Avatar className="h-32 w-32 border-4 border-accent/30 md:h-40 md:w-40">
                                    <AvatarImage
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                                        alt="User"
                                    />
                                    <AvatarFallback className="bg-accent text-4xl text-accent-foreground">AD</AvatarFallback>
                                </Avatar>

                                {/* Camera/Mic Status Indicator */}
                                <div className="absolute -bottom-2 -right-2 flex gap-1">
                                    <div
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-full border-2 border-card transition-colors",
                                            isMuted ? "bg-destructive" : "bg-success",
                                        )}
                                    >
                                        {isMuted ? (
                                            <MicOff className="h-4 w-4 text-destructive-foreground" />
                                        ) : (
                                            <Mic className="h-4 w-4 text-success-foreground" />
                                        )}
                                    </div>
                                    <div
                                        className={cn(
                                            "flex h-9 w-9 items-center justify-center rounded-full border-2 border-card transition-colors",
                                            isCameraOff ? "bg-destructive" : "bg-success",
                                        )}
                                    >
                                        {isCameraOff ? (
                                            <VideoOff className="h-4 w-4 text-destructive-foreground" />
                                        ) : (
                                            <Video className="h-4 w-4 text-success-foreground" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Adrian (You)</h2>

                            {/* Listening Indicator */}
                            <p className="mt-3 text-sm text-muted-foreground">
                                {!isAISpeaking ? "Your turn to respond..." : "Listening..."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question Bar */}
                <div className="w-full">
                    <div className="glass shadow-elevated rounded-2xl px-8 py-6 text-center">
                        <p className="text-lg leading-relaxed text-foreground md:text-xl lg:text-2xl">
                            {currentQ.text}
                            <span className="mx-1 inline-block rounded-lg border border-border bg-card px-4 py-1.5 font-medium text-foreground shadow-sm">
                                {currentQ.highlight}
                            </span>
                            {currentQ.suffix}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 pb-4">
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={repeatQuestion}
                        className="gap-3 rounded-xl px-10 py-6 text-base"
                    >
                        <RotateCcw className="h-5 w-5" />
                        Repeat
                    </Button>

                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => setLeaveDialogOpen(true)}
                        className="gap-3 rounded-xl px-10 py-6 text-base"
                    >
                        <PhoneOff className="h-5 w-5" />
                        Leave interview
                    </Button>
                </div>
            </main>

            {/* Quick Controls - Floating */}
            <div className="fixed bottom-6 left-6 flex gap-2">
                <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-12 w-12 rounded-full shadow-lg"
                >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                    variant={isCameraOff ? "destructive" : "outline"}
                    size="icon"
                    onClick={() => setIsCameraOff(!isCameraOff)}
                    className="h-12 w-12 rounded-full shadow-lg"
                >
                    {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
            </div>

            {/* Leave Interview Dialog */}
            <AlertDialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <PhoneOff className="h-5 w-5 text-destructive" />
                            Leave Interview?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to leave this interview? Your progress will be saved and you'll be taken to the
                            evaluation screen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Continue Interview</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={leaveInterview}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Leave Interview
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
