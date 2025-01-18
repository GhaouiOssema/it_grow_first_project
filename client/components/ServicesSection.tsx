"use client";

import { items } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import SectionTitle from "./SectionTitle";

const ServicesSection = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleActiveItem = (idx: number) => {
        setActiveIndex(idx);
    };

    return (
        <section className="container mx-auto py-16" id="services">
            <SectionTitle
                title="What I Offer"
                subTitle="Creative solutions to bring your vision to life"
                className="text-start"
            />
            <div className="flex flex-col md:flex-row gap-12 items-center justify-center ">
                <div className="w-full md:w-[80%] space-y-6 text-left">
                    {items.map((item, index) => (
                        <h3
                            key={index}
                            className="group flex items-center gap-3 text-md xl:text-2xl text-nowrap font-medium cursor-pointer"
                            onClick={() => handleActiveItem(index)}>
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

                <div className="w-full flex flex-col items-center justify-center  relative">
                    {Array.isArray(items[activeIndex].image) ? (
                        <div className="flex flex-col items-center justify-center gap-5 w-full h-full ">
                            <div className="flex justify-center w-full aspect-[4/3] relative rounded-[10px] overflow-hidden">
                                <Image
                                    src={items[activeIndex].image[0].img}
                                    alt="Beauty products collection on marble surface"
                                    className="object-cover rounded-[10px] boor"
                                    width={300}
                                    height={200}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square relative rounded-[10px] overflow-hidden boor">
                                    <Image
                                        src={items[activeIndex].image[2].img}
                                        alt="Cocooil product bottle"
                                        className="object-cover rounded-[10px] boor w-[120px] h-[138px] "
                                        width={300}
                                        height={200}
                                    />
                                </div>
                                <div className="absolute top-[55%] right-[5%] w-[30%] aspect-[3/4] rounded-[10px] overflow-hidden z-10">
                                    <Image
                                        src={items[activeIndex].image[1].img}
                                        alt="Stylized sneaker illustration"
                                        className="object-cover"
                                        layout="fill"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-[219px] h-[257px] rounded-[10px]">
                            <Image
                                src={
                                    typeof items[activeIndex].image === "string"
                                        ? items[activeIndex].image
                                        : ""
                                }
                                alt={`${items[activeIndex].text} Image`}
                                className="rounded-[10px] object-cover"
                                width={300}
                                height={200}
                            />
                        </div>
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-start gap-8 ">
                    <div className="flex flex-col items-start space-y-4">
                        <h3 className="text-md xl:text-2xl font-medium">
                            {items[activeIndex].text}
                        </h3>
                        <p className="text-[#11204DB2] font-normal text-md xl:text-2xl leading-[30.6px] tracking-[0.2px]">
                            {items[activeIndex].description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
