import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const faqCategories = [
    {
        name: "Getting Started",
        questions: [
            {
                q: "How do I create my first mock interview?",
                a: "Click on 'New Mock Interview' from your dashboard, fill in the details like role and company, choose your interview type, and click 'Start Mock Interview'. You'll be guided through the device setup before the interview begins.",
            },
            {
                q: "What equipment do I need?",
                a: "You need a computer with a webcam and microphone. We recommend using a quiet environment with good lighting for the best experience. Chrome or Firefox browsers work best.",
            },
            {
                q: "Is my data secure?",
                a: "Yes, all your recordings and data are encrypted and stored securely. We never share your information with third parties. You can delete your data at any time from your profile settings.",
            },
        ],
    },
    {
        name: "Recording & Transcripts",
        questions: [
            {
                q: "How does the transcription work?",
                a: "Our AI automatically transcribes your interview in real-time as you speak. After the interview, you can review, edit, and export the transcript in multiple formats.",
            },
            {
                q: "Can I practice without recording?",
                a: "Yes! Choose 'Practice Mode' when creating a new mock interview. This mode lets you practice without saving any recordings while still providing real-time feedback.",
            },
            {
                q: "What video formats are supported for export?",
                a: "You can export your recordings in MP4 format. Transcripts can be exported as TXT, SRT (for subtitles), or PDF documents.",
            },
        ],
    },
    {
        name: "Evaluation & Feedback",
        questions: [
            {
                q: "How is my performance evaluated?",
                a: "Our AI analyzes multiple aspects of your interview including technical accuracy, communication clarity, problem-solving approach, confidence, and cultural fit. You receive detailed scores and actionable feedback.",
            },
            {
                q: "Can I edit the evaluation ratings?",
                a: "Yes, you can adjust the ratings and add your own notes to each competency. This is useful for self-reflection and tracking your personal assessment alongside the AI feedback.",
            },
            {
                q: "How do I track my progress over time?",
                a: "Use the 'Compare' feature to see side-by-side comparisons of your interviews. The dashboard also shows your overall trends and improvement areas.",
            },
        ],
    },
    {
        name: "Billing & Plans",
        questions: [
            {
                q: "What's included in the free plan?",
                a: "The free plan includes 3 mock interviews per month, basic transcription, and standard evaluation features. Upgrade to Pro for unlimited interviews and advanced analytics.",
            },
            {
                q: "How do I cancel my subscription?",
                a: "You can cancel your subscription at any time from the Billing page. Your access will continue until the end of your current billing period.",
            },
            {
                q: "Do you offer refunds?",
                a: "We offer a 14-day money-back guarantee for new subscriptions. Contact our support team if you're not satisfied with your purchase.",
            },
        ],
    },
];

export default function FAQ() {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedQuestions, setExpandedQuestions] = useState([]);

    const toggleQuestion = (question) => {
        setExpandedQuestions((prev) =>
            prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]
        );
    };

    const filteredCategories = faqCategories
        .map((category) => ({
            ...category,
            questions: category.questions.filter(
                (q) =>
                    q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((category) => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="px-4 pb-16 pt-24">
                <div className="container mx-auto max-w-3xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
                            Frequently Asked Questions
                        </h1>
                        <p className="mb-8 text-lg text-muted-foreground">
                            Find answers to common questions about MockMaster
                        </p>

                        {/* Search */}
                        <div className="relative mx-auto max-w-md">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 pl-12 text-base"
                            />
                        </div>
                    </div>

                    {/* FAQ Categories */}
                    <div className="space-y-8">
                        {filteredCategories.map((category) => (
                            <div key={category.name}>
                                <h2 className="mb-4 text-lg font-semibold text-foreground">{category.name}</h2>
                                <div className="space-y-3">
                                    {category.questions.map((item) => (
                                        <div
                                            key={item.q}
                                            className="shadow-card overflow-hidden rounded-xl border border-border bg-card"
                                        >
                                            <button
                                                onClick={() => toggleQuestion(item.q)}
                                                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-accent/50"
                                            >
                                                <span className="pr-4 font-medium text-foreground">{item.q}</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                                                        expandedQuestions.includes(item.q) && "rotate-180"
                                                    )}
                                                />
                                            </button>
                                            {expandedQuestions.includes(item.q) && (
                                                <div className="px-5 pb-5">
                                                    <p className="leading-relaxed text-muted-foreground">{item.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground">No questions found matching "{searchQuery}"</p>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 p-8 text-center">
                        <h3 className="mb-2 text-xl font-semibold text-foreground">
                            Still have questions?
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                            Our support team is here to help you 24/7
                        </p>
                        <a
                            href="/contact"
                            className="shadow-soft hover:shadow-elevated inline-flex items-center justify-center rounded-xl gradient-bg px-6 py-3 font-semibold text-primary-foreground transition-all"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
