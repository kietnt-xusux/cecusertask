import {create} from "zustand";
import {persist} from "zustand/middleware";

interface SystemState {
    menu: string,
    openMenu: boolean,
    setMenu: (menu: string) => void,
    setOpenMenu: (open: boolean) => void,
}

let hasHydrated = false;

export const useSystemStore = create<SystemState>()(persist(
    (set, get) => ({
        menu: 'dashboard',
        openMenu: true,
        setMenu: (menu: string) => set({ menu: menu}),
        setOpenMenu: (openMenu: boolean) => set({ openMenu: openMenu}),
    }), {
        name: 'system-storage',
    }
))
