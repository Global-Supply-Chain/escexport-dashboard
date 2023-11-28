import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: null,
        paginateParams : "",
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
        setPaginateParams: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginateParams } = orderSlice.actions;
export default orderSlice.reducer;