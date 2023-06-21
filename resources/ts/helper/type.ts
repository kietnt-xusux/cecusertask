import Dashboard from "@/pages/Admin/Common/Dashboard";

export type IsOverEval = (testString: string, fontSize: number, characterSpacing: number, boxWidth: number) => boolean
import { rootReducer } from '@/store';
import {JSX} from "react";

export type RootState = ReturnType<typeof rootReducer>;

export interface PDFSchema {
    type: 'text' | 'line' | 'image',
    position?: {
        x: number,
        y: number,
    },
    width?: number,
    height?: number,
    alignment?: 'left' | 'center' | 'right',
    fontSize?: number,
    characterSpacing?: number,
    lineHeight?: number,
    backgroundColor?: string,
    fontWeight?: 'regular' | 'bold',
    start?: {
        x: number,
        y: number,
    },
    end?: {
        x: number,
        y: number,
    },
    thickness?: number,
    opacity?: number,
    dashArray?: Array<number>,
    link?: string,
}

export interface PDFSchemas {
    [key: string]: PDFSchema
}

export interface Auth {
    loggedIn: boolean
    user?: AuthUser
}

export interface AuthUser {
    access_token?: string,
    detail?: User,
    expires_in?: number,
    token_type?: string
}

export interface LocationState {
    from: {
        pathname: string;
    };
    detail_id: string,
}

export interface ServiceProps {
    [K:string] : (params?: any, ...attr: any) => Promise<any>
}

export interface Field {
    name: string,
    validateOptions?: any,
    defaultValue: string | number,
    label: string,
    placeholder?: string,
    options?: ListBoxOption[],
    type?: string,
    full?: boolean,
}

export interface ListBoxOption {
    id: number,
    name: string,
    value: string | number,
    disable?: boolean
}

export interface TableHeadField {
    name: string,
    title: string,
    noSort?: boolean,
    col?: number
}

export interface RouteProps {
    title: string,
    path: string,
    private?: boolean,
    auth?: boolean,
    admin?: boolean,
    component: () => JSX.Element,
}

export interface ConditionsProps {
    perPage: number,
    lastPage: number,
    sortField: string,
    sortValue: string,
    page: number,
    searchText: string,
}

export interface User {
    id: bigint,
    email: string,
    first_login: number,
    name: string,
    name_kana: string,
    picture: string,
    stamp: string,
    role: string,
    email_verified_at: string,
    created_at: string,
}
