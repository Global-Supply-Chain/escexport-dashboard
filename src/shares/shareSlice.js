import { createSlice } from "@reduxjs/toolkit";
import { notificationOptions } from "../constants/config";

const shareSlice = createSlice({
    name: 'share',
    initialState: {
        notification: {
            ...notificationOptions,
            summary: null,
            detail: null
        },
        errors: null,
        showSidebar: false
    },
    reducers: {
        updateNotification: (state, action) => {
            state.notification = {
                ...notificationOptions,
                ...action.payload
            }
            return state;
        },
        updateError: (state, action) => {
            state.errors = { ...action.payload }
            return state;
        },
        sidebarToggle: (state) => {
            state.showSidebar = !state.showSidebar;
            return state;
        }
    }
});

export const { updateNotification, updateError, sidebarToggle } = shareSlice.actions;
export default shareSlice.reducer;