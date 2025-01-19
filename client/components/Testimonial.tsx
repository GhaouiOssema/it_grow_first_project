"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { StarRating } from "./star-rating";
import { Testimonial } from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import SectionTitle from "./SectionTitle";
import Loader from "./Loader";

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);
                const response = await axios.get<Testimonial[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/testimonials`
                );
                setTestimonials(response.data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="w-full py-16">
            <div className="mauto">
                <SectionTitle
                    title="Testimonial"
                    subTitle="Hear What My Clients Have to Say"
                    className="text-center"
                />

                {!loading && testimonials ? (
                    <div className="relative w-full px-5">
                        <Carousel className="">
                            <CarouselContent
                                className="flex transition-transform ease-in-out duration-500"
                                style={{
                                    transform: `translateX(-${
                                        currentIndex * 100
                                    }%)`,
                                }}>
                                {testimonials.map((testimonial) => (
                                    <CarouselItem
                                        key={testimonial._id}
                                        className="flex-shrink-0">
                                        <div className="relative bg-[#F7F8FA] rounded-none">
                                            <div className="flex flex-col items-center text-center py-4">
                                                <Image
                                                    src="/images/quot.png"
                                                    width={300}
                                                    height={200}
                                                    alt="quot"
                                                    className="object-cover aspect-3/4 w-auto h-20 mb-6"
                                                />
                                                <blockquote className="text-[#11204DB2] text-lg sm:text-2xl font-normal leading-9 tracking-[0.2px] text-center mb-8">
                                                    &quot;{testimonial.quote}
                                                    &quot;
                                                </blockquote>
                                                <div className="mb-6">
                                                    <StarRating
                                                        rating={
                                                            testimonial.rating
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 relative mb-3">
                                                        <Image
                                                            src={
                                                                testimonial.avatar ||
                                                                "/images/avatar.jpg"
                                                            }
                                                            alt={
                                                                testimonial.name
                                                            }
                                                            fill
                                                            className="rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <h3 className="font-medium text-[#11204D] py-2">
                                                        {testimonial.name}
                                                    </h3>
                                                    <p className="text-[#11204D4D] font-normal">
                                                        ACME Inc.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    );
}
