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
