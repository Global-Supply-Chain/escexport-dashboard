import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        promotions: [],
        promotion: null,
        params: {
            columns: "id,title,url,status",
            ...paginateOptions,
        }
    },
    reducers: {
        index: (state,action) => {
            state = action.payload
            return state;
        },
        update: (state, action) => {
            state.promotion = action.payload;
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

export const { index, update, show, destroy, store } = promotionSlice.actions;
export default promotionSlice.reducer;