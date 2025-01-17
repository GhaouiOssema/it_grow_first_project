"use client";

import {
    Facebook,
    Instagram,
    Linkedin,
    MapPin,
    Phone,
    Mail,
    MousePointer2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ContactFormData } from "@/types";
import axios from "axios";
import CustomPopup from "./CustomPopup";

const ContactSection = () => {
    const [form, setForm] = useState<ContactFormData>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [popupTitle, setPopupTitle] = useState<string>("");
    const [popupDesc, setPopupDesc] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.subject || !form.message) {
            setPopupTitle("Error");
            setPopupDesc("Please fill in all fields.");
            setIsError(true);
            setShowPopup(true);
            return;
        }

        setIsLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/mail/contact`,
                form
            );
            setPopupTitle("Success");
            setPopupDesc("Your message has been sent successfully!");
            setIsError(false);

            if (res.status === 201) {
                setIsError(false);
              setPopupTitle("Message Sent Successfully");
              setPopupDesc(
                  "Thank you for reaching out! We have received your message and will get back to you shortly."
              );

                setShowPopup(true);

                setForm({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            }
        } catch (error) {
            console.log(error);
            setPopupTitle("Error");
            setPopupDesc("Failed to send your message. Please try again.");
            setIsError(true);
        } finally {
            setShowPopup(true);
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-[#1B224B] py-16 text-white" id="contact">
            <div className="container px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-start mb-12 relative">
                        <div className="absolute left-0 -translate-x-[6%] top-0 -translate-y-1/3 w-[60px] h-[60px] rounded-full bg-[#33E7AF1A] " />{" "}
                        <h2 className="text-4xl font-bold mb-2 font-playfair relative">
                            Say Hello
                        </h2>
                        <p className="text-[#B5B5BA] font-playfair">
                            Let&apos;s Connect and Create Something Amazing
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="">
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="Name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleInputChange}
                                        className="bg-white border-white/10 text-black placeholder:text-[#11204D40]"
                                    />
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleInputChange}
                                        className="bg-white border-white/10 text-black placeholder:text-[#11204D40]"
                                    />
                                </div>
                                <Input
                                    placeholder="Subject"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleInputChange}
                                    className="bg-white border-white/10 text-black placeholder:text-[#11204D40]"
                                />
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleInputChange}
                                    className="min-h-[180px] w-full rounded-md border border-white/10 bg-white px-3 py-2 text-sm text-black placeholder:text-[#11204D40]"
                                    placeholder="Message"
                                />
                                <div className="flex justify-center px-8">
                                    <Button
                                        onClick={handleSubmit}
                                        className="bg-brand-color hover:bg-[#5B32D0] text-white">
                                        {isLoading ? "Sending..." : "Send Now"}
                                        <MousePointer2 className="ml-2 h-4 w-4 rotate-90" />
                                    </Button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-8  flex flex-col justify-between py-3">
                            <div className="space-y-6 ">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="h-6 w-6 text-[#6C3BF4] mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            My Location
                                        </h3>
                                        <p className="text-white/70">
                                            PO Box 16122, Collins, Victoria
                                            3000, Australia
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="h-6 w-6 text-[#6C3BF4] mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Give a Call
                                        </h3>
                                        <p className="text-white/70">
                                            90 1234 56 78
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Mail className="h-6 w-6 text-[#6C3BF4] mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-2">
                                            Email Me
                                        </h3>
                                        <p className="text-white/70">
                                            sayhello@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 ">
                                <div className="h-1 w-1 rounded-full bg-white" />
                                <p className="font-semibold">Follow Me on</p>
                                <div className="w-[100px] h-[2px] bg-white" />
                                <div className="flex gap-4">
                                    <Link
                                        href="#"
                                        className="bg-white p-3 rounded-md transition-colors">
                                        <Instagram
                                            strokeWidth="3px"
                                            className="h-[18.15px] w-[18.2px] text-[#11204D]"
                                        />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="bg-white p-3 rounded-md transition-colors">
                                        <Facebook className="h-[18.15px] w-[18.2px] text-[#11204D]" />
                                    </Link>
                                    <Link
                                        href="#"
                                        className="bg-white p-3 rounded-md transition-colors">
                                        <Linkedin className="h-[18.15px] w-[18.2px] text-[#11204D]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <CustomPopup
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                    title={popupTitle}
                    desc={popupDesc}
                    setState={setShowPopup}
                    isError={isError}
                />
            )}
        </section>
    );
};

export default ContactSection;
