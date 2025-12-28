import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Calendar,
    Clock,
    Copy,
    FileText,
    Filter,
    MoreHorizontal,
    Play,
    Plus,
    Search,
    Share2,
    Star,
    Trash2,
    TrendingUp,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockInterviews = [
    {
        id: "1",
        title: "Senior Software Engineer",
        company: "Google",
        date: "2024-01-15",
        duration: "45 min",
        rating: 4.5,
        type: "Technical",
        transcript: "Tell me about a time when you had to debug a complex issue...",
    },
    {
        id: "2",
        title: "Product Manager",
        company: "Meta",
        date: "2024-01-12",
        duration: "30 min",
        rating: 4.0,
        type: "Behavioral",
        transcript: "How do you prioritize features when resources are limited...",
    },
    {
        id: "3",
        title: "Frontend Developer",
        company: "Amazon",
        date: "2024-01-10",
        duration: "40 min",
        rating: 3.5,
        type: "Technical",
        transcript: "Explain the difference between CSS Grid and Flexbox...",
    },
    {
        id: "4",
        title: "Data Scientist",
        company: "Netflix",
        date: "2024-01-08",
        duration: "50 min",
        rating: 4.8,
        type: "Mixed",
        transcript: "Walk me through your approach to A/B testing...",
    },
];

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedMock, setSelectedMock] = useState(null);
    const navigate = useNavigate();
    const { toast } = useToast();

    const filteredInterviews = mockInterviews.filter((interview) => {
        const matchesSearch =
            interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interview.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || interview.type.toLowerCase() === roleFilter;
        return matchesSearch && matchesRole;
    });

    const totalMocks = mockInterviews.length;
    const averageRating = (mockInterviews.reduce((sum, m) => sum + m.rating, 0) / mockInterviews.length).toFixed(1);

    const handleDelete = () => {
        toast({
            title: "Mock interview deleted",
            description: "The interview has been removed from your history.",
        });
        setDeleteDialogOpen(false);
        setSelectedMock(null);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < fullStars
                                ? "fill-warning text-warning"
                                : i === fullStars && hasHalfStar
                                    ? "fill-warning/50 text-warning"
                                    : "text-muted-foreground/30"
                            }`}
                    />
                ))}
                <span className="ml-1 text-sm font-medium text-foreground">{rating}</span>
            </div>
        );
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">My Mock Interviews</h1>
                        <p className="text-muted-foreground">Practice, review, and improve your interview skills</p>
                    </div>
                    <Button variant="hero" asChild>
                        <Link to="/new-mock">
                            <Plus className="h-4 w-4" />
                            New Mock Interview
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="shadow-card rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <TrendingUp className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{totalMocks}</p>
                                <p className="text-sm text-muted-foreground">Total Mocks</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-card rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                                <Star className="h-5 w-5 text-warning" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{averageRating}</p>
                                <p className="text-sm text-muted-foreground">Average Rating</p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-card rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                                <Clock className="h-5 w-5 text-success" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">5.2h</p>
                                <p className="text-sm text-muted-foreground">Practice Time</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search by role or company..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="behavioral">Behavioral</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Interview Cards */}
                <div className="grid gap-4">
                    {filteredInterviews.length === 0 ? (
                        <div className="rounded-xl border border-border bg-card py-12 text-center">
                            <p className="mb-4 text-muted-foreground">No mock interviews found</p>
                            <Button variant="hero" asChild>
                                <Link to="/new-mock">
                                    <Plus className="h-4 w-4" />
                                    Start Your First Mock
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        filteredInterviews.map((interview) => (
                            <div
                                key={interview.id}
                                className="shadow-card hover:shadow-elevated rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20"
                            >
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-1 flex items-center gap-2">
                                            <h3 className="truncate font-semibold text-foreground">{interview.title}</h3>
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                {interview.type}
                                            </span>
                                        </div>
                                        <div className="mb-2 flex items-center gap-4 text-sm text-muted-foreground">
                                            <span className="font-medium text-foreground">{interview.company}</span>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {new Date(interview.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                {interview.duration}
                                            </div>
                                        </div>
                                        <p className="truncate text-sm text-muted-foreground">"{interview.transcript}"</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {renderStars(interview.rating)}

                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => navigate(`/interview/${interview.id}/player`)}
                                            >
                                                <Play className="h-4 w-4" />
                                                Play
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => navigate(`/interview/${interview.id}/evaluation`)}
                                            >
                                                <FileText className="h-4 w-4" />
                                                Evaluation
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Copy className="mr-2 h-4 w-4" />
                                                        Duplicate
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Share2 className="mr-2 h-4 w-4" />
                                                        Share
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => {
                                                            setSelectedMock(interview.id);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete mock interview?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this mock interview and all associated data
                            including recordings and transcripts.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DashboardLayout>
    );
}
