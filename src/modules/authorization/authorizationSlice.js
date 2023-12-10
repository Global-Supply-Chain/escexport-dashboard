import { createSlice } from "@reduxjs/toolkit";
import { authorizationPayload } from "./authorizationPayload";

const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {
        roles: [],
        role: null,
        permissions: [],
        permission: null,
        rolePaginateParams : authorizationPayload.rolePaginateParams,
        permissionPaginateParams: authorizationPayload.permissionPaginateParams,
        roleTotal : 0
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
        },
        permissionIndex: (state, action) => {
            state.permissions = action.payload;
            return state;
        },
        permissionShow: (state, action) => {
            state.permission = action.payload;
            return state;
        },
        setPermissionPaginate: (state, action) => {
            state.permissionPaginateParams = action.payload;
            return state;
        }
    }
});

export const { roleIndex,roleShow,roleUpdate,setRolePaginate,permissionIndex,permissionShow,setPermissionPaginate } = authorizationSlice.actions;
export default authorizationSlice.reducer;