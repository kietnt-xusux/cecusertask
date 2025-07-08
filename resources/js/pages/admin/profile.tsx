import AdminLayout from "@/components/Admin/AdminLayout";
import {Head} from "@inertiajs/react";

const breadcrumbs = [
    {
        title: 'プロフィール',
        href: '/profile',
    },
];

export default function AdminProfile() {
    return <AdminLayout breadcrumbs={breadcrumbs}>
        <Head title={'プロフィール'} />
        <div className="px-4 py-6">
            Profile
        </div>
    </AdminLayout>
}
