import Footer from "@/components/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full flex justify-center items-center px-4 bg-white">
                {children}
            </main>
            <div className="py-5 bg-[#11204D] text-white">
                <Footer />
            </div>
        </div>
    );
};

export default AuthLayout;
