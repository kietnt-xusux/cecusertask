import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import {AuthUser, User} from "@/helper/type";

export interface StoreInterface {
    loggedIn: boolean,
    user?: AuthUser,
    detail?: User,
    login: (user: AuthUser) => void,
    logout: () => void,
    update: (detail: User) => void,
}

export type StoreType = ReturnType<typeof initializeStore>;

const storeContext = createContext<StoreType | null>(null);

export const Provider = storeContext.Provider;

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext);

  if (!store) throw new Error("Store is missing the provider");

  return useZustandStore(store, selector);
}

export function initializeStore() {
    return createStore<StoreInterface>((set, get) => ({
        loggedIn: false,
        login: (user: AuthUser) => set({ user, loggedIn: true }),
        logout: () => set({
            loggedIn: false,
            user: undefined,
            detail: undefined,
        }),
        update: (detail: User) => set({ detail }),
    }));
}

