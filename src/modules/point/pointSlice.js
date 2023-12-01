import { createSlice } from "@reduxjs/toolkit";
import { pointPayload } from "./pointPayload";

const pointSlice = createSlice({
    name: 'point',
    initialState: {
        points: [],
        point: null,
        paginateParams: pointPayload.paginateParams
    },
    reducers: {
        index: (state, action) => {
            state.points = action.payload;
            return state;
        },
        update: (state, action) => {
            state.point = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = pointSlice.actions;
export default pointSlice.reducer;