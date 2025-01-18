import Image from "next/image";
import React from "react";

const ServicesSection = () => {
    return (
        <section className="container mx-auto py-16" id="services">
            <div className="text-star mb-12 boor">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#11204D] font-playfair mb-1">
                    What I Offer
                </h1>
                <p className="text-[#11204D59] font-bold font-playfair">
                    Creative solutions to bring your vision to life{" "}
                </p>
            </div>
            <div className="flex flex-col md:flex-row mt-12 gap-12 items-center justify-center boor">
                <div className="w-full space-y-6 text-left">
                    <h3 className="flex items-center gap-3 text-xl font-medium text-brand-color">
                        <span>Food Photography</span>
                        <div className="bg-brand-color h-[2px] w-[96px]" />
                    </h3>
                    <h3 className="flex items-center gap-3 text-xl font-medium text-[#11204D]">
                        <span>Wedding Photoshoot</span>
                        <div className="bg-black h-[2px] w-[96px]" />
                    </h3>
                    <h3 className="flex items-center gap-3 text-xl font-medium text-[#11204D]">
                        <span>Product Art</span>
                        <div className="bg-black h-[2px] w-[96px]" />
                    </h3>
                </div>
                <div className="relative w-full flex flex-col items-center justify-center boor">
                    <div className=" w-[70%] h-[70%]">
                        <Image
                            src="/images/services.png"
                            alt="Food Photography 1"
                            className="rounded-lg object-cover shadow-lg"
                            width={300}
                            height={200}
                        />
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row items-start gap-8 boor">
                    <div className="flex flex-col items-start space-y-4">
                        <h3 className="text-2xl font-medium">
                            Food Photography
                        </h3>
                        <p className="text-[#11204DB2] font-normal text-[17px] leading-[30.6px] tracking-[0.2px]">
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
