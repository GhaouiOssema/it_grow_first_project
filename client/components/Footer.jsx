import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="border-t bg-[#1B224B] py-6 text-white">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-sm leading-loose md:text-left">
                    Copyright © Modak {new Date().getFullYear()}. All rights
                    reserved.
                </p>
                <nav className="flex gap-4 sm:gap-6">
                    <Link
                        href="/privacy-policy"
                        className="text-sm hover:underline">
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-of-use"
                        className="text-sm hover:underline">
                        Terms of Use
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
