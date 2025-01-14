import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

const BlogSection = () => {
    return (
        <section className="container py-12 md:py-24" id="blog">
            <h2 className="mb-12 text-2xl font-bold text-center">
                From The Blog
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
                {[
                    "Essential social media tips for small business",
                    "Tips to boost product based sale online",
                    "The art of effective storytelling",
                ].map((title, i) => (
                    <Card key={i} className="overflow-hidden">
                        <Image
                            src="/placeholder.svg?height=200&width=400"
                            alt={title}
                            width={400}
                            height={200}
                            className="object-cover"
                        />
                        <div className="p-4">
                            <h3 className="mb-2 font-bold">{title}</h3>
                            <p className="text-sm text-gray-500">
                                Continue Reading
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
