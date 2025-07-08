import {BreadcrumbItemProps, SharedData,} from "@/types";
import React, {ReactNode} from "react";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {usePage} from "@inertiajs/react";

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItemProps[];
}

export default function AdminLayout({children, breadcrumbs = []}: AdminLayoutProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    return (
        <SidebarProvider defaultOpen={isOpen}>
            <AppSidebar/>
            <SidebarInset>
                <header
                    className={cn(
                        "flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear",
                        "group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
                    )}
                >
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-pointer"/>
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumbs breadcrumbs={breadcrumbs}  />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
