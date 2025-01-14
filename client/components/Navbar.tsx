import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
    return (
        <header className="container flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src="/images/img-1.png"
                    alt={`Logo`}
                    width={280}
                    height={200}
                    className="object-cover w-20 h-20"
                />
            </Link>

            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                {navLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="text-foreground/60 transition-colors hover:text-foreground/80">
                        {link.label}
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
        </header>
    );
};

export default Navbar;
