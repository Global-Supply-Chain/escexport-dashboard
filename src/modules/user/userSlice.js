import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        params: {
            columns: "id,title,url,status",
            ...paginateOptions,
        }
    },
    reducers: {
        index: (state, action) => {
            state = action.payload
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
        }
    }
});

export const { index, update, show, destroy, store } = userSlice.actions;
export default userSlice.reducer;