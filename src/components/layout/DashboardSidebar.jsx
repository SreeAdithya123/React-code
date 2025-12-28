import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    BarChart3,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    HelpCircle,
    History,
    LayoutDashboard,
    Plus,
    Settings,
    User,
    Video,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mainNavItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/new-mock", icon: Plus, label: "New Mock" },
    { href: "/history", icon: History, label: "History" },
    { href: "/compare", icon: BarChart3, label: "Compare" },
];

const settingsNavItems = [
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/billing", icon: CreditCard, label: "Billing" },
];

const supportNavItems = [{ href: "/faq", icon: HelpCircle, label: "Help & FAQ" }];

export function DashboardSidebar() {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ href, icon: Icon, label }) => (
        <Link
            to={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive(href)
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
        >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
        </Link>
    );

    return (
        <aside
            className={cn(
                "fixed bottom-0 left-0 top-16 z-40 border-r border-border bg-card transition-all duration-300",
                collapsed ? "w-16" : "w-64",
            )}
        >
            <div className="flex h-full flex-col p-3">
                {/* Logo Section */}
                <div className="mb-6 flex items-center justify-between px-3 pt-2">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                                <Video className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold text-foreground">MockMaster</span>
                        </div>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 space-y-1">
                    {!collapsed && (
                        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Main</p>
                    )}
                    {mainNavItems.map((item) => (
                        <NavItem key={item.href} {...item} />
                    ))}

                    {!collapsed && (
                        <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Account
                        </p>
                    )}
                    {collapsed && <div className="my-4 border-t border-border" />}
                    {settingsNavItems.map((item) => (
                        <NavItem key={item.href} {...item} />
                    ))}
                </div>

                {/* Support Section */}
                <div className="space-y-1 border-t border-border pt-3">
                    {supportNavItems.map((item) => (
                        <NavItem key={item.href} {...item} />
                    ))}
                </div>
            </div>
        </aside>
    );
}
