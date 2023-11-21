import { endpoints } from "../../constants/endpoints";
import { paths } from "../../constants/paths";
import { getRequest, postRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { index } from "./itemSlice";


export const itemService = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.item, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },
    store: async(dispatch,payload) => {
        const response = await postRequest(endpoints.item, payload);
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
    show: async (id, dispatch) => {
        const response = await getRequest(`${paths.item}/${id}`);
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