import { createSlice } from "@reduxjs/toolkit";
import { paginateOptions } from "../../constants/config";
import { promotionPayload } from "./promotionPayload";

const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        promotions: [],
        promotion: null,
        paginateParams: promotionPayload.paginateParams
    },
    reducers: {
        index: (state,action) => {
            state.promotions = action.payload
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
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, destroy, store, setPaginate } = promotionSlice.actions;
export default promotionSlice.reducer;