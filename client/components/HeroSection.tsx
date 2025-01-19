import React from "react";
import Carousel from "./Carousel";
import SocialMediaSection from "./SocialMediaSection";

const HeroSection = () => {
    return (
        <section
            className="container mx-auto px-5 sm:px-10 lg:px-20 xl:px-40 mt-20 sm:mt-20 lg:mt-24 py-5 space-y-6"
            id="home">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className=" flex flex-col items-center md:items-start space-y-6 text-center lg:text-left">
                    <h1 className="font-syne text-[#2D3436] text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                        Hello
                        <br />
                        I&apos;m <span className="font-bold">Alycia Carey</span>
                    </h1>
                    <div className="space-y-1">
                        <p className="text-[#6C3BF4] font-medium text-lg sm:text-xl">
                            Photographer
                        </p>
                        <p className="text-[#6C3BF4] font-medium text-lg sm:text-xl">
                            Zoologist
                        </p>
                        <p className="text-[#6C3BF4] font-medium opacity-40 text-lg sm:text-xl">
                            Writer
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row lg:justify-start items-center ">
                    <Carousel />
                </div>
            </div>

            <p className="text-[#636E72] text-base sm:text-lg lg:text-xl leading-relaxed max-w-[650px] mx-auto lg:mx-0">
                I help tell clients create{" "}
                <span className="text-[#2D3436] font-medium">brands</span>,
                build{" "}
                <span className="text-[#2D3436] font-medium">
                    digital products
                </span>{" "}
                and <span className="text-[#2D3436] font-medium">services</span>
                , innovate, find opportunities and validate ideas.
            </p>

            <div className=" w-full lg:w-[40%] mx-auto lg:mx-0">
                <SocialMediaSection section="hero" />
            </div>
        </section>
    );
};

export default HeroSection;
