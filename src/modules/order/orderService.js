import { endpoints } from "../../constants/endpoints"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index, update } from "./orderSlice";

export const orderService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.order, payload);
        await httpServiceHandler(dispatch, response);

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

    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.order, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },

    update: async (dispatch, id, payload) => {
        const response = await putRequest(`${endpoints.order}/${id}`, payload);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
            dispatch(updateNotification({
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }
        return response;
    },

    show: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.order}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    }
}