"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel as UiCarousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { images } from "@/constants";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    React.useEffect(() => {
        const interval = setInterval(nextSlide, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <UiCarousel className="w-full max-w-xs relative">
            <CarouselContent
                className="flex transition-transform ease-in-out duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((src, index) => (
                    <CarouselItem key={index} className="flex-shrink-0">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <Image
                                        src={src}
                                        alt={`Portfolio Image ${index + 1}`}
                                        width={280}
                                        height={380}
                                        className="rounded-2xl object-cover"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </UiCarousel>
    );
};

export default Carousel;
