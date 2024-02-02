import { createSlice } from "@reduxjs/toolkit";
import { memberCardPayload } from "./memberCardPayload";

const memberCardSlice = createSlice({
    name: 'discount',
    initialState: {
        memberCards: [],
        memberCard: null,
        paginateParams : memberCardPayload.paginateParams,
        total : 0
    },
    reducers: {
        index: (state, action) => {
            state.memberCards = action.payload;
            return state;
        },
        update: (state, action) => {
            state.memberCard = action.payload;
            return state;
        },
        show: (state, action) => {
            state.memberCard = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { index, update, show, setPaginate } = memberCardSlice.actions;
export default memberCardSlice.reducer;