import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const SocialMediaSection = ({ section }: { section: string }) => {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="font-semibold text-nowrap text-xs md:text-lg flex items-center gap-3">
                <div
                    className={`h-1 w-1 rounded-full bg-${
                        section === "hero" ? "black" : "white"
                    }`}
                />
                <span>Follow Me on</span>
            </div>
            <div
                className={`w-full h-[2px] ${
                    section === "hero" ? "bg-[#11204D26]" : "bg-white"
                }`}
            />
            <div className="flex gap-4">
                <Link
                    href="#"
                    className={`bg-white p-3 ${
                        section === "hero" ? "border border-[#11204D26]" : ""
                    } rounded-md transition-color`}>
                    <Instagram
                        strokeWidth="3px"
                        className="h-[18.15px] w-[18.2px] text-[#11204D]"
                    />
                </Link>
                <Link
                    href="#"
                    className={`bg-white p-3 ${
                        section === "hero" ? "border border-[#11204D26]" : ""
                    } rounded-md transition-colors`}>
                    <Facebook className="h-[18.15px] w-[18.2px] text-[#11204D]" />
                </Link>
                <Link
                    href="#"
                    className={`bg-white p-3 ${
                        section === "hero" ? "border border-[#11204D26]" : ""
                    } rounded-md transition-color`}>
                    <Linkedin className="h-[18.15px] w-[18.2px] text-[#11204D]" />
                </Link>
            </div>
        </div>
    );
};

export default SocialMediaSection;
