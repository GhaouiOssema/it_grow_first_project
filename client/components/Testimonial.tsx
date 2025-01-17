import Image from "next/image";
import { StarRating } from "./star-rating";
import { testimonials } from "@/constants";

export default function TestimonialSection() {
    return (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#11204D] font-playfair mb-3">
                        Testimonial
                    </h1>
                    <p className="text-[#11204D59] font-bold font-playfair">
                        Hear What My Clients Have to Say{" "}
                    </p>
                </div>

                <div className="relative">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="relative bg-[#F7F8FA] rounded-lg">
                            <div className="flex flex-col items-center text-center">
                                <Image
                                    src="/images/quot.png"
                                    width={300}
                                    height={200}
                                    alt="quot"
                                    className="object-cover aspect-3/4 w-auto h-20 mb-6"
                                />

                                <blockquote className="text-[#11204DB2] text-lg sm:text-2xl font-normal leading-9 tracking-[0.2px] text-center mb-8">
                                    &quot;{testimonial.quote}&quot;
                                </blockquote>

                                <div className="mb-6">
                                    <StarRating rating={testimonial.rating} />
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 relative mb-3">
                                        <Image
                                            src={
                                                testimonial.avatar ||
                                                "/placeholder.svg"
                                            }
                                            alt={testimonial.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <h3 className="font-medium text-[#11204D] py-2">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-[#11204D4D] font-normal">
                                        ACME Inc.{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
