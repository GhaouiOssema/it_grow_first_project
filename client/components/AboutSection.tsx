import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return (
        <section className="bg-gray-50 py-16" id="about">
            <div className="container">
                <div className="flex items-center justify-center flex-wrap gap-6">
                    <Image
                        src="/images/aboute-img.png"
                        alt="About Image"
                        width={400}
                        height={400}
                        className="rounded-lg h-full"
                    />
                    <div className="flex flex-col items-start w-full lg:w-[45%]">
                        <div className="text-start">
                            <h1 className="text-3xl sm:text-4xl font-bold text-[#11204D] font-playfair mb-1">
                                About Me
                            </h1>
                            <p className="text-[#11204D59] font-bold font-playfair">
                                Capturing Moments, Exploring Worlds, and
                                Crafting Stories{" "}
                            </p>
                        </div>
                        <div className="flex flex-col items-start py-5 text-sm md:text-lg text-[#11204DB2]">
                            <span>
                                With a passion for storytelling through lenses,
                                words, and scientific discovery, I bring a
                                unique blend of artistry and curiosity to every
                                project I undertake. As a photographer,
                                zoologist, and writer, I see the world as a
                                canvas filled with endless stories waiting to be
                                told.
                            </span>
                            <span className="py-5">
                                From documenting the beauty of wildlife in its
                                natural habitat to crafting compelling
                                narratives, my work is inspired by the wonders
                                of nature, human creativity, and the power of
                                innovation.
                            </span>
                            <span>
                                Let’s create something extraordinary together.
                            </span>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="rounded-full ">
                                <Image
                                    src="/images/img-5.png"
                                    alt="Award"
                                    width={144}
                                    height={136}
                                    className="h-auto w-[100px]"
                                />
                            </div>
                            <div className=" space-y-1 text-start">
                                <h3 className="font-medium">
                                    International Photography
                                </h3>
                                <h3 className="font-medium">Award, 2016</h3>
                                <p className="text-sm text-[#11204DB2] leading-[20px] tracking-[0.2px]">
                                    Recipient of Excellence in Wildlife and
                                    Nature Photography
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
