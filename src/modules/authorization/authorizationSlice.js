import { createSlice } from "@reduxjs/toolkit";
import { authorizationPayload } from "./authorizationPayload";

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        roles: [],
        role: null,
        permission: [],
        permissions: null,
        rolePaginateParams : authorizationPayload.rolePaginateParams,
        total : 0
    },
    reducers: {
        roleIndex: (state, action) => {
            state.roles = action.payload;
            return state;
        },
        roleUpdate: (state, action) => {
            state.faq = action.payload;
            return state;
        },
        roleShow: (state, action) => {
            state.faq = action.payload;
            return state;
        },
        setRolePaginate: (state, action) => {
            state.rolePaginateParams = action.payload;
            return state;
        }
    }
});

export const { roleIndex,roleShow,roleUpdate,setRolePaginate } = authorizationSlice.actions;
export default authorizationSlice.reducer;