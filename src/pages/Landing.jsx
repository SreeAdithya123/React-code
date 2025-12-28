import { motion } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    FileText,
    History,
    Play,
    Sparkles,
    Star,
    Video,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Video,
        title: "HD Recording",
        description: "Crystal-clear video and audio recording with automatic cloud backup.",
    },
    {
        icon: FileText,
        title: "AI Transcripts",
        description: "Real-time transcription with speaker detection and timestamps.",
    },
    {
        icon: BarChart3,
        title: "Smart Evaluation",
        description: "AI-powered analysis of your performance with actionable insights.",
    },
    {
        icon: History,
        title: "Progress Tracking",
        description: "Track your improvement over time with detailed analytics.",
    },
];

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Software Engineer at Google",
        content: "MockMaster helped me land my dream job. The AI feedback was incredibly accurate and actionable.",
        avatar: "SC",
        rating: 5,
    },
    {
        name: "Michael Roberts",
        role: "Product Manager at Meta",
        content: "The transcript feature is a game-changer. I can review exactly what I said and improve my responses.",
        avatar: "MR",
        rating: 5,
    },
    {
        name: "Emily Watson",
        role: "Data Scientist at Amazon",
        content: "Practicing with MockMaster gave me the confidence I needed. Highly recommend!",
        avatar: "EW",
        rating: 5,
    },
];

const stats = [
    { value: "50K+", label: "Mock Interviews" },
    { value: "92%", label: "Success Rate" },
    { value: "4.9", label: "User Rating" },
    { value: "500+", label: "Companies" },
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 pb-20 pt-32">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
                <div className="absolute left-1/2 top-20 h-[800px] w-[800px] -translate-x-1/2 blur-3xl rounded-full bg-primary/5" />

                <div className="container relative mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <Sparkles className="h-4 w-4" />
                            AI-Powered Interview Practice
                        </div>

                        <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                            Ace Your Next Interview with <span className="gradient-text">AI-Powered Practice</span>
                        </h1>

                        <p className="mb-8 mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            Practice mock interviews, get instant AI feedback, and track your progress. Join thousands of candidates
                            who landed their dream jobs.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button variant="hero" size="xl" asChild>
                                <Link to="/signup">
                                    Get Started Free
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="hero-secondary" size="xl" asChild>
                                <Link to="/demo">
                                    <Play className="h-5 w-5" />
                                    Try Demo Interview
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                No credit card required
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                Free forever plan
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="p-4 text-center">
                                <div className="gradient-text mb-1 text-3xl font-bold sm:text-4xl">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Everything You Need to Succeed</h2>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Our comprehensive platform gives you all the tools to prepare for any interview.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="shadow-card hover:shadow-elevated group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20"
                            >
                                <div className="group-hover:shadow-glow mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-bg transition-shadow duration-300">
                                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gradient-to-b from-transparent via-primary/5 to-transparent px-4 py-20">
                <div className="container mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">Loved by Thousands</h2>
                        <p className="text-lg text-muted-foreground">See what our users have to say about their experience.</p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="shadow-card rounded-2xl border border-border bg-card p-6"
                            >
                                <div className="mb-4 flex items-center gap-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                                    ))}
                                </div>
                                <p className="mb-4 text-foreground">"{testimonial.content}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-bg text-sm font-semibold text-primary-foreground">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20">
                <div className="container mx-auto">
                    <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 text-center">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
                        <div className="relative">
                            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
                                Ready to Ace Your Interview?
                            </h2>
                            <p className="mb-8 mx-auto max-w-xl text-lg text-primary-foreground/80">
                                Start practicing today and join thousands of successful candidates.
                            </p>
                            <Button size="xl" className="shadow-elevated bg-card text-primary hover:bg-card/90" asChild>
                                <Link to="/signup">
                                    Start Your Free Trial
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-4 py-12">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
                                <Video className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="font-semibold text-foreground">MockMaster</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <Link to="/faq" className="transition-colors hover:text-foreground">
                                FAQ
                            </Link>
                            <Link to="/contact" className="transition-colors hover:text-foreground">
                                Contact
                            </Link>
                            <Link to="/privacy" className="transition-colors hover:text-foreground">
                                Privacy
                            </Link>
                            <Link to="/terms" className="transition-colors hover:text-foreground">
                                Terms
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground">© 2024 MockMaster. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
