'use client';

import {ToastContainer} from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import {AdminHeader} from "@/components/Admin/AdminHeader";
import isAdminAuth from "@/components/Admin/AdminAuth";

const AdminLayout = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return <>
        <ToastContainer hideProgressBar={true} autoClose={5000} />
        <div className="flex w-full min-h-screen">
            <div className="flex-col h-screen bg-[#004EA2] w-[247px] px-4 py-8 shrink-0 hidden sm:flex">
                <Link
                    href="/admin"
                    className=""
                >
                    <Image
                        src="/images/common/logo_full.svg"
                        alt="logo"
                        width={167}
                        height={42}
                        priority={true}
                    />
                </Link>
                <h2 className="mt-5 text-white">日報管理画面</h2>
            </div>
            <div className="flex flex-col w-full overflow-hidden">
                <AdminHeader/>
                <div className="h-screen-header overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    </>;
}
export default isAdminAuth(AdminLayout);
