import { createSlice } from "@reduxjs/toolkit";

const regionSlice = createSlice({
    name: 'region',
    initialState: {
        regions: [],
        region: null,
        paginateParams : "",
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
        setPaginateParams: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginateParams } = regionSlice.actions;
export default regionSlice.reducer;