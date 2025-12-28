import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart3,
    Clock,
    Download,
    FastForward,
    FileText,
    Maximize,
    Pause,
    Play,
    Rewind,
    Scissors,
    Volume2,
    VolumeX,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const transcriptData = [
    {
        time: "00:00",
        speaker: "Interviewer",
        text: "Tell me about a time when you had to work under pressure to meet a tight deadline.",
    },
    {
        time: "00:15",
        speaker: "You",
        text: "Sure, I'd be happy to share an example. In my previous role as a software engineer...",
    },
    {
        time: "00:45",
        speaker: "You",
        text: "We had a critical feature that needed to be shipped within two weeks, but we discovered a major technical blocker...",
    },
    {
        time: "01:30",
        speaker: "You",
        text: "I organized daily standups, broke down the work into smaller tasks, and coordinated with the team to parallelize efforts...",
    },
    {
        time: "02:15",
        speaker: "You",
        text: "In the end, we delivered the feature on time and it exceeded the expected performance benchmarks by 20%.",
    },
    {
        time: "02:45",
        speaker: "Interviewer",
        text: "That's great. Can you elaborate on the specific technical challenge you faced?",
    },
    {
        time: "03:00",
        speaker: "You",
        text: "Absolutely. The main issue was with our database queries which were taking too long...",
    },
];

export default function InterviewPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration] = useState(300); // 5 minutes
    const [volume, setVolume] = useState([80]);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(0);
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleExport = (format) => {
        toast({
            title: "Export started",
            description: `Your transcript will be downloaded as ${format.toUpperCase()}.`,
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Interview Review</h1>
                        <p className="text-muted-foreground">Senior Software Engineer - Google • Jan 15, 2024</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => navigate("/interview/new/evaluation")}>
                            <BarChart3 className="mr-2 h-4 w-4" />
                            View Evaluation
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleExport("txt")}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Text (.txt)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport("srt")}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Subtitles (.srt)
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    PDF Document
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Video Player */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="shadow-elevated relative aspect-video overflow-hidden rounded-2xl border border-border bg-foreground/5">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover"
                                poster="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1280&h=720&fit=crop"
                            />

                            {/* Play Overlay */}
                            {!isPlaying && (
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="group absolute inset-0 flex items-center justify-center bg-foreground/20"
                                >
                                    <div className="shadow-glow flex h-20 w-20 items-center justify-center rounded-full gradient-bg transition-transform group-hover:scale-110">
                                        <Play className="ml-1 h-8 w-8 text-primary-foreground" />
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Video Controls */}
                        <div className="shadow-card rounded-xl border border-border bg-card p-4">
                            {/* Progress Bar */}
                            <div className="mb-4">
                                <Slider
                                    value={[currentTime]}
                                    max={duration}
                                    step={1}
                                    onValueChange={([value]) => setCurrentTime(value)}
                                    className="cursor-pointer"
                                />
                                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Control Buttons */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                                        <Rewind className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="h-12 w-12 rounded-full"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                    >
                                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}
                                    >
                                        <FastForward className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* Volume */}
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                                            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                        </Button>
                                        <Slider
                                            value={isMuted ? [0] : volume}
                                            max={100}
                                            step={1}
                                            onValueChange={setVolume}
                                            className="w-24"
                                        />
                                    </div>

                                    {/* Playback Speed */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {playbackSpeed}x
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                                <DropdownMenuItem key={speed} onClick={() => setPlaybackSpeed(speed)}>
                                                    {speed}x
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button variant="ghost" size="icon">
                                        <Maximize className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1">
                                <Download className="mr-2 h-4 w-4" />
                                Download Video
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Scissors className="mr-2 h-4 w-4" />
                                Create Clip
                            </Button>
                        </div>
                    </div>

                    {/* Transcript Panel */}
                    <div className="lg:col-span-1">
                        <div className="shadow-card flex h-[600px] flex-col rounded-xl border border-border bg-card p-4">
                            <Tabs defaultValue="transcript" className="flex flex-1 flex-col">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                                    <TabsTrigger value="clean">Clean</TabsTrigger>
                                    <TabsTrigger value="speakers">Speakers</TabsTrigger>
                                </TabsList>

                                <TabsContent value="transcript" className="mt-4 flex-1 overflow-y-auto">
                                    <div className="space-y-4">
                                        {transcriptData.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setActiveTranscriptIndex(index);
                                                    // Would seek video to timestamp
                                                }}
                                                className={cn(
                                                    "w-full rounded-lg p-3 text-left transition-all",
                                                    activeTranscriptIndex === index
                                                        ? "border border-primary/20 bg-primary/10"
                                                        : "hover:bg-accent",
                                                )}
                                            >
                                                <div className="mb-1 flex items-center gap-2">
                                                    <Clock className="h-3 w-3 text-primary" />
                                                    <span className="text-xs font-medium text-primary">{item.time}</span>
                                                    <span
                                                        className={cn(
                                                            "rounded-full px-2 py-0.5 text-xs font-medium",
                                                            item.speaker === "You" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                                                        )}
                                                    >
                                                        {item.speaker}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-foreground">{item.text}</p>
                                            </button>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="clean" className="mt-4 flex-1 overflow-y-auto">
                                    <div className="prose prose-sm text-foreground">
                                        {transcriptData
                                            .filter((item) => item.speaker === "You")
                                            .map((item) => item.text)
                                            .join(" ")}
                                    </div>
                                </TabsContent>

                                <TabsContent value="speakers" className="mt-4 flex-1 overflow-y-auto">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="mb-2 text-sm font-medium text-foreground">You (5 responses)</h4>
                                            <div className="space-y-2">
                                                {transcriptData
                                                    .filter((item) => item.speaker === "You")
                                                    .map((item, index) => (
                                                        <p key={index} className="text-sm text-muted-foreground">
                                                            {item.text}
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 text-sm font-medium text-foreground">Interviewer (2 questions)</h4>
                                            <div className="space-y-2">
                                                {transcriptData
                                                    .filter((item) => item.speaker === "Interviewer")
                                                    .map((item, index) => (
                                                        <p key={index} className="text-sm text-muted-foreground">
                                                            {item.text}
                                                        </p>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
