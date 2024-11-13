import React, { useState } from 'react';
import { User } from '@/helper/type';
import Link from "next/link";
import {getUserRole} from "@/helper/util";

const UserItem = ({ item, setParams, params}: { item: User, setParams: any, params: any}) => {
    return (
        <tr className="even:bg-gray-50">
            <td className='px-4 py-2 whitespace-nowrap'>{item.id + ''}</td>
            <td className='px-4 py-2 whitespace-nowrap'>
                <Link href={`/admin/users/${item.id}`} className='text-indigo-500'>
                    {item.name}
                </Link>
            </td>
            <td className='px-4 py-2 whitespace-nowrap'>{item.email}</td>
            <td className='px-4 py-2 whitespace-nowrap'>{getUserRole(item.role)}</td>
            <td className='px-4 py-2 whitespace-nowrap'>{item.created_at}</td>
        </tr>
    );
};

export default UserItem;
