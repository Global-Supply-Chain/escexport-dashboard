import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        users: [],
        user: null,
        params: {
            columns: "id,category_id,name,code,description,content,price,sell_price,out_of_stock,status",
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

export const { index, update, show, destroy, store } = itemSlice.actions;
export default itemSlice.reducer;