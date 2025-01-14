import Image from "next/image";
import React from "react";

const AboutSection = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-24" id="about">
            <div className="container">
                <h2 className="mb-12 text-2xl font-bold">About Me</h2>
                <div className="grid gap-6 lg:grid-cols-2">
                    <Image
                        src="/placeholder.svg?height=400&width=400"
                        alt="About Image"
                        width={400}
                        height={400}
                        className="rounded-lg"
                    />
                    <div className="space-y-4">
                        <p className="text-gray-500">
                            With a passion for storytelling through vision,
                            words, and creativity, I bring a unique blend of
                            skills and expertise to every project. Having worked
                            with diverse clients across various industries, I
                            understand the importance of creating visual
                            narratives that resonate with the intended audience.
                        </p>
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-[#6C3BF4] p-2">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Award"
                                    width={40}
                                    height={40}
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold">
                                    International Photography
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Award, 2019
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
