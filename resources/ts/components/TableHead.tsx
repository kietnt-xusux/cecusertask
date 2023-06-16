import React from "react"
import {ChevronDownIcon, ChevronUpIcon, SelectorIcon} from "./Icon";

export const TableHead = ({ fields, sort, sortField, sortValue } : { fields :{name: string, title: string, notSort?: boolean}[], sort: any, sortField: string, sortValue: string}) => (
    <>
        { fields.map((item, index) => {
            return <th scope="col"
                       className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative` + (item.notSort ? '' : ' cursor-pointer')}
                       onClick={() => {
                           if (item.notSort) return;
                           sort(item.name, item.notSort)
                       }}
                       key={index}>
                {item.title}
                <span className="absolute right-1 top-2.5">
                    {
                        sortField && sortField === item.name ?
                            ( sortValue === 'ASC' ?
                                    <ChevronDownIcon className="h-5 w-5 inline-block text-indigo-500"/> :
                                    <ChevronUpIcon className="h-5 w-5 inline-block text-indigo-500"/>
                            ) : ( !item.notSort && <SelectorIcon className="h-5 w-5 inline-block text-gray-300"/>)
                    }
                </span>
            </th>
        }) }
    </>
)
