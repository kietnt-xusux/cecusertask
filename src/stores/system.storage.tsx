import {create} from "zustand";
import {persist} from "zustand/middleware";

interface SystemState {
    menu: string,
    setMenu: (menu: string) => void,
}

export const useSystemStore = create<SystemState>()(persist(
    (set, get) => ({
        menu: 'dashboard',
        setMenu: (menu: string) => set({ menu: menu}),
    }), {
        name: 'system-storage',
    }
))
