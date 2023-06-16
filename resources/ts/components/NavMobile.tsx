import React from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/helper/type";
import {Link} from "react-router-dom";
import { HomeIcon, UsersIcon } from "./Icon";

export const NavMobile = () => {
    const menu = useSelector((state :RootState) => state.system.menu);
    const user = useSelector((state :RootState) => state.authentication.user);
    const role = user?.detail?.role;

    const normalMenu = "flex py-2 mt-2 h-9 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-blue-300 focus:outline-none focus:shadow-outline overflow-hidden px-4";
    const activeMenu = "flex py-2 mt-2 h-9 text-sm font-semibold text-white bg-blue-300 rounded-lg hover:bg-blue-300 focus:outline-none focus:shadow-outline overflow-hidden px-4";
    const iconClass = "w-5 h-5 text-white flex-shrink-0 mr-2";

    return (
        <nav className="flex-grow block overflow-y-auto bg-blue-400 h-screen px-4">
            <Link to="/" className={ menu === 'dashboard' ? activeMenu : normalMenu }>
                <HomeIcon className={iconClass} />
                <span>ダッシュボード</span>
            </Link>
            { role === 'admin' && <Link to="/users" className={ menu === 'user' ? activeMenu : normalMenu }>
                <UsersIcon className={iconClass} />
                <span>ユーザー</span>
            </Link> }
        </nav>
    )
}
