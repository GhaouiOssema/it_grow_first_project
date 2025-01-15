import Footer from "@/components/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-screen w-full">
            <main className="flex- h-full">{children}</main>
            <Footer />
        </div>
    );
};

export default AuthLayout;
