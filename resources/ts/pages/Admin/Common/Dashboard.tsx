import React, {useEffect, useMemo, useRef, useState} from "react";
import AdminLayout from "@/pages/Admin/Common/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import systemSlice from '@/store/modules/systemSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const _isMounted = useRef(true);

    const logoList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(systemSlice.actions.setMenu('dashboard'))

        return () => {
            _isMounted.current = false;
        };
    }, []);

    return (<AdminLayout>
        <div className="min-h-screen-header h-screen-header overflow-auto" ref={logoList}>
                <div className="grid grid-cols-5 2xl:grid-cols-7 py-4 px-2">
                    <div className="col-span-4 2xl:col-span-6">

                    </div>
                </div>
            </div>
    </AdminLayout>)
}

export default Dashboard;
