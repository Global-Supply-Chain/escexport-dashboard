import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shops: [],
        shop: null,
    },
    reducers: {
        index: (state, action) => {
            state.shops = action.payload;
            return state;
        },
        update: (state, action) => {
            state.shop = action.payload;
            return state;
        },
        show: (state, action) => {
            state.shop = action.payload;
            return state;
        }
    }
});

export const { index, update, show } = shopSlice.actions;
export default shopSlice.reducer;