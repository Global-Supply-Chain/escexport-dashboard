import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: [],
    },
    reducers: {
        index: (state, action) => {
            state = action.payload;
            return state;
        }
    }
});

export const { index } = adminSlice.actions;
export default adminSlice.reducer;