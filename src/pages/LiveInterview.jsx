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

export default function LiveInterview() {
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
            <header className="flex items-center justify-between px-6 py-4">
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
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#61DAFB]" fill="currentColor">
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
            <main className="flex flex-1 flex-col gap-6 px-6 py-4">
                <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* AI Interviewer Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-75 blur-sm transition-opacity group-hover:opacity-100" />
                        <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-card p-8 lg:min-h-[400px]">
                            {/* AI Avatar with Speaking Animation */}
                            <div className="relative mb-6">
                                {/* Outer Ring Animation */}
                                <div
                                    className={cn(
                                        "absolute inset-0 scale-[1.4] rounded-full border-2 border-primary/30 transition-all duration-500",
                                        isAISpeaking && "animate-ping opacity-50",
                                    )}
                                />
                                <div
                                    className={cn(
                                        "absolute inset-0 scale-[1.2] rounded-full border-2 border-primary/50 transition-all duration-300",
                                        isAISpeaking && "animate-pulse",
                                    )}
                                />

                                {/* Avatar Container */}
                                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-primary/20 bg-gradient-to-br from-secondary to-muted md:h-36 md:w-36">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-lg md:h-24 md:w-24">
                                        <MessageCircle
                                            className={cn(
                                                "h-10 w-10 text-primary transition-transform duration-300 md:h-12 md:w-12",
                                                isAISpeaking && "scale-110",
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold text-foreground md:text-2xl">AI Interviewer</h2>

                            {/* Speaking Indicator */}
                            <div
                                className={cn(
                                    "mt-3 flex items-center gap-1.5 transition-opacity duration-300",
                                    isAISpeaking ? "opacity-100" : "opacity-0",
                                )}
                            >
                                <span
                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "0ms" }}
                                />
                                <span
                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "150ms" }}
                                />
                                <span
                                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                                    style={{ animationDelay: "300ms" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Card */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/30 to-primary/30 opacity-50 blur-sm transition-opacity group-hover:opacity-75" />
                        <div className="relative flex h-full min-h-[320px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-card p-8 lg:min-h-[400px]">
                            {/* User Avatar */}
                            <div className="relative mb-6">
                                <Avatar className="h-28 w-28 border-4 border-accent/30 md:h-36 md:w-36">
                                    <AvatarImage
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                                        alt="User"
                                    />
                                    <AvatarFallback className="bg-accent text-3xl text-accent-foreground">AD</AvatarFallback>
                                </Avatar>

                                {/* Camera/Mic Status Indicator */}
                                <div className="absolute -bottom-2 -right-2 flex gap-1">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
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
                                            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
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

                            <h2 className="text-xl font-semibold text-foreground md:text-2xl">Adrian (You)</h2>

                            {/* Listening Indicator */}
                            <p className="mt-2 text-sm text-muted-foreground">
                                {!isAISpeaking ? "Your turn to respond..." : "Listening..."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Question Bar */}
                <div className="w-full">
                    <div className="glass shadow-elevated rounded-2xl px-6 py-5 text-center">
                        <p className="text-lg text-foreground md:text-xl">
                            {currentQ.text}
                            <span className="mx-1 inline-block rounded-lg border border-border bg-card px-3 py-1 font-medium text-foreground">
                                {currentQ.highlight}
                            </span>
                            {currentQ.suffix}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 pb-6">
                    <Button variant="secondary" size="lg" onClick={repeatQuestion} className="gap-2 px-8 py-6 text-base">
                        <RotateCcw className="h-5 w-5" />
                        Repeat
                    </Button>

                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={() => setLeaveDialogOpen(true)}
                        className="gap-2 px-8 py-6 text-base"
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
