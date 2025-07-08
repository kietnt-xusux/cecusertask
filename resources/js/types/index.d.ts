import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import {FormDataConvertible} from "@inertiajs/core/types/types";
import {ColumnDef} from "@tanstack/react-table";

export interface Auth {
    user: User;
}

export interface BreadcrumbItemProps {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItemProps {
    title: string
    url: string
    isActive?: boolean
    items: {
        title: string
        url: string
        icon?: LucideIcon
    }[]
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface ItemsProps {
    data: any[];
    last_page: number;
    per_page: number;
    total: number;
}

export type ParamsProps = Record<string, FormDataConvertible>

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

interface ColumnMeta {
    title: string;
    icon?: string;
}

export type ColumnDefine = ColumnDef<User, unknown, unknown, unknown, ColumnMeta>;
