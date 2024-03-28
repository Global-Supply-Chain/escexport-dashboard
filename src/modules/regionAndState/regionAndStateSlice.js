import { createSlice } from "@reduxjs/toolkit";
import { regionAndStatePayload } from "./regionAndStatePayload";

const regionAndStateSlice = createSlice({
    name: 'regionAndState',
    initialState: {
        regionAndStates: [],
        regionAndState: null,
        paginateParams : regionAndStatePayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.regionAndStates = action.payload;
            return state;
        },
        update: (state, action) => {
            state.regionAndState = action.payload;
            return state;
        },
        show: (state, action) => {
            state.regionAndState = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = regionAndStateSlice.actions;
export default regionAndStateSlice.reducer;