"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleForgotPassword = async () => {
        setIsLoading(true);
        setMessage("");
        try {
            const response = await axios.post<{ exists: boolean }>(
                "/api/forgot-password",
                { email }
            );
            setMessage(
                response.data.exists
                    ? "A password reset email has been sent to your inbox."
                    : "This email does not exist in our records."
            );
        } catch {
            setMessage("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="flex h-screen w-screen items-center justify-center">
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
                    {message && (
                        <div className="text-center text-sm text-gray-700 mt-4">
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
