import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { pricingPlans } from "@/constants";
import SectionTitle from "./SectionTitle";

export default function PricingSection() {
    return (
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <SectionTitle
                    title="Plans & Pricing"
                    subTitle="Tailored Packages to Elevate Your Vision"
                    className="text-center"
                />

                <div className="grid gap-8 md:gap-0 px-0 md:px-24 md:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="px-5">
                            <Card
                                className={`relative overflow-hidden py-8 px-8 rounded-[10px] shadow-lg transition-transform hover:scale-105 ${
                                    plan.cardClass
                                        ? " bg-[#6138bd]/20"
                                        : "bg-white"
                                }`}>
                                <div className="flex flex-col items-center text-center ">
                                    <div className="mb-6">
                                        <Image
                                            src={
                                                plan.imageSrc ||
                                                "/placeholder.svg"
                                            }
                                            alt={plan.imageAlt}
                                            width={48}
                                            height={48}
                                            className="w-auto h-12"
                                        />
                                    </div>
                                    <h3
                                        className={`text-xl font-semibold mb-4`}>
                                        {plan.name}
                                    </h3>
                                    <div
                                        className={`text-4xl font-medium mb-6 ${
                                            plan.cardClass && "text-brand-color"
                                        }`}>
                                        <span className="text-2xl mr-2">$</span>
                                        {plan.price}
                                    </div>
                                    <div className="mb-8">
                                        <p className={`mb-2 font-medium`}>
                                            Includes:
                                        </p>
                                        <ul
                                            className={`space-y-3 divide-y divide-[#11204D59] text-[#11204DB2] `}>
                                            {plan.description.map(
                                                (feature, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-center justify-center">
                                                        {i !== 2 && (
                                                            <>
                                                                <div className="h-0.5 w-0.5 rounded-full bg-[#11204D59]/15 mr-3" />
                                                                {feature}
                                                            </>
                                                        )}
                                                        {i === 2 && (
                                                            <span className="relative">
                                                                <div className="h-0.5 w-0.5 rounded-full bg-[#11204D59] absolute top-2 left-4 md:left-7" />
                                                                {feature}
                                                            </span>
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <Button
                                            className={`rounded-[10px] px-8 py-2 transition-colors
                    ${
                        !plan.cardClass
                            ? "hover:bg-[#11204D]/80 bg-[#11204D] "
                            : "hover:bg-[#6C3BF4]/90 bg-brand-color text-white"
                    }`}>
                                            Contact Me
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
