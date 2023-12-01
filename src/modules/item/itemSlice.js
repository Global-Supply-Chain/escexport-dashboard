import { createSlice } from "@reduxjs/toolkit";
import { itemPayload } from "./itemPayload";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: [],
        item: null,
        paginateParams: itemPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.items = action.payload
            return state;
        },
        update: state => {
            return state;
        },
        show: state => {
            return state;
        },
        destroy: state => {
            return state;
        },
        store: state => {
            return state
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, destroy, store, setPaginate } = itemSlice.actions;
export default itemSlice.reducer;