import Image from "next/image";
import React from "react";
import SectionTitle from "./SectionTitle";

const PortfolioGrid = () => {
    return (
        <section className="container py-16" id="works">
            <SectionTitle
                title="My Work"
                subTitle='A Glimpse Into My Creative World"'
                className="text-center"
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <Image
                        key={i}
                        src="/placeholder.svg?height=300&width=300"
                        alt={`Portfolio ${i + 1}`}
                        width={300}
                        height={300}
                        className="rounded-lg object-cover"
                    />
                ))}
            </div>
        </section>
    );
};

export default PortfolioGrid;
