import { useState } from "react";
import { Bell, Camera, Mail, Save, Shield, User } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const roles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
];

const experienceLevels = [
    { value: "0-1", label: "0-1 years" },
    { value: "2-4", label: "2-4 years" },
    { value: "5-8", label: "5-8 years" },
    { value: "9+", label: "9+ years" },
];

export default function Profile() {
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john@example.com");
    const [experience, setExperience] = useState("5-8");
    const [preferredRoles, setPreferredRoles] = useState(["Software Engineer"]);
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false,
    });
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Profile updated",
            description: "Your changes have been saved successfully.",
        });
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="h-4 w-4" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="h-4 w-4" />
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2">
                            <Shield className="h-4 w-4" />
                            Security
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <div className="space-y-6">
                            {/* Avatar Section */}
                            <div className="shadow-card rounded-xl border border-border bg-card p-6">
                                <h2 className="mb-4 text-lg font-semibold text-foreground">Profile Photo</h2>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24">
                                            <AvatarImage src="" />
                                            <AvatarFallback className="gradient-bg text-2xl text-primary-foreground">
                                                JD
                                            </AvatarFallback>
                                        </Avatar>
                                        <button className="shadow-soft absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                                            <Camera className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm text-muted-foreground">
                                            Upload a new photo. Recommended size: 400x400px.
                                        </p>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                Upload
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Basic Info */}
                            <div className="shadow-card rounded-xl border border-border bg-card p-6">
                                <h2 className="mb-4 text-lg font-semibold text-foreground">Basic Information</h2>
                                <div className="grid gap-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="pl-9"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Experience Level</Label>
                                        <Select value={experience} onValueChange={setExperience}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {experienceLevels.map((level) => (
                                                    <SelectItem key={level.value} value={level.value}>
                                                        {level.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Preferred Roles</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {roles.map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() =>
                                                        setPreferredRoles((prev) =>
                                                            prev.includes(role)
                                                                ? prev.filter((r) => r !== role)
                                                                : [...prev, role]
                                                        )
                                                    }
                                                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${preferredRoles.includes(role)
                                                            ? "gradient-bg text-primary-foreground"
                                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                                        }`}
                                                >
                                                    {role}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="notifications">
                        <div className="shadow-card rounded-xl border border-border bg-card p-6">
                            <h2 className="mb-4 text-lg font-semibold text-foreground">
                                Notification Preferences
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                    <div>
                                        <p className="font-medium text-foreground">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive updates about your interviews via email
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.email}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, email: checked }))
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                    <div>
                                        <p className="font-medium text-foreground">Push Notifications</p>
                                        <p className="text-sm text-muted-foreground">
                                            Get notified in your browser
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.push}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, push: checked }))
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                                    <div>
                                        <p className="font-medium text-foreground">Marketing Emails</p>
                                        <p className="text-sm text-muted-foreground">
                                            Receive tips and product updates
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notifications.marketing}
                                        onCheckedChange={(checked) =>
                                            setNotifications((prev) => ({ ...prev, marketing: checked }))
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="security">
                        <div className="space-y-6">
                            <div className="shadow-card rounded-xl border border-border bg-card p-6">
                                <h2 className="mb-4 text-lg font-semibold text-foreground">Change Password</h2>
                                <div className="max-w-md space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <Button>Update Password</Button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                                <h2 className="mb-2 text-lg font-semibold text-destructive">Danger Zone</h2>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end">
                    <Button variant="hero" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
