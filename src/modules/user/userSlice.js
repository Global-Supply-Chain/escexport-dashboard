import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        paginateParams : "",
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.users = action.payload;
            return state;
        },
        update: (state, action) => {
            state.user = action.payload;
            return state;
        },
        setPaginateParams: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginateParams } = userSlice.actions;
export default userSlice.reducer;