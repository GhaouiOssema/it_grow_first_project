import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ContactSection = () => {
    return (
        <section className="bg-[#1B224B] py-12 md:py-24 text-white" id="contact">
            <div className="container">
                <h2 className="mb-12 text-2xl font-bold text-center">
                    Say Hello
                </h2>
                <div className="mx-auto max-w-md">
                    <form className="space-y-4">
                        <Input
                            placeholder="Name"
                            className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            className="bg-transparent border-white/20 text-white placeholder:text-white/60"
                        />
                        <textarea
                            className="min-h-[100px] w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/60"
                            placeholder="Message"
                        />
                        <Button className="w-full bg-[#6C3BF4]">
                            Send Now
                        </Button>
                    </form>
                    <div className="mt-8 flex justify-between text-sm">
                        <div>
                            <p>Office 149, 450 South Brand Brooklyn</p>
                            <p>San Diego County, CA 91905, USA</p>
                        </div>
                        <div className="text-right">
                            <p>+1 (123) 456 7890</p>
                            <p>hello@example.com</p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white">
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-white/60 hover:text-white">
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
