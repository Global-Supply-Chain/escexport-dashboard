import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index, update } from "./promotionSlice";


export const promotionService = {
    index: async(dispatch, params) => {
        const response = await getRequest(endpoints.promotion, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    },
    show: async (dispatch, id) => {
        const response = await getRequest(`${endpoints.promotion}/${id}`);
        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            dispatch(update(response.data));
        }
        
        return response;
    }
}