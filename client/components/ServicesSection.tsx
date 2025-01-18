"use client";

import { items } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";

const ServicesSection = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <section className="container mx-auto py-16" id="services">
            <div className="text-start mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#11204D] font-playfair mb-1">
                    What I Offer
                </h1>
                <p className="text-[#11204D59] font-bold font-playfair">
                    Creative solutions to bring your vision to life{" "}
                </p>
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center ">
                <div className="w-[80%] space-y-6 text-left">
                    {items.map((item, index) => (
                        <h3
                            key={index}
                            className="group flex items-center gap-3 text-md xl:text-2xl text-nowrap font-medium cursor-pointer"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(0)}>
                            <span
                                className={`transition-all duration-300 ${
                                    activeIndex === index
                                        ? item.color
                                        : "text-[#11204D]"
                                }`}>
                                {item.text}
                            </span>
                            <div
                                className={`h-[2px] transition-all duration-300 ${
                                    activeIndex === index
                                        ? `${item.lineColor} w-[96px]`
                                        : "w-0"
                                }`}
                            />
                        </h3>
                    ))}
                </div>

                <div className="relative w-full flex flex-col items-center justify-center ">
                    <div className=" w-[70%] h-[70%]">
                        <Image
                            src="/images/services.png"
                            alt="Food Photography 1"
                            className="rounded-lg object-cover"
                            width={300}
                            height={200}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-start gap-8 ">
                    <div className="flex flex-col items-start space-y-4">
                        <h3 className="text-md xl:text-2xl font-medium">
                            Food Photography
                        </h3>
                        <p className="text-[#11204DB2] font-normal text-md xl:text-2xl leading-[30.6px] tracking-[0.2px]">
                            Transforming culinary creations into visual
                            masterpieces, our food photography captures the
                            essence of flavor, texture, and presentation.
                            Perfect for restaurants, cookbooks, or food brands
                            looking to make an unforgettable impression.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
