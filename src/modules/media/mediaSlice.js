
import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";

const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        medies: [],
        media: null,
        params: {
            columns: "id,name,category,type,size",
            ...paginateOptions,
        }
    },
    reducers: {
        index: (state, action) => {
            state.medies = action.payload
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

export const { index, update, show, destroy, store } = mediaSlice.actions;
export default mediaSlice.reducer;