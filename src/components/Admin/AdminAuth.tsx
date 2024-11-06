'use client';
import {redirect} from "next/navigation";
import {useLayoutEffect} from "react";
import Cookies from 'js-cookie';
import {constants} from "@/helper/constants";

export const AdminAuth = ({children}: {children: any}) => {
    useLayoutEffect(() => {
        let session = Cookies.get('next_session'),
            user = session ? JSON.parse(session) : null;
        if (!user || user?.role !== constants.USER_ROLE_ADMIN) redirect('/admin/login');
    }, []);

    return <>{children}</>;
}
