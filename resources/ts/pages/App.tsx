import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { routes } from "@/helper/routes";
import {useDispatch, useSelector} from "react-redux";
import {CustomRoute} from '@/components';
import {RootState} from "@/helper/type";

// import {userService} from "@/services";

export const App = () => {
    // const user = useSelector((state: RootState) => state.authentication.user);

    // useEffect(() => {
    //     user && userService.me().then(res => {
    //         dispatch({ type: userConstants.UPDATE_PROFILE_SUCCESS, detail: res })
    //     });
    // }, []);
    const user = useSelector((state: RootState) => state.authentication.user);


    if (Object.keys(user).length === 0) {
        // navigate(`/${getAdminRoute()}/login`);
        console.log(44444444);

    }

    return <BrowserRouter>
        <Routes>
            {routes.map((route, i) => <Route
                path={route.path}
                key={i}
                element={
                    <CustomRoute {...route}>
                        <route.component/>
                    </CustomRoute>
                }/>)
            }
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    </BrowserRouter>
}
