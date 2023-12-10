import { createSlice } from "@reduxjs/toolkit";
import { categoryPayload } from "./categoryPayload";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        mainCategories: [],
        mainCategory: null,
        subCategories: [],
        subCategory: null,
        mainPaginateParams: categoryPayload.mainCategoryPaginateParams,
        subPaginateParams: categoryPayload.subCategoryPaginateParams
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

        subIndex: (state, action) => {
            state.subCategories = action.payload;
            return state;
        },
        show:( state,action) => {
            state.category = action.payload;
            return state;
        },
        setMainPaginate: (state, action) => {
            state.mainPaginateParams = action.payload;
            return state;
        },
        setSubPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { 
    subIndex, 
    mainIndex, 
    mainUpdate,
    update, 
    show,
    setMainPaginate,
    setSubPaginate
} = categorySlice.actions;

export default categorySlice.reducer;