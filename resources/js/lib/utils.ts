import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserRole() {
    return [
        {
            label: "ユーザー",
            value: '1',
        },
        {
            label: "マネジャー",
            value: '2',
        },
        {
            label: "アドミン",
            value: '6',
        },
    ]
}

export function getPerPage(): number[] {
    return [
        20,
        50,
        100,
        150,
        200,
    ]
}
