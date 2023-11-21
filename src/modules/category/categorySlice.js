import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        users: [],
        user: null,
        params: {
            columns: "id,title,level,category_id,description,status",
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

export const { index, update, show, destroy, store } = categorySlice.actions;
export default categorySlice.reducer;