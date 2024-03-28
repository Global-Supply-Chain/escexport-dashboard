import { createSlice } from "@reduxjs/toolkit";
import { countryPayload } from "./countryPayload";

const countrySlice = createSlice({
    name: 'admin',
    initialState: {
        countries: [],
        country: null,
        paginateParams: countryPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.countries = action.payload;
            return state;
        },
        update: (state, action) => {
            state.country = action.payload;
            return state;
        },
        show: (state, action) => {
            state.country = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = countrySlice.actions;
export default countrySlice.reducer;