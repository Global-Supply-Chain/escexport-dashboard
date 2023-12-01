import { createSlice } from "@reduxjs/toolkit";
import { regionPayload } from "./regionPayload";

const regionSlice = createSlice({
    name: 'region',
    initialState: {
        regions: [],
        region: null,
        paginateParams : regionPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.regions = action.payload;
            return state;
        },
        update: (state, action) => {
            state.region = action.payload;
            return state;
        },
        show: (state, action) => {
            state.region = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = regionSlice.actions;
export default regionSlice.reducer;