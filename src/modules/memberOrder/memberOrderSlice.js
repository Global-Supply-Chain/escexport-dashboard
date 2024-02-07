import { createSlice } from "@reduxjs/toolkit";
import { memberOrderPayload } from "./memberOrderPayload";

const memberOrderSlice = createSlice({
    name: 'order',
    initialState: {
        memberOrders: [],
        memberOrder: null,
        paginateParams : memberOrderPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.memberOrders = action.payload;
            return state;
        },
        show : (state, action) => {
            state.memberOrder = action.payload;
            return state;
        },
        update: (state, action) => {
            state.memberOrder = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = memberOrderSlice.actions;
export default memberOrderSlice.reducer;