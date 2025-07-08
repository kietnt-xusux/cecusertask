import React from "react";
import {LayoutGridIcon, UsersIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePage} from "@inertiajs/react";

interface NavItem {
    name: string;
    href: string;
    icon: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        name: "ダッシュボード",
        href: "/admin",
        icon: <LayoutGridIcon />
    },
    {
        name: "ユーザー ",
        href: "/admin/users",
        icon: <UsersIcon />
    },
]

export default function AdminNav() {
    const { url } = usePage();

    return (
        <div className="relative flex w-full min-w-0 flex-col px-2">
            <ul className="flex w-full min-w-0 flex-col gap-1">
                {navItems.map(item => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            data-active={url.startsWith(item.href)}
                            className={cn(
                                "flex items-center p-2 gap-2 text-sm font-medium rounded-md text-neutral-900",
                                "hover:bg-neutral-100 overflow-hidden transition-[width,padding] duration-300 ease-out]",
                                'data-[active=true]:bg-neutral-100 [&>svg]:size-4 [&>svg]:shrink-0 [&>span:last-child]:truncate',
                            )}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
