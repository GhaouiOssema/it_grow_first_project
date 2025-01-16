"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useProtectedRoute = (): void => {
    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem("token");

        if (!userToken) {
            router.push("/sign-in");
        }
    }, [router]);
};

export default useProtectedRoute;
