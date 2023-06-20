import { createSlice } from "@reduxjs/toolkit";
import {AuthUser} from "@/helper/type";


export default createSlice({
    name: "auth",
    initialState: {
        token: null,
        user: <AuthUser>({}),
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        loginSuccess: (state, action) => {
            state.user = action.payload
            state.token = action.payload.access_token
        },
        logoutSuccess: (state) => {
            state.user = {}
            state.token = null
        },
    },
});
