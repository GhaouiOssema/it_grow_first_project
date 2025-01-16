"use client";

import { navLinks } from "@/constants";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Sidebar } from "./Sidebar";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Token } from "@/types";
import { CircleUserRound, LogOut, UserRound } from "lucide-react";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("#/");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [user, setUser] = useState<Token | null>(null);
    const router = useRouter();
    const navRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode<Token>(token);
            setUser(decodedToken);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }

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
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setDropdownOpen(false);
        setUser(null);
        router.push("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="fixed top-0 z-50 w-screen bg-white">
            <div className="container h-20 flex items-center justify-between">
                <Sidebar activeSection={activeSection} />
                <div className="flex items-center">
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
                    {!isLoggedIn ? (
                        <Link href="/sign-in">
                            <Button
                                variant="default"
                                className="bg-[#6C3BF4] hover:bg-[#5B32D6]">
                                Sign in
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <button
                                className="flex items-center gap-5 text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0"
                                onClick={toggleDropdown}>
                                <span className="sr-only">Open user menu</span>
                                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gray">
                                    <UserRound className="h-8 w-8 text-brand-color" />
                                </div>
                                <span className="hidden md:block">
                                    {user?.username}
                                </span>
                                <svg
                                    className="w-2.5 h-2.5 ms-3 hidden md:block"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="z-50 absolute top-[5rem] md:top-24 right-0 md:right-5 bg-white divide-y divide-gray-100 rounded-none md:rounded-xl shadow-lg w-full md:w-64 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="px-5 container py-2 border border-brand-color rounded-none md:rounded-xl">
                                        <div className="border border-brand-color rounded-xl bg-brand-color px-4 py-2 text-sm text-gray-900 dark:text-white flex items-center space-x-3 gap-2">
                                            <div className="flex h-10 w-10 md:w-20 items-center justify-center border border-white rounded-full">
                                                <UserRound className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex flex-col items-start text-white">
                                                <div className="font-medium">
                                                    {user?.username}
                                                </div>
                                                <div className="truncate">
                                                    {user?.email}
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="mb-2 mt-2 pl-3 py-2 hover:bg-blue-100 rounded-lg">
                                            <li className=" flex items-center">
                                                <CircleUserRound className="text-brand-color" />
                                                <Link
                                                    href="/profile"
                                                    className="block px-4 py-2 text-sm hover:text-brand-color">
                                                    Profile
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="pl-3 py-2 flex items-center hover:bg-red-100 rounded-lg">
                                            <LogOut className="text-red-500" />
                                            <button
                                                onClick={handleLogout}
                                                className="block px-4 py-2 text-sm text-red-500 ">
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
