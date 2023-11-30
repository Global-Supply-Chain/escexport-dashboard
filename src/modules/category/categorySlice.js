import { createSlice } from "@reduxjs/toolkit";
import { categoryPayload } from "./categoryPayload";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        mainCategories: [],
        mainCategory: null,
        categories: [],
        mainPaginateParams: categoryPayload.mainCategoryPaginateParams
    },
    reducers: {
        mainIndex: (state, action) => {
            state.mainCategories = action.payload;
            return state;
        },

        mainUpdate: (state, action) => {
            state.mainCategory = action.payload;
            return state;
        },

        mainShow: (state, action) => {
            state.mainCategory = action.payload;
            return state;
        },

        index: (state, action) => {
            state.categories = action.payload;
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
    mainUpdate,
    update, 
    show, 
    destroy, 
    store, 
    setPaginate
} = categorySlice.actions;

export default categorySlice.reducer;