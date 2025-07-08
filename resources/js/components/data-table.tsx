import * as React from "react"
import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DataTableToolbar} from "@/components/data-table-toolbar";
import {useEffect, useRef, useState} from "react";
import {ItemsProps, ParamsProps} from "@/types";
import {router, usePage} from "@inertiajs/react";
import {LoaderCircle} from "lucide-react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    items: ItemsProps,
    params?: ParamsProps
    model: string,
}

const defaultParams = {
    page: 1,
    per_page: 20,
    sort_field: '',
    sort_value: 'asc',
    keyword: '',
}

export function DataTable<TData, TValue>({columns, items, params, model}: DataTableProps<TData, TValue>) {
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [parameters, setParameters] = useState<ParamsProps>(params ?? defaultParams);
    const [loading, setLoading] = useState(false);
    const isFirstRender = useRef(true);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setLoading(true);
        router.get(route(`admin.${model}.index`), parameters, {
            showProgress: true,
            onFinish: () => {
                setLoading(false);
            }
        });
    }, [parameters]);

    const table = useReactTable({
        data: items.data,
        columns,
        state: {
            columnVisibility,
            columnFilters,
        },
        enableRowSelection: true,
        onSortingChange: (sort) => {
            console.log(sort);
        },
        onGlobalFilterChange: (value) => {
            setParameters({...parameters, keyword: value})
        },
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar table={table} params={params}/>
            <div className="rounded-md border shadow-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-20"
                                >
                                    <div className="flex justify-center items-center h-full">
                                        <LoaderCircle className="animate-spin text-teal-600" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    結果がありません。
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
