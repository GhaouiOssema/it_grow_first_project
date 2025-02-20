"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import CustomPopup from "@/components/CustomPopup";

export default function SignInPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setIsError(true);
            setShowPopup(true);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    email,
                    password,
                    rememberMe,
                }
            );

            localStorage.setItem("token", response.data.access_token);

            window.location.reload();
            router.push("/");
        } catch (err) {
            const message =
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "An error occurred during login.";
            setError(message);
            setIsError(true);
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const result = await signIn("google", {
            callbackUrl: "http://localhost:3000/",
        });

        if (result?.url) {
            const session = await getSession();
            console.log("Session data after Google login:", session);

            if (session && session.accessToken) {
                localStorage.setItem("token", session.accessToken);
                router.push(result.url);
            } else {
                setError("Failed to retrieve access token from Google.");
                setIsError(true);
                setShowPopup(true);
            }
        }
    };

    return (
        <section className="mt-20 flex flex-col h-full w-full items-center justify-center">
            <div className="container mx-auto w-full max-w-lg space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Log in</h1>
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
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password :</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                placeholder="Password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                                className="absolute right-3 top-3">
                                {passwordVisible ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2 flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-brand-gray hover:text-brand-color underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) =>
                                    setRememberMe(checked as boolean)
                                }
                            />
                            <label htmlFor="remember" className="text-sm">
                                Save my info
                            </label>
                        </div>
                    </div>
                    <Button
                        className="w-full bg-brand-color hover:bg-[#5B32D6]"
                        onClick={handleLogin}
                        disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}>
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Log in with Google
                    </Button>
                    <div className="text-center text-sm">
                        <span className="text-brand-gray">
                            Don&apos;t have an account?{" "}
                        </span>
                        <Link
                            href="/sign-up"
                            className="text-brand-color underline hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>

            {showPopup && (
                <CustomPopup
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                    title={isError ? "Error" : "Login Success"}
                    desc={error || "Successfully logged in!"}
                    setState={setShowPopup}
                    isError={isError}
                />
            )}
        </section>
    );
}
