import { createSlice } from "@reduxjs/toolkit";
import { faqPayload } from "./faqPayload";

const faqSlice = createSlice({
    name: 'faq',
    initialState: {
        faqs: [],
        faq: null,
        paginateParams : faqPayload.paginateParams,
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
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = faqSlice.actions;
export default faqSlice.reducer;