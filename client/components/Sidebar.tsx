"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navLinks } from "@/constants";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SidebarProps {
    activeSection: string;
}

export function Sidebar({ activeSection }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="md:hidden"
                    aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetTitle>
                    <VisuallyHidden>Navigation Menu</VisuallyHidden>
                </SheetTitle>
                <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`text-foreground/60 transition-colors hover:text-foreground/80 text-lg relative pb-2 group ${
                                activeSection === link.href
                                    ? "text-[#6138BD]"
                                    : ""
                            }`}
                            onClick={() => setIsOpen(false)}>
                            <span className="relative">
                                {link.label}
                                {activeSection === link.href && (
                                    <span
                                        className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[#6138BD]"
                                        style={{
                                            transition: "width 0.3s ease",
                                        }}
                                    />
                                )}
                            </span>
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
