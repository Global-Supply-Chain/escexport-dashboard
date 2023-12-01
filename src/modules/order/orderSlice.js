import { createSlice } from "@reduxjs/toolkit";
import { orderPayload } from "./orderPayload";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: null,
        paginateParams : orderPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.orders = action.payload;
            return state;
        },
        update: (state, action) => {
            state.order = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = orderSlice.actions;
export default orderSlice.reducer;