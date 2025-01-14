import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import Carousel from "./Carousel";

const HeroSection = () => {
    return (
        <section className="container py-12 md:py-24 boor" id="/">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] boor">
                <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="font-syne text-[#2D3436] text-5xl font-light tracking-tight">
                                Hello
                                <br />
                                I&apos;m{" "}
                                <span className="font-bold">Alycia Carey</span>
                            </h1>
                            <div className="space-y-1">
                                <p className="text-[#6C3BF4] font-medium">
                                    Photographer
                                </p>
                                <p className="text-[#6C3BF4] font-medium ">
                                    Zoologist
                                </p>
                                <p className="text-[#6C3BF4] font-medium opacity-40">
                                    Writer
                                </p>
                            </div>
                        </div>
                        <p className="max-w-[650px] text-[#636E72] text-lg">
                            I help tell clients create{" "}
                            <span className="text-[#2D3436] font-medium">
                                brands
                            </span>
                            , build{" "}
                            <span className="text-[#2D3436] font-medium">
                                digital products
                            </span>{" "}
                            and{" "}
                            <span className="text-[#2D3436] font-medium">
                                services
                            </span>
                            , innovate, find opportunities and validate ideas.
                        </p>
                        <div className="flex items-center gap-6 pt-2">
                            <p className="text-sm text-[#636E72]">
                                Follow me on
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="text-[#636E72] hover:text-[#6C3BF4] transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-[#636E72] hover:text-[#6C3BF4] transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="#"
                                    className="text-[#636E72] hover:text-[#6C3BF4] transition-colors">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Carousel />
            </div>
        </section>
    );
};

export default HeroSection;
