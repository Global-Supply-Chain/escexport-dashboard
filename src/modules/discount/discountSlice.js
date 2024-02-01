import { createSlice } from "@reduxjs/toolkit";
import { discountPayload } from "./discountPayload";

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        discounts: [],
        discount: null,
        paginateParams : discountPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.discounts = action.payload;
            return state;
        },
        update: (state, action) => {
            state.discount = action.payload;
            return state;
        },
        show: (state, action) => {
            state.discount = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = discountSlice.actions;
export default discountSlice.reducer;