import { createSlice } from "@reduxjs/toolkit";

const pointSlice = createSlice({
    name: 'point',
    initialState: {
        points: [],
        point: null,
    },
    reducers: {
        index: (state, action) => {
            state.points = action.payload;
            return state;
        },
        update: (state, action) => {
            state.point = action.payload;
            return state;
        }
    }
});

export const { index, update } = pointSlice.actions;
export default pointSlice.reducer;