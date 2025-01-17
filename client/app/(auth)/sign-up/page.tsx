"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { userData } from "@/types";
import CustomPopup from "@/components/CustomPopup";
import { jwtDecode } from "jwt-decode";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

export default function SignUpPage() {
    const [formData, setFormData] = useState<userData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] =
        useState<boolean>(false);

    const [popupTitle, setPopupTitle] = useState<string>("");
    const [popupDesc, setPopupDesc] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setPopupTitle("Password Mismatch");
            setPopupDesc("The passwords do not match.");
            setShowPopup(true);
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }
            );

            if (res.status === 201) {
                setError(false);
                setPopupTitle("Registration Successful");
                setPopupDesc(
                    "You have successfully registered! You will be redirected to the login page shortly."
                );
                setShowPopup(true);

                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    router.push("/sign-in");
                }, 3000);
            }
        } catch (err) {
            setError(true);
            setPopupTitle("Registration Failed");
            setPopupDesc("Registration failed. Please try again.");
            setShowPopup(true);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleGoogleSuccess = async (
        credentialResponse: CredentialResponse
    ) => {
        if (credentialResponse.credential) {
            const decodedData: { email: string; name: string } = jwtDecode(
                credentialResponse.credential
            );

            const googleData = {
                username: decodedData.name,
                email: decodedData.email,
            };

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/register/google`,
                    googleData
                );

                if (res.status === 201) {
                    // Handle success (e.g., redirect or show success popup)
                }
            } catch (err) {
                console.error("Google Registration Failed", err);
                // Handle error
            }
        } else {
            console.error("Google login failed: No credential found");
        }
    };

    const handleGoogleError = () => {
        console.log("Google login failed");
    };

    return (
        <section className="flex flex-col h-full w-full items-center justify-center">
            <div className="mt-[5rem] container mx-auto w-full max-w-md space-y-4 ">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Sign up</h1>
                </div>
                <div className="space-y-2">
                    <div className="space-y-2">
                        <Label htmlFor="username">User name :</Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="User name"
                            type="text"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address :</Label>
                        <Input
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            type="email"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password :</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password"
                                type={passwordVisible ? "text" : "password"}
                            />
                            {passwordVisible ? (
                                <EyeOff
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                            Confirm password :
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm password"
                                type={
                                    confirmPasswordVisible ? "text" : "password"
                                }
                            />
                            {confirmPasswordVisible ? (
                                <EyeOff
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            ) : (
                                <Eye
                                    className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                    <Button
                        className="w-full bg-brand-color hover:bg-[#5B32D6]"
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? "Creating account..." : "Create account"}
                    </Button>
                    {/* <Button variant="outline" className="w-full">
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
                        Sign up with Google
                    </Button> */}

                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                    />

                    <div className="text-center text-sm">
                        <span className="text-brand-gray">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href="/sign-in"
                            className="text-brand-color underline hover:underlinee">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Success or Error Popup */}
            {showPopup && (
                <CustomPopup
                    setShowPopup={setShowPopup}
                    showPopup={showPopup}
                    title={popupTitle}
                    desc={popupDesc}
                    setState={setShowPopup}
                    isError={error}
                />
            )}
        </section>
    );
}
