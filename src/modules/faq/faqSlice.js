import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
    name: 'faq',
    initialState: {
        faqs: [],
        faq: null,
        paginateParams : "",
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.faqs = action.payload;
            return state;
        },
        update: (state, action) => {
            state.faq = action.payload;
            return state;
        },
        show: (state, action) => {
            state.faq = action.payload;
            return state;
        },
        setPaginateParams: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginateParams } = faqSlice.actions;
export default faqSlice.reducer;