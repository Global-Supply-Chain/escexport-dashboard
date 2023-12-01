import { createSlice } from "@reduxjs/toolkit";
import { userPayload } from "./userPayload";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        paginateParams : userPayload.paginateParams,
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
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, setPaginate } = userSlice.actions;
export default userSlice.reducer;