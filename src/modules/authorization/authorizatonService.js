import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { permissionIndex, roleIndex } from "./authorizationSlice";


export const authorizationService = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.role, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(roleIndex(response.data.data ? response.data.data : response.data));
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