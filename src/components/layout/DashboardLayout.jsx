import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { Navbar } from "./Navbar";

export function DashboardLayout({ children }) {
    const navigate = useNavigate();

    // Mock user data - in real app, this would come from auth context
    const user = {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://github.com/shadcn.png",
    };

    const handleLogout = () => {
        // In real app, this would call logout function
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar isLoggedIn={true} user={user} onLogout={handleLogout} />
            <DashboardSidebar />
            <main className="ml-64 min-h-screen pt-16">
                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
