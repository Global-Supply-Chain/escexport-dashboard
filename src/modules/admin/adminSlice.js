import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../../helpers/localstorage";
import { keys } from "../../constants/config";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: [],
        admin: null,
        profile: getData(keys.USER)
    },
    reducers: {
        index: (state, action) => {
            state.admins = action.payload;
            return state;
        },
        update: (state, action) => {
            state.admin = action.payload;
            state.profile = action.payload;
            return state;
        }
    }
});

export const { index, update } = adminSlice.actions;
export default adminSlice.reducer;