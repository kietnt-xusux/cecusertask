import * as React from "react"
import {
    GalleryVerticalEnd,
    LayoutGrid,
    Users,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar"
import {cn} from "@/lib/utils";
import {NavItemProps} from "@/types";

const navMain: NavItemProps[]  = [
    {
        title: "共通",
        url: "#",
        isActive: true,
        items: [
            {
                title: "ダッシュボード",
                url: "/admin",
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: "マスター",
        url: "#",
        items: [
            {
                title: "ユーザー",
                url: "/admin/users",
                icon: Users,
            },
        ],
    },
];

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-neutral-100 data-[state=open]:text-sidebar-accent-foreground"
                >
                    <div
                        className={cn(
                            "bg-teal-600 text-sidebar-primary-foreground flex aspect-square size-8 items-center",
                            "justify-center rounded-lg"
                        )}
                    >
                        <GalleryVerticalEnd className="size-4"/>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Xusux</span>
                        <span className="truncate text-xs">be a smile maker</span>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
