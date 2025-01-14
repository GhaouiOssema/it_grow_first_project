import Footer from "@/components/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full boor">
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default AuthLayout;
