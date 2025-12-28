import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, Home, MicOff, RefreshCw, Video, WifiOff } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ type = "404" }) {
    const navigate = useNavigate();

    const errorConfig = {
        "404": { icon: AlertTriangle, title: "Page Not Found", description: "The page you're looking for doesn't exist.", action: "Go Home", href: "/" },
        mic: { icon: MicOff, title: "Microphone Access Denied", description: "Please allow microphone access in your browser settings to continue.", action: "Try Again", href: null },
        recording: { icon: Video, title: "Recording Failed", description: "There was an issue with the recording. Please check your device settings.", action: "Retry", href: null },
        network: { icon: WifiOff, title: "Connection Lost", description: "Your internet connection was interrupted. Please check your connection.", action: "Reconnect", href: null },
    };

    const config = errorConfig[type];
    const Icon = config.icon;

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-destructive/10">
                    <Icon className="h-12 w-12 text-destructive" />
                </div>
                <h1 className="mb-4 text-3xl font-bold text-foreground">{config.title}</h1>
                <p className="mb-8 text-muted-foreground">{config.description}</p>
                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    {config.href ? (
                        <Button variant="hero" asChild><Link to={config.href}><Home className="mr-2 h-4 w-4" />{config.action}</Link></Button>
                    ) : (
                        <Button variant="hero" onClick={() => window.location.reload()}><RefreshCw className="mr-2 h-4 w-4" />{config.action}</Button>
                    )}
                    <Button variant="outline" onClick={() => navigate(-1)}>Go Back</Button>
                </div>
            </div>
        </div>
    );
}
