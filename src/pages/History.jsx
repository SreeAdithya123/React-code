import { useState } from "react";
import { Link } from "react-router-dom";
import {
    BarChart3,
    Calendar,
    CheckSquare,
    Download,
    FileText,
    Filter,
    Play,
    Search,
    Star,
    Trash2,
} from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const historyData = [
    { id: "1", title: "Senior SWE", company: "Google", date: "2024-01-15", duration: "45 min", rating: 4.5, type: "Technical" },
    { id: "2", title: "Product Manager", company: "Meta", date: "2024-01-12", duration: "30 min", rating: 4.0, type: "Behavioral" },
    { id: "3", title: "Frontend Dev", company: "Amazon", date: "2024-01-10", duration: "40 min", rating: 3.5, type: "Technical" },
    { id: "4", title: "Data Scientist", company: "Netflix", date: "2024-01-08", duration: "50 min", rating: 4.8, type: "Mixed" },
    { id: "5", title: "DevOps Engineer", company: "Apple", date: "2024-01-05", duration: "35 min", rating: 4.2, type: "Technical" },
    { id: "6", title: "UX Designer", company: "Spotify", date: "2024-01-03", duration: "25 min", rating: 3.8, type: "Behavioral" },
];

export default function History() {
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedItems, setSelectedItems] = useState([]);
    const { toast } = useToast();

    const filteredData = historyData.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || item.type.toLowerCase() === roleFilter;
        return matchesSearch && matchesRole;
    });

    const toggleSelectAll = () => {
        if (selectedItems.length === filteredData.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredData.map((item) => item.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleBulkExport = () => {
        toast({
            title: "Exporting selected interviews",
            description: `${selectedItems.length} interviews will be exported.`,
        });
    };

    const handleBulkDelete = () => {
        toast({
            title: "Deleted",
            description: `${selectedItems.length} interviews have been deleted.`,
        });
        setSelectedItems([]);
    };

    const renderStars = (rating) => (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-warning text-warning" : "text-muted-foreground/30"
                        }`}
                />
            ))}
            <span className="ml-1 text-sm font-medium">{rating}</span>
        </div>
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Interview History</h1>
                        <p className="text-muted-foreground">View and manage all your past mock interviews</p>
                    </div>
                    {selectedItems.length > 0 && (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleBulkExport}>
                                <Download className="mr-2 h-4 w-4" />
                                Export ({selectedItems.length})
                            </Button>
                            <Link to={`/compare?ids=${selectedItems.join(",")}`}>
                                <Button variant="default">
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    Compare ({selectedItems.length})
                                </Button>
                            </Link>
                            <Button variant="destructive" onClick={handleBulkDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="relative max-w-md flex-1">
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

                {/* Table */}
                <div className="shadow-card overflow-hidden rounded-xl border border-border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-12">
                                    <Checkbox
                                        checked={selectedItems.length === filteredData.length && filteredData.length > 0}
                                        onCheckedChange={toggleSelectAll}
                                    />
                                </TableHead>
                                <TableHead>Interview</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item) => (
                                <TableRow key={item.id} className="hover:bg-accent/50">
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedItems.includes(item.id)}
                                            onCheckedChange={() => toggleSelect(item.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.company}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(item.date).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.duration}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{item.type}</Badge>
                                    </TableCell>
                                    <TableCell>{renderStars(item.rating)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link to={`/interview/${item.id}/player`}>
                                                    <Play className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link to={`/interview/${item.id}/evaluation`}>
                                                    <FileText className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {filteredData.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-muted-foreground">No interviews found matching your criteria.</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
