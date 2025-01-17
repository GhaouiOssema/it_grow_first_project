export interface Token {
    email: string;
    _id: string;
    username: string;
    iat: number;
    exp: number;
}

export interface userData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface CustomPopupProps {
    showPopup: boolean;
    setShowPopup: (open: boolean) => void;
    title: string;
    desc: string;
    setState: (state: boolean) => void;
    isError: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface GoogleLoginResponse {
    credential: string;
}

export interface BlogPost {
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
    author: string;
    slug: string;
}
