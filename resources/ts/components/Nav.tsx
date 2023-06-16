import React from "react"
import {useSelector} from "react-redux";
import {RootState} from "@/helper/type";
import {Link} from "react-router-dom";
import {
    BriefcaseIcon,
    BuildingOffice2Icon,
    DocumentIcon, DocumentTextIcon,
    HomeIcon,
    TruckIcon,
    UsersIcon,
    WrenchIcon
} from "@/components/Icon";
import { getAdminRoute } from "@/helper/utils";

export const Nav = () => {
    const adminRoute = getAdminRoute();
    const menu = useSelector((state :RootState) => state.system.menu);
    const user = useSelector((state :RootState) => state.authentication.user);

    const role = user?.detail?.role;
    const openMenu = useSelector((state: RootState) => state.system.openMenu);

    const normalMenu = "flex py-1.5 mt-2 h-8 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-blue-300 focus:outline-none focus:shadow-outline overflow-hidden "
        + (openMenu ? 'px-2' : 'px-1 justify-center');
    const activeMenu = "flex py-1.5 mt-2 h-8 text-sm font-semibold text-white bg-blue-300 rounded-lg hover:bg-blue-300 focus:outline-none focus:shadow-outline overflow-hidden "
        + (openMenu ? 'px-2' : 'px-1 justify-center');
    const iconClass = "w-5 h-5 text-white flex-shrink-0 " + (openMenu ? 'mr-2' : '');
    const textClass = 'whitespace-nowrap' + (openMenu ? '' : ' hidden');

    return (
        <nav className={`flex-grow md:block md:overflow-y-auto hidden bg-blue-400 h-screen px-1`}>
            <Link to="/" className={ menu === 'dashboard' ? activeMenu : normalMenu }>
                <HomeIcon className={iconClass} />
                <span className={textClass}>ダッシュボード</span>
            </Link>

            { role === 'admin' && <Link to={`/${adminRoute}/users`} className={ menu === 'user' ? activeMenu : normalMenu }>
                <UsersIcon className={iconClass} />
                <span className={textClass}>ユーザー</span>
            </Link> }
        </nav>
    )
}
