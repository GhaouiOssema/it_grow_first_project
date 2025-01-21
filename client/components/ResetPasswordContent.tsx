"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomPopup from "@/components/CustomPopup";

export default function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);

    const token = searchParams.get("token");
    const expires = Number(searchParams.get("expires"));

    useEffect(() => {
        if (expires) {
            const initialCountdown = expires - Date.now();
            setCountdown(initialCountdown);

            const interval = setInterval(() => {
                setCountdown((prevTime) => {
                    if (prevTime <= 1000) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [expires]);

    const handlePasswordReset = async () => {
        setMessage("");
        setIsError(false);

        if (!password || !confirmPassword) {
            setMessage("Please fill in all fields.");
            setIsError(true);
            setShowPopup(true);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsError(true);
            setShowPopup(true);
            return;
        }

        if (!token) {
            setMessage("Invalid or missing reset token.");
            setIsError(true);
            setShowPopup(true);
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/account/reset-password`,
                {
                    token,
                    password,
                }
            );

            setMessage("Password successfully reset. Redirecting to login...");
            setIsError(false);
            setShowPopup(true);
            setTimeout(() => router.push("/sign-in"), 3000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMessage(
                    error.response?.data?.message ||
                        "An error occurred. Please try again."
                );
            } else {
                setMessage("An unknown error occurred. Please try again.");
            }
            setIsError(true);
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    return (
        <section className="flex w-screen items-center justify-center">
            <div className="container mx-auto w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-sm text-gray-600">
                        Enter your new password below to reset your account.
                    </p>
                    {countdown > 0 && (
                        <p className="text-sm text-gray-600">
                            Time remaining: {formatTime(countdown)}
                        </p>
                    )}
                    {countdown <= 0 && (
                        <p className="text-sm text-red-600">
                            Reset token has expired.
                        </p>
                    )}
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password:</Label>
                        <Input
                            id="password"
                            placeholder="Enter new password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading || countdown <= 0}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                            Confirm Password:
                        </Label>
                        <Input
                            id="confirm-password"
                            placeholder="Confirm new password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading || countdown <= 0}
                        />
                    </div>
                    <Button
                        onClick={handlePasswordReset}
                        className="w-full bg-[#6138BD] hover:bg-[#5B32D6]"
                        disabled={
                            isLoading ||
                            !password ||
                            !confirmPassword ||
                            countdown <= 0
                        }>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </div>

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
