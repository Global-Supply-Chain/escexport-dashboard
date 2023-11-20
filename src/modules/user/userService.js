import { endpoints } from "../../constants/endpoints";
import { paths } from "../../constants/paths"
import { getRequest, postRequest, putRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateError, updateNotification } from "../../shares/shareSlice";
import { index } from "./userSlice";


export const userService = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.user, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },
    createUser: async (payload, dispatch) => {
        const response = await postRequest(paths.user, payload);
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
    
    updateUser: async (payload, dispatch,dataSource) => {

        const response = await putRequest(`${paths.user}/${dataSource?.id}`, payload);
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
        const response = await getRequest(`${paths.user}/${id}`);
        console.log(response);
    }

}