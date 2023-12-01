import { createSlice } from "@reduxjs/toolkit";
import { deliveryPayload } from "./deliveryPayload";

const deliverySlice = createSlice({
    name: 'admin',
    initialState: {
        deliveries: [],
        delivery: null,
        paginateParams: deliveryPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.deliveries = action.payload;
            return state;
        },
        update: (state, action) => {
            state.delivery = action.payload;
            return state;
        },
        show: (state, action) => {
            state.delivery = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = deliverySlice.actions;
export default deliverySlice.reducer;