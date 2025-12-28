import { useState } from "react";
import { Send } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
        setName(""); setEmail(""); setSubject(""); setMessage("");
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="px-4 pb-16 pt-24">
                <div className="container mx-auto max-w-2xl">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-foreground">Contact Support</h1>
                        <p className="text-muted-foreground">We're here to help. Send us a message and we'll respond within 24 hours.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="shadow-card space-y-6 rounded-2xl border border-border bg-card p-8">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[150px]" required />
                        </div>
                        <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                            <Send className="mr-2 h-4 w-4" />{isLoading ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}
