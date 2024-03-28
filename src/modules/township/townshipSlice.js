import { createSlice } from "@reduxjs/toolkit";
import { townshipPayload } from "./townshipPayload";

const townshipSlice = createSlice({
    name: 'city',
    initialState: {
        townships: [],
        township: null,
        paginateParams : townshipPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.townships = action.payload;
            return state;
        },
        update: (state, action) => {
            state.township = action.payload;
            return state;
        },
        show: (state, action) => {
            state.township = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = townshipSlice.actions;
export default townshipSlice.reducer;