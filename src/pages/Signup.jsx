import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, User, Video } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const getPasswordStrength = () => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
        return strength;
    };

    const passwordStrength = getPasswordStrength();

    const getStrengthColor = () => {
        if (passwordStrength <= 25) return "bg-destructive";
        if (passwordStrength <= 50) return "bg-warning";
        if (passwordStrength <= 75) return "bg-primary";
        return "bg-success";
    };

    const getStrengthText = () => {
        if (passwordStrength <= 25) return "Weak";
        if (passwordStrength <= 50) return "Fair";
        if (passwordStrength <= 75) return "Good";
        return "Strong";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords don't match",
                variant: "destructive",
            });
            return;
        }

        if (passwordStrength < 50) {
            toast({
                title: "Error",
                description: "Please use a stronger password",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        // Simulate signup
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
            title: "Account created!",
            description: "Let's set up your profile.",
        });

        navigate("/onboarding");
        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel - Visual */}
            <div className="hidden items-center justify-center overflow-hidden p-12 lg:flex lg:w-1/2 gradient-bg relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                <div className="relative max-w-md text-primary-foreground">
                    <h2 className="mb-8 text-3xl font-bold">Start your journey to interview success</h2>
                    <div className="space-y-4">
                        {[
                            "Practice with AI-powered mock interviews",
                            "Get instant feedback and transcripts",
                            "Track your progress over time",
                            "Access 500+ interview templates",
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-primary-foreground/80" />
                                <span className="text-primary-foreground/90">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex w-full flex-col justify-center px-8 py-12 sm:px-12 lg:w-1/2 lg:px-16">
                <div className="mx-auto w-full max-w-md">
                    <Link
                        to="/"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>

                    <div className="mb-8 flex items-center gap-2">
                        <div className="shadow-soft flex h-10 w-10 items-center justify-center rounded-xl gradient-bg">
                            <Video className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">MockMaster</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">Create your account</h1>
                        <p className="text-muted-foreground">Start practicing interviews in minutes</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {password && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Progress value={passwordStrength} className={`h-1.5 flex-1 ${getStrengthColor()}`} />
                                        <span className="text-xs text-muted-foreground">{getStrengthText()}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-destructive">Passwords don't match</p>
                            )}
                        </div>

                        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                            By signing up, you agree to our{" "}
                            <Link to="/terms" className="text-primary hover:underline">
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link to="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
