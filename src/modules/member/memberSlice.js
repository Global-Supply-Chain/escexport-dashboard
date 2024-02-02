import { createSlice } from "@reduxjs/toolkit";
import { memberPayload } from "./memberPayload";

const memberSlice = createSlice({
    name: 'discount',
    initialState: {
        members: [],
        member: null,
        paginateParams : memberPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.members = action.payload;
            return state;
        },
        update: (state, action) => {
            state.member = action.payload;
            return state;
        },
        show: (state, action) => {
            state.member = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = memberSlice.actions;
export default memberSlice.reducer;