import * as React from 'react';
import {Navigate, Route, useLocation} from "react-router-dom";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/helper/type";
import {getAdminRoute} from "@/helper/utils";
nprogress.configure({ showSpinner: false });

export const CustomRoute = ({ children, title, auth, admin }: { children: JSX.Element, title: string, auth?: boolean, admin?: boolean}) => {
        const user = useSelector((state: RootState) => state.authentication.user);
        let location = useLocation();
        const adminRoute = getAdminRoute();

        useEffect(() => {
            // @ts-ignore
            document.title = title.trim() !== "" ? title + " | " + appName : appName;
        }, [title]);

        if (auth) {
            return (
                Object.keys(user).length !== 0 ? (
                    admin && user.detail && user.detail.role !== 'admin' ? (
                        <Navigate to="/" replace/>
                    ) : children
                ) : <Navigate to={`/${adminRoute}/login`} state={{from: location}} replace/>
            )
        }

        return children;
};
