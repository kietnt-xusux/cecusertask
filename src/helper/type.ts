export interface AuthUser {
    access_token: string;
    token_type: string;
}
export interface User {
    id: number;
    email: string;
    name: string;
    role: number;
    picture: string;
    created_at: string;
    deleted_at: string;
}

export interface ListBoxOption {
    id: number;
    name: string;
    value: string | number;
    disable?: boolean;
}
