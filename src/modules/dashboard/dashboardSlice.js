import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        item: null,
        order: null,
        user: null,
        count: null,
    },
    reducers: {
        orderIndex: (state, action) => {
            state.order = action.payload
            return state;
        },
        itemIndex: (state, action) => {
            state.item = action.payload
            return state;
        },
        userIndex: (state, action) => {
            state.user = action.payload
            return state;
        },
        countIndex: (state, action) => {
            state.count = action.payload;
            return state;
        },
        update: state => {
            return state;
        },
        show: (state,action) => {
            state.item = action.payload
            return state;
        },
        destroy: state => {
            return state;
        },
        store: state => {
            return state
        },
    }
});

export const { orderIndex, itemIndex, userIndex, countIndex,update, show, destroy, store } = dashboardSlice.actions;
export default dashboardSlice.reducer;