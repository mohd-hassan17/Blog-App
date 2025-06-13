"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Github, X } from "lucide-react";
import { Linkedin } from 'lucide-react';
import { AnimatedTooltip } from "../ui/animated-tooltip";


const people = [
    {
        id: 1,
        name: "Mohd Hassan",
        designation: "Fullstack Developer",
        image:
            "/myimg.jpg",
    },

];

export function BlogFooter() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    {/* Logo & Social */}
                    <div>
                        <h2 className="text-2xl font-bold">
                            <span className="bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                Dev
                            </span>
                            <span className="text-foreground">Notes</span>
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                            Learn. Share. Grow. Bite-sized coding insights.
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <a
                                href="https://github.com/mohd-hassan17"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="hover:text-white transition-colors"
                            >
                                <Github className="h-5 w-5 text-muted-foreground hover:text-white" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mohd-hassan17/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="hover:text-white transition-colors"
                            >
                                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-white" />
                            </a>

                            {/* Ensure tooltip aligns with icons */}
                            <div className="flex items-center">
                                <AnimatedTooltip items={people} />
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-12 text-sm">
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Explore</h3>
                            <ul className="space-y-1 text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Articles</a></li>
                                <li><a href="#" className="hover:text-primary">Topics</a></li>
                                <li><a href="#" className="hover:text-primary">Authors</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-foreground mb-2">Legal</h3>
                            <ul className="space-y-1 text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                                <li><a href="#" className="hover:text-primary">Terms</a></li>
                                <li><a href="#" className="hover:text-primary">Licenses</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="w-full md:w-64">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Subscribe</h3>
                        <form className="flex flex-col gap-2">
                            <div className="relative">
                                <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="pl-9 py-2 text-sm"
                                />
                            </div>
                            <Button type="submit" className="text-sm px-3 py-2">
                                Join Newsletter
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-6 border-t pt-4 text-xs text-muted-foreground text-center">
                    © {new Date().getFullYear()} DevNotes. Built with 💻 & ☕.
                </div>
            </div>
        </footer>
    );
}