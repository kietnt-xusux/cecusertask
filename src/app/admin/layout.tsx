'use client';

import {ToastContainer} from "react-toastify";
import Link from "next/link";
import {AdminHeader} from "@/components/Admin/AdminHeader";
import {AdminAuth, ChipIcon} from "@/components";
import AdminNav from "@/components/Admin/AdminNav";
import {useEffect} from "react";
import {useAuthenticationStore} from "@/stores";
import {userService} from "@/services";

const AdminLayout = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    const auth = useAuthenticationStore();
    useEffect(() => {
        auth.user && userService.me().then(res => {
            auth.update(res)
        });
    }, [auth.loggedIn]);

    return <AdminAuth>
        <ToastContainer hideProgressBar={true} autoClose={5000} />
        <div className="flex w-full min-h-screen">
            <div className="flex-col h-screen bg-teal-450 w-60 px-4 py-4 shrink-0 hidden sm:flex">
                <div className="flex justify-center">
                    <Link
                        href="/admin"
                        className=""
                    >
                        <ChipIcon className="size-12 text-white" />
                    </Link>
                </div>
                <AdminNav />
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                <AdminHeader/>
                <div className="h-screen-header overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    </AdminAuth>;
}
export default AdminLayout;
