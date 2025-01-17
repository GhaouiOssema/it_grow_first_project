import Footer from "@/components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 w-full flex justify-center items-center px-4 bg-white">
                <GoogleOAuthProvider clientId="699485320714-rf148e2k703ogmv9k1767seqljnjp597.apps.googleusercontent.com">
                    {children}
                </GoogleOAuthProvider>
            </main>
            <div className="py-5 bg-[#11204D] text-white">
                <Footer />
            </div>
        </div>
    );
};

export default AuthLayout;
