import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, SelectorIcon } from './Icon';
import { TableHeadField } from '@/helper/type';
import {clsx} from "clsx";

export const TableHead = ({
    fields,
    sort,
    sortField,
    sortValue
}: {
    fields: TableHeadField[];
    sort: any;
    sortField: string;
    sortValue: string;
}) => (
    <tr>
        {fields.map(item => {
            return (
                <th
                    scope='col'
                    className={clsx(
                        "sm:px-3 pl-4 pr-3 py-3 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider relative",
                        item.noSort && 'cursor-pointer',
                    )}
                    onClick={() => {
                        if (item.noSort) return;
                        sort(item.name, item.noSort);
                    }}
                    key={`${item.name}_col`}
                    colSpan={item.col ?? 1}
                >
                    {item.title}
                    <span className='absolute right-1 top-2.5'>
                        {sortField && sortField === item.name ? (
                            sortValue === 'ASC' ? (
                                <ChevronDownIcon className='h-5 w-5 inline-block text-indigo-500' />
                            ) : (
                                <ChevronUpIcon className='h-5 w-5 inline-block text-indigo-500' />
                            )
                        ) : (
                            !item.noSort && <SelectorIcon className='h-5 w-5 inline-block text-gray-300' />
                        )}
                    </span>
                </th>
            );
        })}
    </tr>
);
