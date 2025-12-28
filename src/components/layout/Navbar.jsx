import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, Settings, User, Video, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({ isLoggedIn = false, user, onLogout }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="glass fixed left-0 right-0 top-0 z-50 border-b border-border/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg shadow-soft transition-shadow duration-300 group-hover:shadow-glow">
                            <Video className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold text-foreground">MockMaster</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(link.href)
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden items-center gap-3 md:flex">
                        {isLoggedIn ? (
                            <>
                                <Button variant="default" size="sm" onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-accent">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user?.avatar} />
                                                <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                                                    {user?.name?.slice(0, 2).toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate("/profile")}>
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/settings")}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={onLogout} className="text-destructive">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link to="/login">Log in</Link>
                                </Button>
                                <Button variant="hero" asChild>
                                    <Link to="/signup">Get Started</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="rounded-lg p-2 transition-colors hover:bg-accent md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="animate-slide-in-from-top border-t border-border py-4 md:hidden">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive(link.href)
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="my-2 border-t border-border" />
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="rounded-lg px-4 py-3 text-sm font-medium text-primary"
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            onLogout?.();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="rounded-lg px-4 py-3 text-left text-sm font-medium text-destructive"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-2 px-4">
                                    <Button variant="outline" asChild className="w-full">
                                        <Link to="/login">Log in</Link>
                                    </Button>
                                    <Button variant="hero" asChild className="w-full">
                                        <Link to="/signup">Get Started</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
