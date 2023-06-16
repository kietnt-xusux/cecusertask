import React from "react";

import {getAdminRoute} from "@/helper/utils";
import PublicHomepage from "@/pages/Public/Common/PublicHomepage";
import Dashboard from "@/pages/Admin/Common/Dashboard";
import AdminLogin from "@/pages/Admin/Auth/AdminLogin";
import Profile from "@/pages/Admin/Users/Profile";
import UserIndex from "@/pages/Admin/Users/UserIndex";
import UserForm from "@/pages/Admin/Users/UserForm";

const adminRoute = getAdminRoute();

export const routes = [
    // Common Page
    {
        title: '',
        path: '/',
        component: PublicHomepage,
    }, {
        title: 'admin',
        path: `/${adminRoute}`,
        auth: true,
        admin: true,
        component: Dashboard,
    }, {
        title: 'マイページ',
        path: `/${adminRoute}/profile`,
        auth: true,
        admin: true,
        component: Profile,
    }, {
        title: 'ユーザー',
        path: `/${adminRoute}/users`,
        exact: true,
        private: true,
        admin: true,
        component: UserIndex
    }, {
        title: 'ユーザー登録',
        path: `/${adminRoute}/users/create`,
        exact: true,
        private: true,
        admin: true,
        component: UserForm
    }, {
        title: 'ユーザー変更',
        path: `/${adminRoute}/users/:id`,
        private: true,
        component: UserForm
    },
    // Auth
    {
        title: 'ログイン',
        path: `/${adminRoute}/login`,
        name: 'Login',
        component: AdminLogin,
    },
];
