import Image from "next/image";
import React from "react";

const ServicesSection = () => {
    return (
        <section className="container py-12 md:py-24" id="services">
            <h2 className="mb-12 text-2xl font-bold">What I Offer</h2>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#6C3BF4]">
                        Food Photography
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Food Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Food Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#6C3BF4]">
                        Wedding Photoshoot
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Wedding Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Wedding Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#6C3BF4]">
                        Product Art
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Product Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                        <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt="Product Photography"
                            width={150}
                            height={150}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
