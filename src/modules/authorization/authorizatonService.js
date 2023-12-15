import { endpoints } from "../../constants/endpoints";
import { paths } from "../../constants/paths";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { permissionIndex, roleIndex, roleShow, roleUpdate } from "./authorizationSlice";


export const authorizationService = {
    roleIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.role, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(roleIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },
    roleCreate: async (dispatch, payload) => {
        const response = await postRequest(endpoints.role,payload);
        await httpServiceHandler(dispatch,response);

        if(response.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },
    roleUpdate: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.role}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(roleUpdate(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },
    rolePermissionRemove: async (dispatch,id,payload) => {
        const response = await postRequest(`${endpoints.role}/${id}/remove-permission`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200){
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }

        return response;
    },
    roleShow: async (dispatch, id) => {
        const response = await getRequest(`${paths.role}/${id}`);
        await httpServiceHandler(dispatch,response);

        if(response.status === 200) {
            dispatch(roleShow(response.data))
        }

        return response;
    },
    permissionIndex: async (dispatch, params) => {
        const response = await getRequest(endpoints.permission, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(permissionIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },
}