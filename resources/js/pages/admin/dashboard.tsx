import { BreadcrumbItemProps } from '@/types';
import { Head } from '@inertiajs/react';
import AdminLayout from "@/components/Admin/AdminLayout";

const breadcrumbs: BreadcrumbItemProps[] = [
    {
        title: 'Dashboard',
        href: '/admin',
    },
];

export default function Dashboard() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-hidden">
                Dashboard
            </div>
        </AdminLayout>
    );
}
