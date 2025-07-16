import React from 'react';
import AdminLayout from "@/components/Admin/AdminLayout";
import { DataTable } from "@/components/data-table";
import { Head, Link, usePage } from "@inertiajs/react";
import { ItemsProps, ParamsProps, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/cloumns-header";
import { DataTableRowActions } from "@/components/row-actions";
import { getUserRole } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import notify from "@/components/notify";
import { useEffect } from "react";

const breadcrumbs = [
    {
        title: 'ユーザー',
        href: '/admin/users',
    }
]


const columns: ColumnDef<any>[] = [
    {
        id: "select",
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("id")}</div>,
        enableHiding: false,
        meta: {
            title: 'ID'
        }
    },
    {
        accessorKey: "avatar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avatar" />
        ),
        cell: ({ row }) => (
            <div className="flex items-center">
                <img
                    src={row.getValue("avatar") || 'https://via.placeholder.com/100x100.png/005555?text=user'}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                />
            </div>
        ),
        enableHiding: false,
        meta: {
            title: 'Avatar'
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ユーザー名" />
        ),
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableHiding: false,
        meta: {
            title: 'ユーザー名'
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="メールアドレス" />
        ),
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
        meta: {
            title: 'メールアドレス'
        }
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="役割" />
        ),
        cell: ({ row }) => {
            return <div>{row.getValue("role")}</div>
        },
        meta: {
            title: '役割',
            filterable: true,
            options: getUserRole()
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="登録日時" />
        ),
        cell: ({ row }) => <div>{row.getValue("created_at")}</div>,
        meta: {
            title: '登録日時'
        }
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} model="users" />,
    },
]

export default function UsersIndex({ items, params }: { items: ItemsProps, params: ParamsProps }) {
    const { flash } = usePage().props as any;

    // Show success message if exists
    useEffect(() => {
        if (flash?.success) {
            notify.success(flash.success);
        }
        if (flash?.error) {
            notify.error(flash.error);
        }
    }, [flash]);

    return <AdminLayout breadcrumbs={breadcrumbs}>
        <Head title='ユーザー一覧' />
        <div className="h-full flex-1 flex-col space-y-4 p-2 sm:px-6 sm:pt-2 sm:pb-10 md:flex">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">ユーザー一覧</h2>
                <Link href="/admin/users/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create
                    </Button>
                </Link>
            </div>
            <DataTable items={items} columns={columns} params={params} model='users' />
        </div>
    </AdminLayout>
}
