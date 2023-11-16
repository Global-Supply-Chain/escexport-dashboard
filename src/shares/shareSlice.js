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
        errors: null
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
        }
    }
});

export const { updateNotification, updateError } = shareSlice.actions;
export default shareSlice.reducer;