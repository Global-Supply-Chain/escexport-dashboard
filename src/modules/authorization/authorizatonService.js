import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { roleIndex } from "./authorizationSlice";


export const authorizationService = {
    index: async (dispatch, params) => {
        const response = await getRequest(endpoints.role, params);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(roleIndex(response.data.data ? response.data.data : response.data));
        }
        return response;
    },
}