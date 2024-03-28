import { createSlice } from "@reduxjs/toolkit";
import { cityPayload } from "./cityPayload";

const citySlice = createSlice({
    name: 'city',
    initialState: {
        cities: [],
        city: null,
        paginateParams : cityPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.cities = action.payload;
            return state;
        },
        update: (state, action) => {
            state.city = action.payload;
            return state;
        },
        show: (state, action) => {
            state.city = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = citySlice.actions;
export default citySlice.reducer;