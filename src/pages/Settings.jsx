import { useState } from "react";
import { Mic, Monitor, RefreshCw, Save, Video } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function Settings() {
    const [videoResolution, setVideoResolution] = useState("1080p");
    const [audioQuality, setAudioQuality] = useState("high");
    const [selectedCamera, setSelectedCamera] = useState("default");
    const [selectedMicrophone, setSelectedMicrophone] = useState("default");
    const [audioLevel, setAudioLevel] = useState([75]);
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings saved",
            description: "Your recording preferences have been updated.",
        });
    };

    const testMicrophone = () => {
        toast({
            title: "Testing microphone...",
            description: "Speak into your microphone to test the audio level.",
        });
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground">Recording Settings</h1>
                    <p className="text-muted-foreground">
                        Configure your camera and microphone preferences
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Video Settings */}
                    <div className="shadow-card rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Video className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Video Settings</h2>
                                <p className="text-sm text-muted-foreground">Configure video quality and device</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Video Resolution</Label>
                                <Select value={videoResolution} onValueChange={setVideoResolution}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="720p">720p (HD)</SelectItem>
                                        <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                                        <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Camera</Label>
                                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default Camera</SelectItem>
                                        <SelectItem value="facetime">FaceTime HD Camera</SelectItem>
                                        <SelectItem value="logitech">Logitech C920</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Camera Preview */}
                            <div className="aspect-video flex items-center justify-center rounded-lg border border-border bg-muted/50">
                                <div className="text-center">
                                    <Monitor className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Camera preview</p>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Refresh Preview
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Audio Settings */}
                    <div className="shadow-card rounded-xl border border-border bg-card p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                                <Mic className="h-5 w-5 text-success" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Audio Settings</h2>
                                <p className="text-sm text-muted-foreground">Configure audio quality and device</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Audio Quality</Label>
                                <Select value={audioQuality} onValueChange={setAudioQuality}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low (64 kbps)</SelectItem>
                                        <SelectItem value="medium">Medium (128 kbps)</SelectItem>
                                        <SelectItem value="high">High (256 kbps)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Microphone</Label>
                                <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Default Microphone</SelectItem>
                                        <SelectItem value="builtin">Built-in Microphone</SelectItem>
                                        <SelectItem value="airpods">AirPods Pro</SelectItem>
                                        <SelectItem value="blue">Blue Yeti</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Input Volume</Label>
                                    <span className="text-sm text-muted-foreground">{audioLevel[0]}%</span>
                                </div>
                                <Slider value={audioLevel} onValueChange={setAudioLevel} max={100} step={1} />
                            </div>

                            {/* Audio Level Indicator */}
                            <div className="rounded-lg border border-border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">Audio Level</span>
                                    <Button variant="outline" size="sm" onClick={testMicrophone}>
                                        Test Microphone
                                    </Button>
                                </div>
                                <div className="h-4 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-success via-success to-warning transition-all duration-100"
                                        style={{ width: "35%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button variant="hero" onClick={handleSave}>
                            <Save className="mr-2 h-4 w-4" />
                            Save Settings
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
