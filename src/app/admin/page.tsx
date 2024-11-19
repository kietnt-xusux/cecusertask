'use client';

import React, {useEffect} from "react";
import {useSystemStore} from "@/stores/system.storage";

const AdminDashboard = () => {
    const system = useSystemStore();
    useEffect(() => {
        system.setMenu('dashboard');
    }, []);

    return <div className="p-4 bg-stone-100 h-screen-header overflow-y-auto">

    </div>
}
export default AdminDashboard;
