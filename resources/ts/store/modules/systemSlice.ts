import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "dashboard",
    initialState: {
        menu: 'dashboard',
        openMenu: true,
        openMobileMenu: false
    },
    reducers: {
        setMenu: (state, action) => {
            state.menu = action.payload
        },
        setOpenMenu: (state, action) => {
            state.openMenu = action.payload
        },
        setOpenMobileMenu: (state, action) => {
            state.openMobileMenu = action.payload
        },
    },
});
