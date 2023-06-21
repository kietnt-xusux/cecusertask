import { createSlice } from "@reduxjs/toolkit";

interface SystemStateProps {
    menu: string,
    openMenu: boolean,
    openMobileMenu: boolean,
    params: {[key: string]: any},
}

export default createSlice({
    name: "dashboard",
    initialState: {
        menu: 'dashboard',
        openMenu: true,
        openMobileMenu: false,
        params: {},
    } as SystemStateProps,
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
        setCondition: (state, action) => {
            let key = action.payload.key;
            if (state.params) {
                state.params[key] = action.payload.data;
            } else {
                state = {
                    ...state,
                    params: {
                        [key]: action.payload.data
                    }
                }
            }

            return state;
        }
    },
});
