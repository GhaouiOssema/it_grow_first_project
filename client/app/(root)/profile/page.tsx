"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Token } from "@/app/types";

export default function ProfilePage() {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode<Token>(token);
                setEmail(decoded.email); // Set the decoded email
            } catch (error) {
                console.error("Failed to decode token", error);
            }
        }
    }, []);

    return (
        <section className="flex flex-col items-center justify-center space-y-4 mt-9">
            <div className="container mx-auto w-full max-w-lg">
                <h1 className="text-2xl font-bold">Profile</h1>
                {email ? (
                    <div className="space-y-2">
                        <p className="text-lg">Email: {email}</p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">
                        No email found in token
                    </p>
                )}
            </div>
        </section>
    );
}
