import Link from "next/link";
import {useSystemStore} from "@/stores/system.storage";
import {clsx} from "clsx";

const AdminNav = () => {
    const menu = useSystemStore(s => s.menu);
    const getMenuClass = (menuName: string, subMenu?: boolean) => {
        return clsx(
            "py-2 pr-3 block focus:outline-none rounded-md",
            menuName === menu ? 'bg-teal-650/50' : 'hover:bg-teal-650/30',
            subMenu ? "pl-10" : "pl-3"
        );
    }

    return (
        <nav className="flex flex-col mt-10">
            <ul role="list" className="text-white font-bold space-y-2">
                <li>
                    <Link href="/admin" className={getMenuClass('dashboard')}>ホーム</Link>
                </li>
                <li>
                    <Link href="/admin/users" className={getMenuClass('user')}>ユーザー</Link>
                </li>
            </ul>
        </nav>
    )
}
export default AdminNav;
