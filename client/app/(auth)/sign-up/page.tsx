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

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
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

            const message =
                axios.isAxiosError(err) && err.response?.data?.message
                    ? err.response.data.message
                    : "An error occurred during registartion.";

            setPopupDesc(message);
            setShowPopup(true);
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
