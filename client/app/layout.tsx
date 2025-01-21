import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Jost } from "next/font/google";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "Internship Assignment",
    description: "IT Grow Internship Assignment",
};

const jost = Jost({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jost",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${jost.variable} font-sans`}>
            <head>
                <meta
                    httpEquiv="Cross-Origin-Opener-Policy"
                    content="same-origin"
                />
                <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
                <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </head>
            <body>
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-1">
                        <Providers>{children}</Providers>
                    </main>
                </div>
            </body>
        </html>
    );
}
