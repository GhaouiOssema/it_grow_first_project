"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("#/");
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map((link) =>
                document.getElementById(link.href.slice(1))
            );
            const scrollPosition = window.scrollY;

            let newActiveSection = "#home";
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition + 100) {
                    newActiveSection = navLinks[i].href;
                    break;
                }
            }
            setActiveSection(newActiveSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed top-0 z-50 w-screen bg-white">
            <div className="container flex h-20 items-center justify-between sticky">
                <div className="flex items-center">
                    <Sidebar activeSection={activeSection} />
                    <Link
                        href="/"
                        className="flex items-center space-x-2 ml-2 md:ml-0">
                        <Image
                            src="/images/img-1.png"
                            alt={`Logo`}
                            width={280}
                            height={200}
                            className="object-cover w-20 h-20"
                        />
                    </Link>
                </div>

                <nav
                    className="hidden items-center space-x-6 text-sm font-medium md:flex"
                    ref={navRef}>
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`text-foreground/60 transition-colors hover:text-[#6138BD] relative pb-2 group ${
                                activeSection === link.href
                                    ? "text-[#6138BD]"
                                    : ""
                            }`}>
                            <span className="relative">
                                {link.label}
                                {activeSection === link.href && (
                                    <span
                                        className="absolute -bottom-1 left-0 w-6 h-[2px] bg-[#6138BD]"
                                        style={{
                                            transition: "width 0.3s ease",
                                        }}
                                    />
                                )}
                            </span>
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href="/sign-in">
                        <Button
                            variant="default"
                            className="bg-[#6C3BF4] hover:bg-[#5B32D6]">
                            Sign in
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
