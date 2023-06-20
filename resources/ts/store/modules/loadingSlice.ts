import {createSlice} from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        status: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload
        },
    },
});

export default loadingSlice;

export const {setStatus} = loadingSlice.actions
