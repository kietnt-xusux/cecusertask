import {getCostSituations} from "@/helper/utils";

export type IsOverEval = (testString: string, fontSize: number, characterSpacing: number, boxWidth: number) => boolean
import { rootReducer } from '@/store/store';

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

export interface CommonData {
    units: ListBoxOption[],
    merchants: ListBoxOption[],
    vendors: ListBoxOption[],
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
export interface Profile {
    id: bigint,
    email: string,
    name1: string,
    name2: string,
    name3: string,
    name4: string,
    role: string,
    company: string,
    zip : string,
    tel : string,
    fax : string,
    pref : string,
    address1 : string,
    address2 : string,
    address3 : string,
    reg_date: string,
    past_work: number
}

export interface Alphabets {
    alphabet_id: number,
    name: string,
}

export interface TableHeadField {
    name: string,
    title: string,
    noSort?: boolean,
    col?: number
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
