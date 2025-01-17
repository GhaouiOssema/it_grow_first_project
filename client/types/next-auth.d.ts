import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }

    interface User {
        isAuthorized: boolean;
        serverToken?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }
}
