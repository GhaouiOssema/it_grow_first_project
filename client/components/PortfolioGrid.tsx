import Image from "next/image";
import React from "react";

const PortfolioGrid = () => {
    return (
        <section className="container py-12" id="works">
            <h2 className="mb-12 text-2xl font-bold">My Work</h2>
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
