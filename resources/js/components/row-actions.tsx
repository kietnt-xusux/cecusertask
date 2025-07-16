import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Link, router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
    model?: string
}

export function DataTableRowActions<TData>({ row, model }: DataTableRowActionsProps<TData>) {
    const id = row.getValue('id') as number;
    const name = row.getValue('name') as string;

    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete user "${name}"?`)) {
            router.delete(`/admin/${model}/${id}`, {
                onSuccess: () => {
                    // Success notification will be handled by backend
                },
                onError: (errors) => {
                    console.error('Delete failed:', errors);
                }
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted cursor-pointer"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <Link href={`/admin/${model}/${id}/edit`}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                <DropdownMenuItem>Favorite</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
