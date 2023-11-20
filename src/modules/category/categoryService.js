import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index } from "./categorySlice";


export const categoryService = {
    index : async (dispatch, params) => {
        const response = await getRequest(endpoints.category, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.category, payload);
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
    show: async (dispatch,id) => {
        const response = await getRequest(`${endpoints.category}/${id}`);
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

    }
}