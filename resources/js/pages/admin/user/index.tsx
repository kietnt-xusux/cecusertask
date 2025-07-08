import React from 'react';
import AdminLayout from "@/components/Admin/AdminLayout";
import {DataTable} from "@/components/data-table";
import {Head} from "@inertiajs/react";
import {ItemsProps, ParamsProps, User} from "@/types";
import {ColumnDef} from "@tanstack/react-table";
import {DataTableColumnHeader} from "@/components/cloumns-header";
import {DataTableRowActions} from "@/components/row-actions";

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
        accessorKey: "name",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="ユーザー名"/>
        ),
        cell: ({row}) => <div>{row.getValue("name")}</div>,
        enableHiding: false,
        meta: {
            title: 'ユーザー名'
        }
    },
    {
        accessorKey: "email",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="メールアドレス"/>
        ),
        cell: ({row}) => <div>{row.getValue("email")}</div>,
        meta: {
            title: 'メールアドレス'
        }
    },
    {
        accessorKey: "role",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="役割"/>
        ),
        cell: ({row}) => {
            return <div>{row.getValue("role")}</div>
        },
        meta: {
            title: '役割'
        }
    },
    {
        accessorKey: "created_at",
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="登録日時"/>
        ),
        cell: ({row}) => <div>{row.getValue("created_at")}</div>,
        meta: {
            title: '登録日時'
        }
    },
    {
        id: "actions",
        cell: ({row}) => <DataTableRowActions row={row}/>,
    },
]

export default function UsersIndex({items, params}: { items: ItemsProps, params: ParamsProps }) {
    return <AdminLayout breadcrumbs={breadcrumbs}>
        <Head title='ユーザー一覧' />
        <div className="h-full flex-1 flex-col space-y-4 sm:p-6 md:flex">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">ユーザー一覧</h2>
            </div>
            <DataTable items={items} columns={columns} params={params} model='users' />
        </div>
    </AdminLayout>
}
