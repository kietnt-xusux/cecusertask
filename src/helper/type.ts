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

export interface TableHeadField {
    name: string;
    title: string;
    noSort?: boolean;
    col?: number;
}

export interface Field {
    name: string;
    validateOptions?: any;
    defaultValue: string | number;
    label: string;
    placeholder?: string;
    options?: ListBoxOption[];
    optionsV2?: any;
    type?: string;
    full?: boolean;
    classWidth?: string;
    value?: number;
    disabled?: boolean;
}
