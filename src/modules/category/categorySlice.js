import { createSlice } from "@reduxjs/toolkit";
import { categoryPayload } from "./categoryPayload";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        mainCategory: null,
        subCategories: [],
        subCategory: null,
        categoryPaginateParams: categoryPayload.categoryPaginateParams,
    },
    reducers: {
        index: (state, action) => {
            state.categories = action.payload;
            return state;
        },
        update: (state, action) => {
            state.categories = action.payload;
            return state;
        },
        show:( state,action) => {
            state.category = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.categoryPaginateParams = action.payload;
            return state;
        },
    }
});

export const { 
    index,
    update, 
    show,
    setPaginate,
} = categorySlice.actions;

export default categorySlice.reducer;