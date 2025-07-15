import {Column, Table} from "@tanstack/react-table"
import {Check, PlusCircle, Search, SearchIcon, Settings2, XIcon} from "lucide-react"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from "@/components/ui/command";
import {cn, getUserRole} from "@/lib/utils";
import {ColumnMeta, ParamsProps} from "@/types";
import React, {useState} from "react";

interface DataTableToolbarProps<TData> {
    table: Table<TData>,
    resetFilter: React.RefObject<boolean>,
    params?: ParamsProps,
}

function getFilterColumns<TData>(table: Table<TData>) {
    return table
        .getAllColumns()
        .filter((column) => {
            const meta = column.columnDef.meta as ColumnMeta | undefined;
            return typeof column.accessorFn !== "undefined" && column.getCanHide() && meta?.filterable
        })
}

export function DataTableToolbar<TData>({table, params, resetFilter}: DataTableToolbarProps<TData>) {
    const [keyword, setKeyword] = useState('');
    const isFiltered = table.getState().columnFilters.length > 0 || table.getState().globalFilter !== '';

    const search = () => {
        if (keyword.trim() === '') return;
        table.setGlobalFilter(keyword);
    }

    const reset = () => {
        resetFilter.current = true;
        table.resetGlobalFilter(true);
        table.resetColumnFilters(true);
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex gap-2">
                    <Input
                        placeholder="フィルター"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') search();
                        }}
                    />
                    <Button
                        variant="secondary"
                        className="bg-teal-600 h-8 px-2 lg:px-3 hover:bg-teal-700"
                        onClick={search}
                    >
                        <Search className="text-white" />
                    </Button>
                    {getFilterColumns(table).map(column => {
                        const meta = column.columnDef.meta as ColumnMeta | undefined;
                        return <DataTableFacetedFilter
                            column={column}
                            title={meta?.title}
                            options={meta?.options ?? []}
                            key={column.id}
                        />
                    })}
                    {table.getState().globalFilter !== '' && (
                        <div className="flex items-center px-3 border-dashed border rounded-md gap-2">
                            <SearchIcon className="size-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal"
                            >
                                 {table.getState().globalFilter}
                            </Badge>
                        </div>
                    )}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={reset}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <XIcon/>
                        </Button>
                    )}
                </div>
            </div>
            <DataTableViewOptions table={table}/>
        </div>
    )
}

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}

export function DataTableViewOptions<TData>({table}: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <Settings2/>
                    表示
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>列の表示切替</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {
                        const meta = column.columnDef.meta as ColumnMeta | undefined;
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize cursor-pointer"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(value)}
                            >
                                {meta?.title ?? column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
}

export function DataTableFacetedFilter<TData, TValue>({column, title, options}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const selectedValues = new Set(column?.getFilterValue() as string[])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircle/>
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4"/>
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size}個選択中
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title}/>
                    <CommandList>
                        <CommandEmpty>見つかりません</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(option.value)
                                            } else {
                                                selectedValues.add(option.value)
                                            }
                                            const filterValues = Array.from(selectedValues)
                                            column?.setFilterValue(
                                                filterValues.length ? filterValues : undefined
                                            )
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check/>
                                        </div>
                                        {option.icon && (
                                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground"/>
                                        )}
                                        <span>{option.label}</span>
                                        {facets?.get(option.value) && (
                                            <span
                                                className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs"
                                            >
                                                {facets.get(option.value)}
                                            </span>
                                        )}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator/>
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => column?.setFilterValue(undefined)}
                                        className="justify-center text-center"
                                    >
                                        フィルターをクリア
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
