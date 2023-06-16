import React from "react";
import { Link } from "react-router-dom";
import { User } from "@/helper/type";
import { getAdminRoute, getRole } from "@/helper/utils";

const UserItem = (props: { user: User }) => {
    const adminRoute = getAdminRoute();
    return (
        <tr>
            <td className="px-4 py-2 whitespace-nowrap">
                <Link to={`/${adminRoute}/users/${props.user.id}`} className="text-indigo-500">{props.user.name}</Link>
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {props.user.email}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {getRole(props.user.role)}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
                {props.user.created_at}
            </td>
        </tr>
    )
}

export default UserItem;
