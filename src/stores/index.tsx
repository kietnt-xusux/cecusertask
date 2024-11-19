"use client";

import { useRef } from "react";
import type {StoreType} from "./auth.storage";
import { initializeStore, Provider } from "./auth.storage";

export default function StoreProvider({
  children,
  ...props
}) {
    const storeRef = useRef<StoreType>();
    if (!storeRef.current) {
        storeRef.current = initializeStore();
    }
    return <Provider value={storeRef.current}>{children}</Provider>
}
