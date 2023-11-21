import { createSlice } from "@reduxjs/toolkit";

const deliverySlice = createSlice({
    name: 'admin',
    initialState: {
        deliveries: [],
        delivery: null,
    },
    reducers: {
        index: (state, action) => {
            state.deliveries = action.payload;
            return state;
        },
        update: (state, action) => {
            state.delivery = action.payload;
            return state;
        }
    }
});

export const { index, update } = deliverySlice.actions;
export default deliverySlice.reducer;