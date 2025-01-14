import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { pricingPlans } from "@/constants";

const PricingSection = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-24" id="pricing">
            <div className="container">
                <h2 className="mb-12 text-2xl font-bold text-center">
                    Plans & Pricing
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`p-6 ${plan.cardClass || ""}`}>
                            <div className="text-center">
                                <div className="mb-4">
                                    <Image
                                        src={plan.imageSrc}
                                        alt={plan.imageAlt}
                                        width={40}
                                        height={40}
                                        className="mx-auto"
                                    />
                                </div>
                                <h3 className="mb-2 font-bold">{plan.name}</h3>
                                <p className="text-3xl font-bold">
                                    {plan.price}
                                </p>
                                <ul className="my-4 space-y-2 text-sm text-gray-500">
                                    {plan.description.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <Button className={plan.buttonClass}>
                                    Choose Plan
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
