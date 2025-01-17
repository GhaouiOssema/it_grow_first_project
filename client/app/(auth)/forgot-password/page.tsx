"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPopup from "@/components/CustomPopup";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setIsError(false);
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        if (!isValidEmail) {
            setMessage("Please enter a valid email address.");
            setIsError(true);
            setShowPopup(true);
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.post<{ exists: boolean }>(
                `${process.env.NEXT_PUBLIC_API_URL}/account/forgot-password`,
                { email }
            );
            setMessage(
                response.data.exists
                    ? "A password reset email has been sent to your inbox."
                    : "This email does not exist in our records."
            );
            setIsError(!response.data.exists);
        } catch {
            setMessage("An error occurred. Please try again later.");
            setIsError(true);
        } finally {
            setIsLoading(false);
            setShowPopup(true);
        }
    };

    return (
        <section className="flex w-screen items-center justify-center">
            <div className="container mx-auto w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-sm text-gray-600">
                        Enter your email address, and we&apos;ll send you a link
                        to reset your password.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address :</Label>
                        <Input
                            id="email"
                            placeholder="Email address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <Button
                        onClick={handleForgotPassword}
                        className="w-full bg-[#6138BD] hover:bg-[#5B32D6]"
                        disabled={isLoading || !email}>
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </div>
            </div>

            {/* Success or Error Popup */}
            {showPopup && (
                <CustomPopup
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                    title={isError ? "Error" : "Password Reset"}
                    desc={message}
                    setState={setShowPopup}
                    isError={isError}
                />
            )}
        </section>
    );
}
