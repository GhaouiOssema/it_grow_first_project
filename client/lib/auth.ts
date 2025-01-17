import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                try {
                    const response = await axios.post(
                        "http://localhost:3001/auth/validate-user",
                        {
                            email: profile.email,
                        }
                    );

                    const data = response.data;

                    if (data.exists) {
                        token.isAuthorized = true;
                        token.serverToken = data.token;
                        console.log("Token stored in JWT:", token.serverToken);
                    } else {
                        token.isAuthorized = false;
                    }
                } catch (error) {
                    console.error("Error validating user:", error);
                    token.isAuthorized = false;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.serverToken) {
                session.accessToken = token.serverToken as string;
            }
            return session;
        },
    },
};
