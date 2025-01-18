import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="w-full">
            <div className="container mx-auto px-4 flex flex-col gap-4 md:gap-0 sm:flex-row items-center justify-between my-4">
                <p className="text-sm text-white/90">
                    Copyright © Modak {new Date().getFullYear()}. All rights
                    reserved.
                </p>
                <nav className="flex gap-6">
                    <Link
                        href="/privacy-policy"
                        className="text-sm text-white/90 hover:text-white hover:underline transition-colors">
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-of-use"
                        className="text-sm text-white/90 hover:text-white hover:underline transition-colors">
                        Terms of Use
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
