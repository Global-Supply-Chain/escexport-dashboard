import { createSlice } from "@reduxjs/toolkit";
import { categoryPayload } from "./categoryPayload";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        mainCategories: [],
        categories: [],
        mainPaginateParams: categoryPayload.mainCategoryPaginateParams
    },
    reducers: {
        mainIndex: (state, action) => {
            state.mainCategories = action.payload;
            return state;
        },
        index: (state, action) => {
            state.categories = action.payload;
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
        },
        setPaginate: (state, action) => {
            state.mainPaginateParams = action.payload;
        },
    }
});

export const { 
    index, 
    mainIndex, 
    update, 
    show, 
    destroy, 
    store, 
    setPaginate 
} = categorySlice.actions;

export default categorySlice.reducer;