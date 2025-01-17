"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const useProtectedRoute = (): void => {
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            const userToken = localStorage.getItem("token");

            if (!userToken || !session) {
                router.push("/sign-in");
            }
        };

        checkSession();
    }, [router]);
};

export default useProtectedRoute;
