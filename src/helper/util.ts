import {ListBoxOption} from "@/helper/type";

export const randomString = (length?: number, type?: string) => {
    let result = '',
        characters = type === 'number' ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charactersLength = characters.length,
        stringLength = length ?? 10;
    for ( let i = 0; i < stringLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const isClient = (): boolean => {
    return typeof window !== 'undefined';
}

export const listPerPage = () => {
    return [
        { id: 1, value: 20, name: '20' },
        { id: 2, value: 50, name: '50' },
        { id: 3, value: 100, name: '100' },
        { id: 4, value: 200, name: '200' },
        { id: 5, value: 500, name: '500' }
    ];
};

export const getUserRoles = (): ListBoxOption[] => {
    return [
        { id: 1, name: 'User', value: 1 },
        { id: 2, name: 'Manager', value: 2 },
        { id: 3, name: 'Admin', value: 6 },
    ];
};

export const getUserRole = (role: number) => {
    if (!role || typeof role !== 'number') role = 1
    return getUserRoles().find(r => r.value === role)!.name;
}
