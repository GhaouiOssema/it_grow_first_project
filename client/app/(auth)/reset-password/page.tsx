"use client";
import { Loader } from "lucide-react";
import ResetPasswordContent from "@/components/ResetPasswordContent";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<Loader />}>
            <ResetPasswordContent />
        </Suspense>
    );
}
