import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: [],
        admin: null,
    },
    reducers: {
        index: (state, action) => {
            state.admins = action.payload;
            return state;
        },
        update: (state, action) => {
            state.admin = action.payload;
            return state;
        }
    }
});

export const { index, update } = adminSlice.actions;
export default adminSlice.reducer;