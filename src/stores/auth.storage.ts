import {AuthUser, User} from "@/helper/type";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface AuthenticationState {
    loggedIn: boolean,
    user?: AuthUser,
    detail?: User,
    login: (user: AuthUser) => void,
    logout: () => void,
    update: (detail: User) => void,
}

export const useAuthenticationStore = create<AuthenticationState>()(persist(
    (set) => ({
        loggedIn: false,
        login: (user: AuthUser) => set({ user: user, loggedIn: true }),
        logout: () => set({
            loggedIn: false,
            user: undefined,
            detail: undefined,
        }),
        update: (detail: User) => set({ detail }),
    }), {
        name: 'authentication-storage'
    }
))
