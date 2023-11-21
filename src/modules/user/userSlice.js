import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
    },
    reducers: {
        index: (state, action) => {
            state.users = action.payload;
            return state;
        },
        update: (state, action) => {
            state.user = action.payload;
            return state;
        }
    }
});

export const { index, update } = userSlice.actions;
export default userSlice.reducer;